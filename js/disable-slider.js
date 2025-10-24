/* ============================================
   DISABLE-SLIDER.JS
   Désactive le système de slides et rend le site scrollable
   ============================================ */

// Désactiver complètement le slider
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Désactivation du système de slides...');
    
    // Supprimer tous les event listeners de scroll/wheel
    const slidesContainer = document.getElementById('slidesContainer');
    if (slidesContainer) {
        // Réinitialiser le transform
        slidesContainer.style.transform = 'none';
        slidesContainer.style.transition = 'none';
    }
    
    // Activer le scroll normal du body
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Désactiver slider.js en override
    window.nextSlide = function() { console.log('Slider désactivé'); };
    window.prevSlide = function() { console.log('Slider désactivé'); };
    window.goToSlide = function() { console.log('Slider désactivé'); };
    
    // Supprimer les écouteurs de wheel
    document.removeEventListener('wheel', handleWheel);
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('keydown', handleKeydown);
    
    // Smooth scroll pour la navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header qui change au scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
    
    console.log('✅ Site maintenant scrollable normalement');
});

// Fonctions vides pour éviter les erreurs
function handleWheel() {}
function handleTouchStart() {}
function handleTouchEnd() {}
function handleKeydown() {}