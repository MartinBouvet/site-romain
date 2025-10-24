# 🌊 Experience Kite & Wing Retreats

Site vitrine premium pour séjours de kitesurf et wingfoil à L'Almanarre.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Configuration](#configuration)
- [Personnalisation](#personnalisation)
- [Déploiement](#déploiement)
- [Support](#support)

---

## 🎯 Vue d'ensemble

Site moderne avec :
- ✅ 5 slides verticales avec scroll hijacking
- ✅ Vidéos en arrière-plan
- ✅ Animation de carte Europe interactive
- ✅ Formulaire de contact avec validation
- ✅ Bilinguisme FR/EN
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Modales pour détails des séjours
- ✅ Animations CSS fluides

---

## 📁 Structure du projet

```
yalame-retreats/
│
├── index.html              # Page principale (FR)
├── index-en.html           # Version anglaise (à créer)
│
├── css/                    # Tous les styles
│   ├── main.css           # Styles principaux
│   ├── animations.css     # Animations
│   ├── responsive.css     # Media queries
│   └── fonts.css          # Polices
│
├── js/                     # Scripts JavaScript
│   ├── main.js            # Script principal
│   ├── slider.js          # Slider vertical
│   ├── video-background.js # Gestion vidéos
│   ├── map.js             # Carte Europe
│   ├── form.js            # Formulaire contact
│   └── language.js        # Switch FR/EN
│
├── assets/                 # Médias
│   ├── images/
│   │   ├── logo/          # Logo frangipanier
│   │   ├── slides/        # Photos galerie
│   │   └── icons/         # Icônes SVG
│   └── videos/
│       ├── video1.mp4     # Vidéo kite
│       └── video2.mp4     # Vidéo lieu
│
├── data/                   # Données JSON
│   ├── retreats.json      # Dates et prix
│   └── translations.json  # Traductions FR/EN
│
└── pages/                  # Pages légales
    ├── mentions-legales.html
    ├── cgv.html
    └── politique-confidentialite.html
```

---

## 🚀 Installation

### Étape 1 : Récupérer les fichiers

Tous les fichiers sont déjà créés dans le dossier `yalame-retreats/`.

### Étape 2 : Ajouter vos médias

#### **Vidéos** (obligatoire)
Placez vos 2 vidéos dans `assets/videos/` :
- `video1.mp4` → Vidéo de kite/wing
- `video2.mp4` → Vidéo du lieu

**⚠️ Important :** Compressez vos vidéos pour le web :
- Format : MP4 (H.264)
- Résolution : 1920x1080 max
- Bitrate : 3000-5000 kbps
- Outil recommandé : [HandBrake](https://handbrake.fr/)

#### **Logo** (obligatoire)
Placez votre logo de fleur de frangipanier :
- `assets/images/logo/frangipanier-logo.png`
- Format : PNG avec fond transparent
- Taille : 500x500 px minimum

#### **Photos** (pour la galerie)
Placez vos photos dans `assets/images/slides/` :
- `image1.jpg` → Villa/hébergement
- `image2.jpg` → Kite action
- `image3.jpg` → Chef/repas
- `image4.jpg` → Yoga/spa
- `image5.jpg` → Excursion/Porquerolles

---

## ⚙️ Configuration

### 1. Modifier les informations de contact

Dans `index.html`, lignes 390-400, remplacez :
```html
<a href="tel:+33610980477">06 10 98 04 77</a>
<a href="mailto:romainpeyre2001@yahoo.fr">romainpeyre2001@yahoo.fr</a>
```

### 2. Configurer l'envoi du formulaire

Le formulaire est actuellement en mode **simulation**. Pour l'activer :

#### Option A : EmailJS (Recommandé - Gratuit)

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un service email
3. Créer un template
4. Dans `index.html`, avant `</body>`, ajouter :
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
(function(){
    emailjs.init("VOTRE_PUBLIC_KEY");
})();
</script>
```
5. Dans `js/form.js`, décommenter et configurer la fonction `sendFormData()`

#### Option B : Formspree (Alternative gratuite)

1. Créer un compte sur [Formspree](https://formspree.io/)
2. Créer un formulaire
3. Dans `index.html`, modifier la balise `<form>` :
```html
<form action="https://formspree.io/f/VOTRE_FORM_ID" method="POST">
```

### 3. Mettre à jour les dates de séjours

Modifier le fichier `data/retreats.json` :
```json
{
  "dates": [
    {
      "id": 1,
      "start": "15 mars 2025",
      "end": "22 mars 2025",
      "available": true,
      "price": 2490
    }
  ]
}
```

### 4. Personnaliser les couleurs

Dans `css/main.css`, modifier les variables de couleur :
```css
/* Couleurs principales */
:root {
    --primary: #0A2540;      /* Bleu foncé */
    --secondary: #D4AF37;    /* Or */
    --accent: #F8F9FA;       /* Blanc cassé */
}
```

---

## 🎨 Personnalisation

### Changer le slogan

Dans `index.html`, ligne 57 :
```html
<p class="slogan">Where the Sea Meets the Soul</p>
```

### Modifier le titre "Le Hawaï du Vent"

Dans `index.html`, ligne 72 :
```html
<h2 class="section-title">Le Hawaï du Vent</h2>
```

### Ajouter/retirer des villes sur la carte

Dans `js/map.js`, ligne 8, modifier l'objet `cities`.

---

## 🌐 Déploiement

### Option 1 : Netlify (Recommandé)

1. Créer un compte sur [Netlify](https://www.netlify.com/)
2. Glisser-déposer le dossier `yalame-retreats`
3. Site en ligne en 30 secondes !
4. Domaine personnalisé : acheter `experience-retreats.com`

### Option 2 : GitHub Pages

1. Créer un repo GitHub
2. Pusher le code
3. Activer GitHub Pages dans les settings

### Option 3 : Hébergement classique

1. Acheter un hébergement (OVH, O2Switch, etc.)
2. Uploader via FTP avec FileZilla
3. Configurer le nom de domaine

---

## 📱 Test du site

### En local

Ouvrir `index.html` directement dans le navigateur.

⚠️ **Problème CORS** : Les fichiers JSON ne se chargeront pas en local.  
**Solution** : Utiliser un serveur local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrir : `http://localhost:8000`

### Sur mobile

1. Déployer sur Netlify (voir ci-dessus)
2. Scanner le QR code généré
3. Tester toutes les fonctionnalités

---

## ✅ Checklist avant mise en ligne

- [ ] Logo ajouté
- [ ] 2 vidéos ajoutées et compressées
- [ ] 5 photos minimum dans la galerie
- [ ] Numéro de téléphone et email mis à jour
- [ ] Formulaire de contact configuré (EmailJS ou Formspree)
- [ ] Dates de séjours mises à jour
- [ ] Prix vérifiés
- [ ] Test sur mobile
- [ ] Test du formulaire
- [ ] Vérification des liens
- [ ] Mentions légales complétées
- [ ] Nom de domaine acheté

---

## 🐛 Problèmes courants

### Les vidéos ne se lancent pas
- Vérifier le format (MP4 H.264)
- Vérifier les chemins dans le code
- Compresser les vidéos si trop lourdes

### Le slider ne fonctionne pas
- Vérifier que tous les JS sont bien chargés
- Ouvrir la console (F12) pour voir les erreurs

### Le formulaire ne s'envoie pas
- Vérifier la configuration EmailJS
- Regarder les logs dans la console

### La carte ne s'affiche pas
- Vérifier le fichier `js/map.js`
- S'assurer que le SVG est bien dans le DOM

---

## 📞 Support

Pour toute question :
- Email : romainpeyre2001@yahoo.fr
- Tel : 06 10 98 04 77

---

## 📄 Licence

© 2025 Experience Kite & Wing Retreats - Tous droits réservés

---

## 🎉 Prochaines étapes

1. ✅ Ajouter vos médias
2. ✅ Configurer le formulaire
3. ✅ Personnaliser les textes
4. ✅ Tester en local
5. ✅ Déployer sur Netlify
6. ✅ Acheter le nom de domaine
7. ✅ Partager avec le monde ! 🌍

**Bon succès avec ton site ! 🚀**