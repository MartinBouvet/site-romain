/* ============================================
   LANGUAGE.JS - Gestion du bilinguisme FR/EN
   ============================================ */

// Langue actuelle
let currentLanguage = 'fr';

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitch();
    loadSavedLanguage();
});

function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    console.log('✅ Système de langue initialisé');
}

// ============================================
// CHARGEMENT DE LA LANGUE SAUVEGARDÉE
// ============================================

function loadSavedLanguage() {
    // Note: localStorage n'est pas disponible dans les artifacts Claude
    // Cette fonction ne fonctionnera que dans un vrai environnement web
    try {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            switchLanguage(savedLang);
        }
    } catch (e) {
        console.log('localStorage non disponible, langue par défaut: FR');
    }
}

// ============================================
// CHANGEMENT DE LANGUE
// ============================================

async function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    try {
        // Charger les traductions
        const translations = await loadTranslations(lang);
        
        // Appliquer les traductions
        applyTranslations(translations);
        
        // Mettre à jour la langue active
        currentLanguage = lang;
        updateActiveLanguageButton(lang);
        
        // Sauvegarder la préférence
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            // Ignore if localStorage is not available
        }
        
        // Changer la page HTML si nécessaire
        if (lang === 'en') {
            // Optionnel: rediriger vers index-en.html
            // window.location.href = 'index-en.html';
        }
        
        console.log(`✅ Langue changée: ${lang.toUpperCase()}`);
        
    } catch (error) {
        console.error('Erreur lors du changement de langue:', error);
        showMessage('Erreur lors du changement de langue', 'error');
    }
}

// ============================================
// CHARGEMENT DES TRADUCTIONS
// ============================================

async function loadTranslations(lang) {
    try {
        const response = await fetch(`data/translations.json`);
        if (!response.ok) {
            throw new Error('Erreur de chargement des traductions');
        }
        
        const allTranslations = await response.json();
        return allTranslations[lang];
        
    } catch (error) {
        console.error('Erreur:', error);
        // Retourner les traductions par défaut si erreur
        return getDefaultTranslations(lang);
    }
}

// ============================================
// APPLIQUER LES TRADUCTIONS
// ============================================

function applyTranslations(translations) {
    // Tous les éléments avec data-translate
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.dataset.translate;
        const translation = getNestedTranslation(translations, key);
        
        if (translation) {
            // Gérer différents types d'éléments
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// ============================================
// RÉCUPÉRER UNE TRADUCTION IMBRIQUÉE
// ============================================

function getNestedTranslation(obj, path) {
    // Permet d'accéder à des clés imbriquées comme "intro.title"
    return path.split('.').reduce((current, key) => {
        return current ? current[key] : undefined;
    }, obj);
}

// ============================================
// METTRE À JOUR LE BOUTON ACTIF
// ============================================

function updateActiveLanguageButton(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ============================================
// TRADUCTIONS PAR DÉFAUT (FALLBACK)
// ============================================

function getDefaultTranslations(lang) {
    const translations = {
        fr: {
            intro: {
                title: 'EXPERIENCE',
                subtitle: 'KITE & WING RETREATS',
                slogan: 'Where the Sea Meets the Soul'
            },
            scroll: 'Scroll',
            almanarre: {
                title: 'Le Hawaï du Vent',
                subtitle: 'Plus de 200 jours de vent par an',
                description: "L'Almanarre, située sur la presqu'île de Giens, est l'un des spots de kitesurf et wingfoil les plus réputés d'Europe. Avec son vent thermique constant, ses eaux turquoise et son cadre paradisiaque, c'est le lieu idéal pour vivre une expérience inoubliable entre sport et détente."
            },
            formules: {
                title: 'Nos Formules',
                premium: {
                    title: 'Séjour Premium',
                    subtitle: 'Une semaine d\'exception',
                    feature1: 'Villa luxueuse avec vue mer',
                    feature2: 'Chef à domicile',
                    feature3: 'Coaching kite & wingfoil',
                    feature4: 'Sessions yoga',
                    feature5: 'Relaxation SPA',
                    feature6: 'Excursions vélo & rando',
                    max: 'Max. 12 personnes',
                    btn: 'En savoir +'
                },
                privatisation: {
                    title: 'Privatisation',
                    subtitle: 'Groupes & Séminaires',
                    description: 'Créez votre expérience sur-mesure pour votre groupe ou votre entreprise. Team building, séminaire incentive, ou simplement entre amis : nous personnalisons chaque détail selon vos envies.',
                    devis: 'Sur devis personnalisé',
                    btn: 'Demander un devis'
                }
            },
            map: {
                title: 'À Quelques Heures de Vol',
                subtitle: 'Accessible depuis toute l\'Europe'
            },
            contact: {
                title: 'Parlez-nous de Vous',
                subtitle: 'Rejoignez l\'expérience',
                form: {
                    firstname: 'Prénom',
                    lastname: 'Nom',
                    email: 'Email',
                    phone: 'Téléphone',
                    level: 'Niveau en kite/wing',
                    level_select: 'Sélectionnez...',
                    level_beginner: 'Débutant',
                    level_intermediate: 'Intermédiaire',
                    level_advanced: 'Avancé',
                    level_expert: 'Expert',
                    message: 'Message',
                    rgpd: 'J\'accepte que mes données soient utilisées pour me recontacter',
                    submit: 'Envoyer'
                }
            },
            footer: {
                legal: 'Mentions Légales',
                cgv: 'CGV',
                privacy: 'Politique de Confidentialité',
                copyright: '© 2025 Experience Kite & Wing Retreats - Tous droits réservés'
            }
        },
        en: {
            intro: {
                title: 'EXPERIENCE',
                subtitle: 'KITE & WING RETREATS',
                slogan: 'Where the Sea Meets the Soul'
            },
            scroll: 'Scroll',
            almanarre: {
                title: 'The Wind Paradise',
                subtitle: 'Over 200 windy days per year',
                description: "L'Almanarre, located on the Giens peninsula, is one of Europe's most renowned kitesurfing and wingfoil spots. With its constant thermal wind, turquoise waters and paradise-like setting, it's the perfect place to experience an unforgettable blend of sport and relaxation."
            },
            formules: {
                title: 'Our Packages',
                premium: {
                    title: 'Premium Stay',
                    subtitle: 'An exceptional week',
                    feature1: 'Luxury villa with sea view',
                    feature2: 'Private chef',
                    feature3: 'Kite & wingfoil coaching',
                    feature4: 'Yoga sessions',
                    feature5: 'SPA relaxation',
                    feature6: 'Bike & hiking excursions',
                    max: 'Max. 12 people',
                    btn: 'Learn more'
                },
                privatisation: {
                    title: 'Private Booking',
                    subtitle: 'Groups & Seminars',
                    description: 'Create your tailor-made experience for your group or company. Team building, incentive seminar, or simply with friends: we customize every detail according to your wishes.',
                    devis: 'Custom quote',
                    btn: 'Request a quote'
                }
            },
            map: {
                title: 'Just Hours Away',
                subtitle: 'Accessible from all over Europe'
            },
            contact: {
                title: 'Tell Us About You',
                subtitle: 'Join the experience',
                form: {
                    firstname: 'First Name',
                    lastname: 'Last Name',
                    email: 'Email',
                    phone: 'Phone',
                    level: 'Kite/Wing Level',
                    level_select: 'Select...',
                    level_beginner: 'Beginner',
                    level_intermediate: 'Intermediate',
                    level_advanced: 'Advanced',
                    level_expert: 'Expert',
                    message: 'Message',
                    rgpd: 'I agree to my data being used to contact me',
                    submit: 'Send'
                }
            },
            footer: {
                legal: 'Legal Notice',
                cgv: 'Terms & Conditions',
                privacy: 'Privacy Policy',
                copyright: '© 2025 Experience Kite & Wing Retreats - All rights reserved'
            }
        }
    };
    
    return translations[lang] || translations.fr;
}

// ============================================
// DÉTECTION AUTOMATIQUE DE LA LANGUE
// ============================================

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('en') ? 'en' : 'fr';
}

// Détecter et appliquer la langue du navigateur au premier chargement
/*
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (!savedLang) {
        const detectedLang = detectBrowserLanguage();
        switchLanguage(detectedLang);
    }
});
*/

// ============================================
// EXPORT DES FONCTIONS
// ============================================

window.switchLanguage = switchLanguage;
window.getCurrentLanguage = () => currentLanguage;

console.log('✅ Language.js chargé');