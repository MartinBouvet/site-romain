/* ============================================
   VIDEO-BACKGROUND.JS
   Gestion des vidéos en arrière-plan
   ============================================ */

// Configuration des vidéos
const videoConfig = {
    video1: {
        src: 'assets/videos/video1.mp4',
        slides: [0, 1], // INTRO et ALMANARRE
    },
    video2: {
        src: 'assets/videos/video2.mp4',
        slides: [2], // FORMULES
    }
};

// Variables pour la gestion des vidéos
let videoAlternateTimer = null;
let currentVideoIndex = 0;
const alternateInterval = 30000; // 30 secondes entre chaque vidéo sur l'intro

// ============================================
// INITIALISATION DES VIDÉOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initVideos();
    setupVideoControls();
    optimizeVideoPlayback();
});

function initVideos() {
    const videos = document.querySelectorAll('.video-background');
    
    videos.forEach(video => {
        // S'assurer que la vidéo est en autoplay
        video.play().catch(err => {
            console.warn('Autoplay bloqué:', err);
            // Tenter de jouer au premier clic utilisateur
            document.addEventListener('click', () => {
                video.play();
            }, { once: true });
        });
        
        // Gérer la fin de la vidéo (boucle infinie)
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
        
        // Optimisation: réduire la qualité si nécessaire
        video.addEventListener('loadedmetadata', () => {
            optimizeVideoQuality(video);
        });
    });
    
    // Démarrer l'alternance des vidéos sur la slide INTRO
    startVideoAlternation();
    
    console.log('✅ Vidéos initialisées');
}

// ============================================
// ALTERNANCE DES VIDÉOS SUR LA SLIDE INTRO
// ============================================

function startVideoAlternation() {
    const introSlide = document.querySelector('.slide-intro');
    if (!introSlide) return;
    
    const video = introSlide.querySelector('.video-background');
    if (!video) return;
    
    // Tableau des sources vidéo à alterner
    const videoSources = [
        'assets/videos/video1.mp4',
        'assets/videos/video2.mp4'
    ];
    
    videoAlternateTimer = setInterval(() => {
        // Passer à la vidéo suivante
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        
        // Transition en fondu
        video.style.opacity = '0';
        
        setTimeout(() => {
            video.src = videoSources[currentVideoIndex];
            video.load();
            video.play();
            video.style.opacity = '1';
        }, 500); // Attendre la fin du fondu
        
    }, alternateInterval);
}

function stopVideoAlternation() {
    if (videoAlternateTimer) {
        clearInterval(videoAlternateTimer);
        videoAlternateTimer = null;
    }
}

// ============================================
// OPTIMISATION DE LA LECTURE VIDÉO
// ============================================

function optimizeVideoPlayback() {
    const videos = document.querySelectorAll('.video-background');
    
    videos.forEach(video => {
        // Pause/Play selon la visibilité de la slide
        observeVideoVisibility(video);
        
        // Réduire la qualité sur mobile
        if (isMobileDevice()) {
            video.playbackRate = 1.0; // Vitesse normale
            // On pourrait charger une version plus légère ici
        }
    });
}

function observeVideoVisibility(video) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // La vidéo est visible, la lancer
                video.play().catch(err => {
                    console.warn('Erreur lecture vidéo:', err);
                });
            } else {
                // La vidéo n'est plus visible, la mettre en pause
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // 50% de visibilité pour déclencher
    });
    
    observer.observe(video);
}

// ============================================
// OPTIMISATION DE LA QUALITÉ
// ============================================

function optimizeVideoQuality(video) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        // Si connexion lente, réduire la qualité
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            console.log('Connexion lente détectée, qualité vidéo réduite');
            video.playbackRate = 0.8; // Ralentir légèrement
        }
    }
    
    // Sur mobile, réduire la résolution
    if (isMobileDevice() && window.innerWidth < 768) {
        // On pourrait charger une version mobile ici
        console.log('Mobile détecté, optimisation vidéo');
    }
}

// ============================================
// CONTRÔLES VIDÉO (optionnels)
// ============================================

function setupVideoControls() {
    // Créer des contrôles personnalisés si nécessaire
    // Pour l'instant, les vidéos sont en autoplay/loop sans contrôles
    
    // Gestion du son (muted par défaut)
    const videos = document.querySelectorAll('.video-background');
    
    // Possibilité d'ajouter un bouton pour activer/désactiver le son
    // createSoundToggle(videos);
}

function createSoundToggle(videos) {
    const soundToggle = document.createElement('button');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = '🔇'; // Icône muet par défaut
    soundToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    let isMuted = true;
    
    soundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        videos.forEach(video => {
            video.muted = isMuted;
        });
        soundToggle.innerHTML = isMuted ? '🔇' : '🔊';
    });
    
    document.body.appendChild(soundToggle);
}

// ============================================
// GESTION DES ERREURS VIDÉO
// ============================================

function handleVideoError(video) {
    video.addEventListener('error', (e) => {
        console.error('Erreur de chargement vidéo:', e);
        
        // Afficher une image de fallback
        const slide = video.closest('.slide');
        if (slide) {
            slide.style.background = 'linear-gradient(135deg, #0A2540 0%, #1a3f5f 100%)';
            video.style.display = 'none';
        }
    });
}

// Appliquer la gestion d'erreur à toutes les vidéos
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-background');
    videos.forEach(handleVideoError);
});

// ============================================
// PRÉCHARGEMENT DES VIDÉOS
// ============================================

function preloadVideos() {
    // Précharger les vidéos pour une lecture fluide
    const videoSources = [
        'assets/videos/video1.mp4',
        'assets/videos/video2.mp4'
    ];
    
    videoSources.forEach(src => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.load();
    });
    
    console.log('✅ Vidéos préchargées');
}

// Précharger après un court délai
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(preloadVideos, 2000);
});

// ============================================
// GESTION DE LA PAUSE LORS DU CHANGEMENT DE SLIDE
// ============================================

// Écouter les changements de slide pour optimiser
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slidesContainer');
    if (!slidesContainer) return;
    
    // Observer les mutations pour détecter les changements de transform
    const observer = new MutationObserver(() => {
        handleSlideChange();
    });
    
    observer.observe(slidesContainer, {
        attributes: true,
        attributeFilter: ['style']
    });
});

function handleSlideChange() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;
    
    // Mettre en pause toutes les vidéos sauf celle de la slide active
    const allVideos = document.querySelectorAll('.video-background');
    allVideos.forEach(video => {
        const videoSlide = video.closest('.slide');
        if (videoSlide === activeSlide) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}

// ============================================
// DÉTECTION MOBILE
// ============================================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================
// GESTION DE LA PERFORMANCE
// ============================================

// Réduire la fréquence d'images sur mobile pour économiser la batterie
function adjustVideoPerformance() {
    if (isMobileDevice()) {
        const videos = document.querySelectorAll('.video-background');
        videos.forEach(video => {
            // Réduire la fréquence d'images si possible
            // Note: pas toujours supporté par tous les navigateurs
            if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
                let frameCount = 0;
                const skipFrames = 2; // Sauter 1 frame sur 2
                
                function renderFrame() {
                    frameCount++;
                    if (frameCount % skipFrames === 0) {
                        // Traiter la frame
                    }
                    video.requestVideoFrameCallback(renderFrame);
                }
                
                video.requestVideoFrameCallback(renderFrame);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', adjustVideoPerformance);

// ============================================
// NETTOYAGE LORS DU DÉCHARGEMENT
// ============================================

window.addEventListener('beforeunload', () => {
    stopVideoAlternation();
    
    const videos = document.querySelectorAll('.video-background');
    videos.forEach(video => {
        video.pause();
        video.src = '';
        video.load();
    });
});

console.log('✅ Video-background.js chargé');