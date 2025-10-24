// ============================================
// FORMULAIRE DE CONTACT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    // ============================================
    // VALIDATION DU FORMULAIRE
    // ============================================
    
    form.addEventListener('submit', function(e) {
        // Le formulaire utilise FormSubmit, donc on laisse la soumission normale
        // mais on peut ajouter des validations personnalisées ici
        
        const about = document.getElementById('about').value.trim();
        const experience = document.getElementById('experience').value.trim();
        const expectations = document.getElementById('expectations').value.trim();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!about || !experience || !expectations) {
            e.preventDefault();
            alert('Merci de partager vos réflexions dans tous les champs requis.');
            return false;
        }
        
        if (!name || !email) {
            e.preventDefault();
            alert('Merci de renseigner votre nom et email.');
            return false;
        }
        
        if (!validateEmail(email)) {
            e.preventDefault();
            alert('Merci de renseigner une adresse email valide.');
            return false;
        }
        
        // Tout est bon, on laisse le formulaire se soumettre
        // Afficher un message de chargement
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
    });
    
    // ============================================
    // VALIDATION EMAIL
    // ============================================
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ============================================
    // VALIDATION EN TEMPS RÉEL
    // ============================================
    
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
    }
    
    // ============================================
    // AUTO-RESIZE TEXTAREA
    // ============================================
    
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
    
    // ============================================
    // EFFET FOCUS ÉLÉGANT
    // ============================================
    
    const formInputs = form.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // COMPTE CARACTÈRES (Optionnel)
    // ============================================
    
    function addCharacterCount(textareaId, minChars = 50) {
        const textarea = document.getElementById(textareaId);
        if (!textarea) return;
        
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.fontSize = '0.85rem';
        counter.style.color = 'rgba(255,255,255,0.5)';
        counter.style.marginTop = '5px';
        counter.style.textAlign = 'right';
        
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} caractères`;
            
            if (length < minChars && length > 0) {
                counter.style.color = '#ff9800';
                counter.textContent = `${length}/${minChars} caractères (minimum recommandé)`;
            } else if (length >= minChars) {
                counter.style.color = '#4caf50';
            } else {
                counter.style.color = 'rgba(255,255,255,0.5)';
            }
        });
    }
    
    // Activer le compteur pour les champs importants
    addCharacterCount('about', 100);
    addCharacterCount('experience', 80);
    addCharacterCount('expectations', 80);
});