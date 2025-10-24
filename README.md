# 🌊 EXPERIENCE - Kite & Wing Retreats

Site vitrine premium pour séjours de kitesurf et wingfoil à L'Almanarre.

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Personnalisation](#personnalisation)
5. [Google Sheets](#google-sheets)
6. [Déploiement](#déploiement)

---

## 🎯 VUE D'ENSEMBLE

### ✅ Ce qui est intégré

- **Logo2 en arrière-plan** de la page d'accueil (style luxe)
- **Vidéo2** sur la page d'accueil
- **Slogan "Plus de 200 jours de vent"** en très gros
- **Carte Europe agrandie** avec 10 villes
- **"À 1h de vol"** au lieu de "À quelques heures"
- **Info aéroport Hyères** bien visible
- **Formulaire organique** avec questions ouvertes
- **Envoi email** vers romainpeyre2001@yahoo.fr
- **Gestion disponibilités** via Google Sheets
- **Suppressions** : "Max 12 personnes", "Vue mer"

---

## 🚀 INSTALLATION

### Étape 1 : Fichiers

Tous les fichiers sont déjà créés dans le dossier `yalame-site/` :

```
yalame-site/
├── index.html
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── slider.js
│   ├── map.js
│   ├── form.js
│   └── availability.js
└── assets/
    ├── images/logo/logo2.png
    └── videos/
        ├── video1.mp4 (à ajouter)
        └── video2.mp4 (à ajouter)
```

### Étape 2 : Ajouter les vidéos

⚠️ **IMPORTANT** : Tu dois ajouter tes 2 vidéos :

1. Place **video1.mp4** dans `assets/videos/`
2. Place **video2.mp4** dans `assets/videos/`

**Spécifications vidéos :**
- Format : MP4 (H.264)
- Résolution : 1920x1080 max
- Poids : Compresser à moins de 20 Mo pour le web
- Outil recommandé : [HandBrake](https://handbrake.fr/)

---

## ⚙️ CONFIGURATION

### 1. Numéro de téléphone

Ouvre `index.html` et cherche cette ligne (vers la ligne 285) :

```html
<a href="tel:+33123456789" class="phone-link">+33 1 23 45 67 89</a>
```

Remplace par ton vrai numéro :

```html
<a href="tel:+33612345678" class="phone-link">+33 6 12 34 56 78</a>
```

### 2. Email de réception

✅ **Déjà configuré** : Les emails arrivent sur `romainpeyre2001@yahoo.fr`

Le formulaire utilise **FormSubmit** (gratuit, sans inscription).

### 3. Google Sheets (Disponibilités)

Voir la section complète [Google Sheets](#google-sheets) ci-dessous.

---

## 🎨 PERSONNALISATION

### Couleurs

Les couleurs principales sont dans `css/main.css` :

```css
#D4AF37  /* Or doré (couleur principale) */
#0A2540  /* Bleu nuit (arrière-plans) */
#fff     /* Blanc (textes) */
```

Pour changer les couleurs, fais une recherche globale et remplace.

### Textes

Tous les textes sont dans `index.html` :

- **Slogan** : Ligne 61 - `"Where the Sea Meets the Soul"`
- **Description Almanarre** : Ligne 82
- **Formules** : À partir de la ligne 100

### Animations

Pour désactiver/modifier les animations, voir `css/animations.css`.

---

## 📊 GOOGLE SHEETS

### Configuration complète

#### Étape 1 : Créer le Google Sheet

1. Va sur [Google Sheets](https://sheets.google.com)
2. Crée un nouveau document
3. Nomme-le "Disponibilités Experience"

#### Étape 2 : Structure du tableau

Crée ces colonnes (exactement dans cet ordre) :

| A - Date début | B - Date fin | C - Prix | D - Statut |
|----------------|--------------|----------|------------|
| 2025-06-15     | 2025-06-22   | 2890     | Disponible |
| 2025-06-29     | 2025-07-06   | 3190     | Disponible |
| 2025-07-13     | 2025-07-20   | 3490     | Complet    |

**Formats importants :**
- **Dates** : YYYY-MM-DD (ex: 2025-06-15)
- **Prix** : Nombre sans symbole (ex: 2890)
- **Statut** : Disponible / Complet / Réservé

#### Étape 3 : Publier le sheet

1. Fichier → Partager → **Publier sur le Web**
2. Choisir **"Feuille 1"**
3. Format : **CSV**
4. Cliquer sur **Publier**
5. Copier le lien généré (il ressemble à ça) :

```
https://docs.google.com/spreadsheets/d/e/2PACX-1vS.../pub?output=csv
```

#### Étape 4 : Configurer le site

Ouvre `js/availability.js` et remplace la ligne 19 :

```javascript
const SHEET_URL = 'VOTRE_LIEN_GOOGLE_SHEET_CSV_ICI';
```

Par :

```javascript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS.../pub?output=csv';
```

#### Étape 5 : Tester

Recharge la page. Les dates devraient apparaître automatiquement.

### Mise à jour des disponibilités

**C'est ultra simple :**

1. Ouvre ton Google Sheet
2. Modifie directement les dates, prix ou statuts
3. Sauvegarde (automatique)
4. **Le site se met à jour tout seul** (délai : 1-2 minutes max)

**Pas besoin de toucher au code !** 🎉

### Statuts possibles

- **Disponible** : Affiché en vert, cliquable
- **Complet** : Affiché en rouge
- **Réservé** : Affiché en orange

---

## 🌐 DÉPLOIEMENT

### Option 1 : Netlify (Recommandé, gratuit)

1. Va sur [netlify.com](https://netlify.com)
2. **Drag & drop** le dossier `yalame-site/`
3. Ton site est en ligne en 30 secondes !
4. URL gratuite : `ton-site.netlify.app`

**Domaine personnalisé (optionnel) :**
- Acheter un domaine (ex: experience-retreats.com)
- Le connecter dans Netlify (guide intégré)

### Option 2 : Vercel (Gratuit aussi)

Même principe que Netlify :
1. [vercel.com](https://vercel.com)
2. Import du dossier
3. En ligne en 1 min

### Option 3 : Hébergement classique

1. Acheter un hébergement (ex: OVH, o2switch)
2. Uploader tous les fichiers via FTP
3. Configurer le nom de domaine

---

## 📱 TEST DU SITE

### Sur ton ordinateur (local)

**Option simple :**
1. Double-clique sur `index.html`
2. Le site s'ouvre dans ton navigateur

⚠️ **Attention** : Les vidéos et certaines fonctions peuvent ne pas marcher en local. Teste plutôt en ligne.

**Option avec serveur local :**

```bash
# Si tu as Python installé
cd yalame-site
python -m http.server 8000
```

Puis ouvre : `http://localhost:8000`

### Sur mobile

Une fois déployé (Netlify/Vercel), teste sur ton téléphone :
- Design responsive ✅
- Vidéos ✅
- Formulaire ✅
- Carte interactive ✅

---

## 🛠️ PROBLÈMES COURANTS

### Les vidéos ne s'affichent pas

**Causes possibles :**
- Fichiers vidéo manquants → Vérifie `assets/videos/`
- Vidéos trop lourdes → Compresse-les
- Format incompatible → Utilise MP4 (H.264)

### Les dates ne se chargent pas

**Solutions :**
1. Vérifie que le lien Google Sheet est bien dans `js/availability.js`
2. Le sheet doit être **publié sur le web**
3. Respecte le format des dates : `YYYY-MM-DD`

### Le formulaire ne fonctionne pas

**Vérifie :**
1. L'email dans `index.html` (ligne 215)
2. Connexion internet active
3. Formulaire rempli complètement

### La carte ne s'affiche pas

La carte est créée en JavaScript. Si elle ne s'affiche pas :
1. Ouvre la console du navigateur (F12)
2. Vérifie les erreurs JavaScript
3. Le fichier `js/map.js` doit être chargé

---

## 📞 CONTACT & SUPPORT

**Email :** romainpeyre2001@yahoo.fr

**Questions fréquentes :**

**Q : Comment changer les villes sur la carte ?**
→ Ouvre `js/map.js`, ligne 12, modifie le tableau `cities`

**Q : Comment ajouter des traductions EN ?**
→ Il faudra créer un fichier `index-en.html` ou utiliser un système de traduction JS

**Q : Comment modifier le logo ?**
→ Remplace `assets/images/logo/logo2.png` (garde le même nom)

**Q : Les animations sont trop rapides/lentes ?**
→ Modifie les durées dans `css/animations.css`

---

## 🎉 RÉCAPITULATIF

### ✅ Ce qui est fait

1. Logo2 en fond ✅
2. Vidéo2 sur page accueil ✅
3. Slogan énorme ✅
4. Carte agrandie + villes ✅
5. Titre "À 1h de vol" ✅
6. Info aéroport Hyères ✅
7. Formulaire organique ✅
8. Email vers romainpeyre2001@yahoo.fr ✅
9. Google Sheets pour dispo ✅
10. Suppressions (max 12, vue mer) ✅

### 🔧 Ce qu'il te reste à faire

1. **Ajouter les 2 vidéos** (video1.mp4 et video2.mp4)
2. **Configurer Google Sheets** (5 minutes)
3. **Changer le numéro de téléphone** dans index.html
4. **Déployer le site** sur Netlify
5. **Tester sur mobile**

**Temps estimé : 30 minutes max** 🚀

---

## 📄 LICENCE

Projet privé - Tous droits réservés © Experience Kite & Wing Retreats

---

**Site créé avec ❤️ pour Experience**

*Dernière mise à jour : 24 octobre 2025*