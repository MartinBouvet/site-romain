/* ============================================
   SLIDER.JS - Gestion des slides verticales
   Scroll hijacking pour navigation fluide
   ============================================ */

// Variables pour le slider
let isScrolling = false;
const scrollDelay = 800; // Délai entre chaque slide (ms)

// ============================================
// INITIALISATION DU SLIDER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initVerticalSlider();
});

function initVerticalSlider() {
    // Désactiver le scroll normal
    disableScroll();
    
    // Écouter la molette de la souris
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Écouter les touches du clavier
    window.addEventListener('keydown', handleKeyboard);
    
    // Écouter les touches tactiles (mobile)
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe(touchStartY, touchEndY);
    }, { passive: true });
    
    console.log('✅ Slider vertical initialisé');
}

// ============================================
// GESTION DU SCROLL À LA MOLETTE
// ============================================

function handleWheel(e) {
    e.preventDefault();
    
    if (isScrolling) return;
    
    const delta = Math.sign(e.deltaY);
    
    if (delta > 0) {
        // Scroll vers le bas - slide suivante
        nextSlide();
    } else {
        // Scroll vers le haut - slide précédente
        prevSlide();
    }
}

// ============================================
// GESTION DES TOUCHES CLAVIER
// ============================================

function handleKeyboard(e) {
    if (isScrolling) return;
    
    // Ignorer si on est dans un input
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.tagName === 'SELECT') {
        return;
    }
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Espace
            e.preventDefault();
            nextSlide();
            break;
            
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            prevSlide();
            break;
            
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
            
        case 'End':
            e.preventDefault();
            const slides = document.querySelectorAll('.slide');
            goToSlide(slides.length - 1);
            break;
    }
}

// ============================================
// GESTION DES SWIPES (TACTILE)
// ============================================

function handleSwipe(startY, endY) {
    if (isScrolling) return;
    
    const minSwipeDistance = 50; // Distance minimale pour déclencher un swipe
    const diff = startY - endY;
    
    if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
            // Swipe vers le haut - slide suivante
            nextSlide();
        } else {
            // Swipe vers le bas - slide précédente
            prevSlide();
        }
    }
}

// ============================================
// NAVIGATION ENTRE LES SLIDES
// ============================================

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    if (window.currentSlide < totalSlides - 1) {
        setScrolling(true);
        goToSlide(window.currentSlide + 1);
        
        setTimeout(() => {
            setScrolling(false);
        }, scrollDelay);
    }
}

function prevSlide() {
    if (window.currentSlide > 0) {
        setScrolling(true);
        goToSlide(window.currentSlide - 1);
        
        setTimeout(() => {
            setScrolling(false);
        }, scrollDelay);
    }
}

function setScrolling(value) {
    isScrolling = value;
}

// ============================================
// DÉSACTIVER LE SCROLL NORMAL
// ============================================

function disableScroll() {
    // Méthode 1: overflow hidden sur body
    document.body.style.overflow = 'hidden';
    
    // Méthode 2: empêcher le comportement par défaut
    window.addEventListener('scroll', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('scroll', preventDefault);
    window.removeEventListener('touchmove', preventDefault);
}

function preventDefault(e) {
    e.preventDefault();
}

// ============================================
// NAVIGATION PAR NUMÉRO DE SLIDE
// ============================================

// Fonction pour aller directement à une slide (utilisée par les boutons)
// Cette fonction est déjà définie dans main.js et exportée globalement

// ============================================
// SMOOTH SCROLL POUR LES SECTIONS INTERNES
// ============================================

// Pour les slides qui ont du contenu scrollable (comme la modal)
// On peut activer un scroll normal dans ces zones

function enableScrollInElement(element) {
    if (!element) return;
    
    element.addEventListener('wheel', (e) => {
        e.stopPropagation(); // Empêcher la propagation au slider
    }, { passive: true });
    
    element.addEventListener('touchmove', (e) => {
        e.stopPropagation(); // Empêcher la propagation au slider
    }, { passive: true });
}

// Appliquer le scroll interne aux modales
document.addEventListener('DOMContentLoaded', () => {
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(modal => {
        enableScrollInElement(modal);
    });
    
    // Appliquer aussi au formulaire de contact si besoin
    const contactForm = document.querySelector('.contact-form');
    enableScrollInElement(contactForm);
});

// ============================================
// INDICATEUR DE PROGRESSION (optionnel)
// ============================================

function updateProgressIndicator() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const progress = ((window.currentSlide + 1) / totalSlides) * 100;
    
    // Si on a un indicateur de progression dans le DOM
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Mettre à jour un compteur de slides si présent
    const slideCounter = document.querySelector('.slide-counter');
    if (slideCounter) {
        slideCounter.textContent = `${window.currentSlide + 1} / ${totalSlides}`;
    }
}

// Appeler cette fonction à chaque changement de slide
// (peut être intégré dans goToSlide() de main.js)

// ============================================
// DÉTECTION DE CHANGEMENT D'ORIENTATION
// ============================================

window.addEventListener('orientationchange', () => {
    // Réinitialiser la position après un changement d'orientation
    setTimeout(() => {
        goToSlide(window.currentSlide);
    }, 200);
});

// ============================================
// GESTION DU RESIZE
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculer la position après resize
        goToSlide(window.currentSlide);
    }, 200);
});

// ============================================
// PRÉCHARGEMENT DES SLIDES
// ============================================

function preloadSlides() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        // Précharger les vidéos
        const video = slide.querySelector('video');
        if (video) {
            video.load();
        }
        
        // Précharger les images
        const images = slide.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    });
}

// Lancer le préchargement après l'initialisation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(preloadSlides, 1000);
});

// ============================================
// NAVIGATION PAR HASH URL (optionnel)
// ============================================

// Permet de naviguer vers une slide via l'URL: #formules, #contact, etc.
function initHashNavigation() {
    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Gérer le hash au chargement
    handleHashChange();
}

function handleHashChange() {
    const hash = window.location.hash.slice(1); // Enlever le #
    
    if (!hash) return;
    
    // Mapper les hash aux index de slides
    const slideMap = {
        'intro': 0,
        'almanarre': 1,
        'formules': 2,
        'proximite': 3,
        'contact': 4
    };
    
    const slideIndex = slideMap[hash];
    
    if (slideIndex !== undefined) {
        goToSlide(slideIndex);
    }
}

// Activer la navigation par hash (optionnel)
// document.addEventListener('DOMContentLoaded', initHashNavigation);

console.log('✅ Slider.js chargé');