// ============================================
// SLIDER VERTICAL (Optionnel - pour scroll hijacking)
// ============================================

// Note: Le site est actuellement en scroll normal.
// Ce fichier peut être utilisé pour réactiver le scroll hijacking si besoin.

document.addEventListener('DOMContentLoaded', function() {
    
    const slidesContainer = document.getElementById('slidesContainer');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;
    let isScrolling = false;
    
    // Configuration: false = scroll normal, true = scroll hijacking
    const enableScrollHijacking = false;
    
    if (!enableScrollHijacking) {
        console.log('Scroll normal activé');
        return;
    }
    
    // ============================================
    // SCROLL HIJACKING (désactivé par défaut)
    // ============================================
    
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        if (isScrolling) return;
        
        isScrolling = true;
        currentSlide = index;
        
        const offset = -currentSlide * window.innerHeight;
        slidesContainer.style.transform = `translateY(${offset}px)`;
        
        updateNavigation();
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    function updateNavigation() {
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach((link, index) => {
            if (index === currentSlide) {
                link.style.opacity = '1';
            } else {
                link.style.opacity = '0.6';
            }
        });
    }
    
    // Wheel event
    window.addEventListener('wheel', function(e) {
        if (!enableScrollHijacking) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0) {
            // Scroll down
            goToSlide(currentSlide + 1);
        } else {
            // Scroll up
            goToSlide(currentSlide - 1);
        }
    }, { passive: false });
    
    // Touch events
    let touchStartY = 0;
    let touchEndY = 0;
    
    window.addEventListener('touchstart', function(e) {
        if (!enableScrollHijacking) return;
        touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener('touchend', function(e) {
        if (!enableScrollHijacking) return;
        
        touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe up
                goToSlide(currentSlide + 1);
            } else {
                // Swipe down
                goToSlide(currentSlide - 1);
            }
        }
    });
    
    // Keyboard navigation
    window.addEventListener('keydown', function(e) {
        if (!enableScrollHijacking) return;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToSlide(currentSlide - 1);
        }
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            if (!enableScrollHijacking) return;
            
            e.preventDefault();
            goToSlide(index);
        });
    });
    
    // Initialize
    updateNavigation();
});