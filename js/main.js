// ============================================
// SCRIPT PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADER
    // ============================================
    
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // SMOOTH SCROLL NAVIGATION
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // LANGUAGE SWITCHER
    // ============================================
    
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer active de tous les boutons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Ajouter active au bouton cliqué
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            
            // Pour l'instant, juste afficher la langue sélectionnée
            // Tu peux ajouter la traduction plus tard
            if (lang === 'en') {
                // Optionnel : Rediriger vers une version anglaise
                // window.location.href = 'index-en.html';
                console.log('English version - Coming soon!');
                alert('English version coming soon! 🇬🇧');
            } else {
                console.log('Version française');
            }
        });
    });
    
    // ============================================
    // MODAL DÉTAILS SÉJOUR
    // ============================================
    
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const formule = this.getAttribute('data-formule');
            openModal(formule);
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    function openModal(formule) {
        const modalBody = document.getElementById('modal-body');
        
        let content = '';
        
        if (formule === 'premium') {
            content = `
                <h2>Séjour Premium</h2>
                <h3>Une semaine d'exception tout compris</h3>
                
                <div class="modal-section">
                    <h4>🏡 Hébergement de luxe</h4>
                    <p>Villa privée avec vue panoramique sur la baie de L'Almanarre. 
                    Chambres spacieuses, terrasse avec piscine, espace détente.</p>
                </div>
                
                <div class="modal-section">
                    <h4>👨‍🍳 Gastronomie</h4>
                    <p>Chef privé à domicile préparant des repas gastronomiques 
                    avec des produits locaux et de saison. Tous les repas inclus.</p>
                </div>
                
                <div class="modal-section">
                    <h4>🏄 Sports de glisse</h4>
                    <p>Navigation en autonomie illimitée sur le spot. 
                    Coaching personnalisé kite et wing par des moniteurs diplômés.</p>
                </div>
                
                <div class="modal-section">
                    <h4>🧘 Bien-être & développement</h4>
                    <p>3 séances de yoga face à la mer, coaching en développement personnel, 
                    demi-journée au SPA de luxe.</p>
                </div>
                
                <div class="modal-section">
                    <h4>🚴 Découvertes</h4>
                    <p>Journée vélo à Porquerolles, randonnées dans les plus beaux sentiers 
                    de la région, moments de partage en groupe.</p>
                </div>
                
                <div class="modal-section">
                    <h4>📸 Souvenirs</h4>
                    <p>Photographe professionnel pour immortaliser vos meilleurs moments.</p>
                </div>
                
                <div class="modal-section">
                    <h4>✈️ Logistique</h4>
                    <p>Prise en charge complète dès votre arrivée à l'aéroport de Hyères. 
                    Tous les transports sur zone inclus.</p>
                </div>
                
                <div class="modal-pricing">
                    <p class="price-from">À partir de <strong>2 890€</strong> / personne</p>
                    <p class="price-note">Prix final selon la date choisie</p>
                </div>
                
                <a href="#contact" class="btn-reserve" onclick="document.getElementById('modal').style.display='none'">
                    Je réserve mon séjour
                </a>
            `;
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }
    
    // ============================================
    // ANIMATIONS ON SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.formule-card, .airport-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // ============================================
    // VIDEO AUTOPLAY FIX (iOS Safari)
    // ============================================
    
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.addEventListener('loadedmetadata', function() {
            this.play().catch(err => {
                console.log('Autoplay prevented:', err);
            });
        });
    });
    
    // Force play on user interaction (pour mobile)
    document.addEventListener('touchstart', function() {
        videos.forEach(video => {
            if (video.paused) {
                video.play().catch(err => console.log('Play error:', err));
            }
        });
    }, { once: true });
});