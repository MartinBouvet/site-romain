/* ============================================
   LANGUAGE.JS - Gestion du bilinguisme FR/EN
   ============================================ */

   let currentLanguage = 'fr';

   // ============================================
   // INITIALISATION
   // ============================================
   
   document.addEventListener('DOMContentLoaded', () => {
       console.log('🌍 Initialisation du système de langue...');
       initLanguageSwitch();
   });
   
   function initLanguageSwitch() {
       const langButtons = document.querySelectorAll('.lang-btn');
       
       if (!langButtons || langButtons.length === 0) {
           console.error('❌ Aucun bouton de langue trouvé');
           return;
       }
       
       console.log(`✅ ${langButtons.length} boutons de langue trouvés`);
       
       langButtons.forEach(button => {
           button.addEventListener('click', function(e) {
               e.preventDefault();
               const lang = this.getAttribute('data-lang');
               console.log(`🔄 Clic sur le bouton: ${lang}`);
               switchLanguage(lang);
           });
       });
   }
   
   // ============================================
   // CHANGEMENT DE LANGUE
   // ============================================
   
   async function switchLanguage(lang) {
       console.log(`🔄 Changement de langue vers: ${lang}`);
       
       if (lang === currentLanguage) {
           console.log('⚠️ Langue déjà active');
           return;
       }
       
       try {
           // Charger les traductions
           const translations = await loadTranslations(lang);
           
           // Appliquer les traductions
           applyTranslations(translations);
           
           // Mettre à jour les boutons
           updateActiveLanguageButton(lang);
           
           // Sauvegarder la langue
           currentLanguage = lang;
           
           console.log(`✅ Langue changée: ${lang.toUpperCase()}`);
           
       } catch (error) {
           console.error('❌ Erreur lors du changement de langue:', error);
       }
   }
   
   // ============================================
   // CHARGEMENT DES TRADUCTIONS
   // ============================================
   
   async function loadTranslations(lang) {
       try {
           console.log(`📥 Chargement des traductions ${lang}...`);
           const response = await fetch('data/translations.json');
           
           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }
           
           const allTranslations = await response.json();
           console.log('✅ Traductions chargées:', allTranslations);
           
           return allTranslations[lang];
           
       } catch (error) {
           console.error('❌ Erreur chargement traductions:', error);
           return getDefaultTranslations(lang);
       }
   }
   
   // ============================================
   // APPLIQUER LES TRADUCTIONS
   // ============================================
   
   function applyTranslations(translations) {
       console.log('🔄 Application des traductions...');
       
       // Traduire tous les éléments avec data-translate
       const elements = document.querySelectorAll('[data-translate]');
       console.log(`📝 ${elements.length} éléments à traduire`);
       
       elements.forEach(element => {
           const key = element.getAttribute('data-translate');
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
               console.log(`✅ Traduit: ${key} → ${translation}`);
           } else {
               console.warn(`⚠️ Traduction manquante pour: ${key}`);
           }
       });
       
       console.log('✅ Traductions appliquées');
   }
   
   // ============================================
   // RÉCUPÉRER UNE TRADUCTION IMBRIQUÉE
   // ============================================
   
   function getNestedTranslation(obj, path) {
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
           const buttonLang = button.getAttribute('data-lang');
           if (buttonLang === lang) {
               button.classList.add('active');
               console.log(`✅ Bouton ${lang} activé`);
           } else {
               button.classList.remove('active');
               console.log(`➖ Bouton ${buttonLang} désactivé`);
           }
       });
   }
   
   // ============================================
   // TRADUCTIONS PAR DÉFAUT (SI FICHIER MANQUANT)
   // ============================================
   
   function getDefaultTranslations(lang) {
       console.log('⚠️ Utilisation des traductions par défaut');
       
       const translations = {
           fr: {
               intro: {
                   title: "EXPERIENCE",
                   subtitle: "KITE & WING RETREATS",
                   slogan: "Where the Sea Meets the Soul",
                   btn: "Réserver votre expérience"
               }
           },
           en: {
               intro: {
                   title: "EXPERIENCE",
                   subtitle: "KITE & WING RETREATS",
                   slogan: "Where the Sea Meets the Soul",
                   btn: "Book Your Experience"
               }
           }
       };
       
       return translations[lang] || translations.fr;
   }
   
   // ============================================
   // EXPORT
   // ============================================
   
   window.switchLanguage = switchLanguage;
   window.getCurrentLanguage = () => currentLanguage;
   
   console.log('✅ Language.js chargé et prêt');