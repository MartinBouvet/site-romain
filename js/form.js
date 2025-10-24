/* ============================================
   FORM.JS - Gestion du formulaire de contact
   Validation et envoi
   ============================================ */

// ============================================
// INITIALISATION DU FORMULAIRE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Écouter la soumission
    form.addEventListener('submit', handleFormSubmit);
    
    // Validation en temps réel
    setupRealTimeValidation(form);
    
    // Auto-resize du textarea
    const textarea = form.querySelector('textarea');
    if (textarea) {
        setupTextareaAutoResize(textarea);
    }
    
    console.log('✅ Formulaire de contact initialisé');
}

// ============================================
// GESTION DE LA SOUMISSION
// ============================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Valider le formulaire
    if (!validateForm(form)) {
        showMessage('Veuillez remplir tous les champs correctement', 'error');
        return;
    }
    
    // Récupérer les données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Afficher un loader
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        // Simuler l'envoi (à remplacer par un vrai endpoint)
        await sendFormData(data);
        
        // Succès
        showMessage('Message envoyé avec succès ! Nous vous recontacterons rapidement.', 'success');
        form.reset();
        
    } catch (error) {
        // Erreur
        console.error('Erreur envoi formulaire:', error);
        showMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error');
        
    } finally {
        // Restaurer le bouton
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// ============================================
// ENVOI DES DONNÉES
// ============================================

async function sendFormData(data) {
    // IMPORTANT: Remplacer cette simulation par un vrai service d'envoi
    // Options possibles:
    // 1. EmailJS (https://www.emailjs.com/)
    // 2. Formspree (https://formspree.io/)
    // 3. Votre propre backend PHP/Node.js
    // 4. Service de formulaire de contact
    
    // Exemple avec EmailJS (à configurer):
    /*
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';
    
    return emailjs.send(serviceID, templateID, {
        from_name: `${data.prenom} ${data.nom}`,
        from_email: data.email,
        phone: data.telephone,
        level: data.niveau,
        message: data.message
    }, publicKey);
    */
    
    // SIMULATION pour le développement
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('📧 Données du formulaire:', data);
            
            // Simuler un succès (90% du temps)
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Erreur simulée'));
            }
        }, 1500);
    });
    
    // Exemple d'envoi vers un endpoint personnalisé:
    /*
    const response = await fetch('https://votre-api.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Erreur serveur');
    }
    
    return await response.json();
    */
}

// ============================================
// VALIDATION DU FORMULAIRE
// ============================================

function validateForm(form) {
    let isValid = true;
    
    // Récupérer tous les champs requis
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    // Supprimer les anciennes erreurs
    removeFieldError(field);
    
    // Vérifier si vide
    if (!value && field.hasAttribute('required')) {
        showFieldError(field, 'Ce champ est requis');
        return false;
    }
    
    // Validation spécifique selon le type
    switch(type) {
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Email invalide');
                return false;
            }
            break;
            
        case 'tel':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Numéro de téléphone invalide');
                return false;
            }
            break;
            
        case 'checkbox':
            if (field.hasAttribute('required') && !field.checked) {
                showFieldError(field, 'Vous devez accepter');
                return false;
            }
            break;
    }
    
    // Validation pour le select
    if (field.tagName === 'SELECT') {
        if (!value || value === '') {
            showFieldError(field, 'Veuillez sélectionner une option');
            return false;
        }
    }
    
    return true;
}

// ============================================
// VALIDATION EN TEMPS RÉEL
// ============================================

function setupRealTimeValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        // Validation au blur (perte de focus)
        field.addEventListener('blur', () => {
            if (field.value.trim()) {
                validateField(field);
            }
        });
        
        // Effacer l'erreur pendant la saisie
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                removeFieldError(field);
            }
        });
    });
}

// ============================================
// AFFICHAGE DES ERREURS
// ============================================

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Créer le message d'erreur
    let errorDiv = field.parentElement.querySelector('.field-error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        field.parentElement.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    
    // Style du champ en erreur
    field.style.borderColor = '#e74c3c';
}

function removeFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ============================================
// VALIDATION EMAIL
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// VALIDATION TÉLÉPHONE
// ============================================

function isValidPhone(phone) {
    // Accepter différents formats de téléphone français
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ============================================
// AUTO-RESIZE DU TEXTAREA
// ============================================

function setupTextareaAutoResize(textarea) {
    textarea.style.resize = 'none';
    textarea.style.overflow = 'hidden';
    
    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    
    textarea.addEventListener('input', resize);
    
    // Resize initial
    resize();
}

// ============================================
// FORMATAGE AUTOMATIQUE DU TÉLÉPHONE
// ============================================

function setupPhoneFormatting() {
    const phoneInput = document.getElementById('telephone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Garder seulement les chiffres
        
        // Formater: 06 12 34 56 78
        if (value.length > 0) {
            value = value.match(/.{1,2}/g).join(' ');
        }
        
        e.target.value = value;
    });
}

document.addEventListener('DOMContentLoaded', setupPhoneFormatting);

// ============================================
// PROTECTION ANTI-SPAM (Honeypot)
// ============================================

function addHoneypot(form) {
    // Ajouter un champ caché que les bots rempliront
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website'; // Nom trompeur
    honeypot.style.cssText = 'position:absolute;left:-9999px;';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    
    form.appendChild(honeypot);
    
    // Vérifier lors de la soumission
    form.addEventListener('submit', (e) => {
        if (honeypot.value !== '') {
            e.preventDefault();
            console.log('🤖 Bot détecté');
            return false;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        addHoneypot(form);
    }
});

// ============================================
// INTÉGRATION EMAILJS (optionnel)
// ============================================

/*
// Étape 1: Inclure EmailJS dans index.html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Étape 2: Initialiser EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Étape 3: Modifier la fonction sendFormData pour utiliser EmailJS
async function sendFormData(data) {
    return emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
            from_name: `${data.prenom} ${data.nom}`,
            from_email: data.email,
            phone: data.telephone,
            level: data.niveau,
            message: data.message,
            to_email: 'romainpeyre2001@yahoo.fr'
        }
    );
}
*/

// ============================================
// SAUVEGARDE LOCALE (optionnel)
// ============================================

function saveDraft() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Note: localStorage n'est pas disponible dans les artifacts Claude
    // Cette fonction ne fonctionnera que dans un vrai environnement web
    try {
        localStorage.setItem('contactFormDraft', JSON.stringify(data));
    } catch (e) {
        // Silently fail if localStorage is not available
        console.log('localStorage non disponible');
    }
}

function loadDraft() {
    try {
        const draft = localStorage.getItem('contactFormDraft');
        if (draft) {
            const data = JSON.parse(draft);
            const form = document.getElementById('contactForm');
            
            Object.entries(data).forEach(([key, value]) => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = value;
                }
            });
            
            console.log('✅ Brouillon chargé');
        }
    } catch (e) {
        console.log('Erreur chargement brouillon');
    }
}

// Auto-save toutes les 30 secondes
/*
setInterval(saveDraft, 30000);

// Charger le brouillon au chargement
document.addEventListener('DOMContentLoaded', loadDraft);
*/

console.log('✅ Form.js chargé');