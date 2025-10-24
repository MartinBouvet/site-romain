/* ============================================
   MAIN.JS - Script principal
   Gestion globale du site et initialisation
   ============================================ */

// Variables globales
window.currentSlide = 0;

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Experience Kite & Wing Retreats - Initialisation...');
    
    // Loader d'entrée (style Dynovate)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            // Supprimer du DOM après la transition
            setTimeout(() => {
                loader.remove();
            }, 800);
        }
    }, 2000); // Afficher le loader pendant 2 secondes

    // Initialiser le header
    initHeader();

    // Initialiser la navigation
    initNavigation();

    // Initialiser les modales
    initModals();

    // Charger les données des séjours
    loadRetreatsData();

    // Initialiser le scroll indicator
    initScrollIndicator();

    // Activer la première slide
    activateSlide(0);

    console.log('✅ Initialisation terminée');
});

// ============================================
// GESTION DU HEADER
// ============================================

function initHeader() {
    const header = document.getElementById('header');
    
    // Effet de scroll sur le header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Note: Le scroll est désactivé dans ce site (scroll hijacking)
    // mais on garde cette fonction pour le cas où on aurait besoin
    // d'un scroll normal sur certaines sections
}

// ============================================
// NAVIGATION DANS LE HEADER
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav a[data-slide]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(link.dataset.slide);
            goToSlide(slideIndex);
            
            // Mettre à jour l'état actif
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Navigation par les dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            goToSlide(slideIndex);
        });
    });
}

// ============================================
// GESTION DES MODALES
// ============================================

function initModals() {
    // Boutons qui ouvrent les modales
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            openModal(`modal${capitalize(modalId)}`);
        });
    });

    // Fermeture des modales
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Fermeture avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Boutons qui scrollent vers le contact
    const contactTriggers = document.querySelectorAll('[data-contact="true"]');
    
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            closeAllModals();
            goToSlide(4); // Slide contact
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquer le scroll
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'hidden'; // Rester en overflow hidden (pour le slider)
}

// ============================================
// CHARGEMENT DES DONNÉES DES SÉJOURS
// ============================================

async function loadRetreatsData() {
    try {
        const response = await fetch('data/retreats.json');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des données');
        }
        
        const data = await response.json();
        
        // Injecter les dates dans la modal
        if (data.dates && data.dates.length > 0) {
            const datesContainer = document.getElementById('datesContainer');
            if (datesContainer) {
                datesContainer.innerHTML = data.dates.map(date => `
                    <div class="date-item ${date.available ? '' : 'unavailable'}">
                        <div class="date-text">${date.start} - ${date.end}</div>
                        ${date.available ? 
                            '<div class="date-status">Disponible</div>' : 
                            '<div class="date-status">Complet</div>'
                        }
                    </div>
                `).join('');
            }
        }
        
        console.log('✅ Données des séjours chargées');
        
    } catch (error) {
        console.error('❌ Erreur de chargement des données:', error);
        
        // Afficher un message d'erreur dans le container
        const datesContainer = document.getElementById('datesContainer');
        if (datesContainer) {
            datesContainer.innerHTML = `
                <p style="text-align: center; color: rgba(255,255,255,0.6);">
                    Les dates seront bientôt disponibles.<br>
                    Contactez-nous pour plus d'informations.
                </p>
            `;
        }
    }
}

// ============================================
// GESTION DU SCROLL INDICATOR
// ============================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            goToSlide(window.currentSlide + 1);
        });
    }
}

// ============================================
// FONCTION POUR ALLER À UNE SLIDE SPÉCIFIQUE
// ============================================

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Vérifier les limites
    if (index < 0 || index >= totalSlides) {
        return;
    }
    
    // Mettre à jour l'index
    window.currentSlide = index;
    
    // Appliquer la transformation
    const slidesContainer = document.getElementById('slidesContainer');
    slidesContainer.style.transform = `translateY(-${window.currentSlide * 100}vh)`;
    
    // Activer la slide
    activateSlide(index);
    
    // Masquer le scroll indicator sur la dernière slide
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.currentSlide === totalSlides - 1) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
    
    // Mettre à jour la navigation active
    updateActiveNav(index);
}

// ============================================
// ACTIVER UNE SLIDE (pour les animations)
// ============================================

function activateSlide(index) {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// ============================================
// METTRE À JOUR LA NAVIGATION ACTIVE
// ============================================

function updateActiveNav(index) {
    const navLinks = document.querySelectorAll('.nav a[data-slide]');
    
    navLinks.forEach(link => {
        const slideIndex = parseInt(link.dataset.slide);
        if (slideIndex === index) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mettre à jour les dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        const slideIndex = parseInt(dot.dataset.slide);
        if (slideIndex === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ============================================
// UTILITAIRES
// ============================================

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonction de debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// MESSAGES DE SUCCÈS/ERREUR
// ============================================

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-alert message-${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.95)' : 'rgba(231, 76, 60, 0.95)'};
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Retirer après 4 secondes
    setTimeout(() => {
        messageDiv.classList.add('hiding');
        setTimeout(() => {
            messageDiv.remove();
        }, 400);
    }, 4000);
}

// ============================================
// EXPORT DES FONCTIONS GLOBALES
// ============================================

// Rendre certaines fonctions accessibles globalement
window.goToSlide = goToSlide;
window.showMessage = showMessage;
window.openModal = openModal;
window.closeAllModals = closeAllModals;

console.log('✅ Main.js chargé');