/* ============================================
   MAP.JS - Animation carte Europe
   Trajets d'avions vers L'Almanarre
   ============================================ */

// Coordonnées EXACTES basées sur ton screenshot
// ViewBox : 1110 x 1280, les villes sont au centre (autour de 500-550 x, 400-500 y)
const cities = {
    // Ligne du haut (très proches)
    amsterdam: { x: 470, y: 480, name: 'Amsterdam' },
    berlin: { x: 558, y: 490, name: 'Berlin' },
    
    // Ligne en dessous
    london: { x: 400, y: 500, name: 'London' },
    brussels: { x: 470, y: 530, name: 'Brussels' },
    
    // Centre (groupe principal)
    paris: { x: 440, y: 560, name: 'Paris' },
    hyeres: { x: 470, y: 640, name: "L'Almanarre" },      // ⭐ GROS POINT DORÉ
    
    // Juste en dessous
    geneva: { x: 490, y: 590, name: 'Geneva' },
    barcelona: { x: 433, y: 666, name: 'Barcelona' },
    rome: { x: 555, y: 660, name: 'Rome' },
    
    // Bas gauche
    madrid: { x: 365, y: 680, name: 'Madrid' },
    lisbon: { x: 310, y: 700, name: 'Lisbon' }
};

// ============================================
// INITIALISATION DE LA CARTE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initMap();
    }, 500); // Petit délai pour s'assurer que tout est chargé
});

function initMap() {
    const mapSvg = document.getElementById('europeMap');
    if (!mapSvg) {
        console.warn('Carte Europe non trouvée');
        return;
    }
    
    console.log('🗺️ Initialisation de la carte...');
    
    // Pas besoin de créer le fond, l'image est déjà là !
    // On ajoute juste les marqueurs et trajets
    
    // Ajouter les marqueurs des villes
    createCityMarkers(mapSvg);
    
    // Créer les trajets d'avion
    createFlightPaths(mapSvg);
    
    // Animer les trajets quand la slide devient visible
    observeMapSlide();
    
    console.log('✅ Carte Europe initialisée');
}

// ============================================
// CRÉER LES MARQUEURS DES VILLES
// ============================================

function createCityMarkers(svg) {
    Object.entries(cities).forEach(([key, city]) => {
        const isDestination = key === 'hyeres';
        
        // Groupe pour la ville
        const cityGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        cityGroup.setAttribute('class', `city-marker ${isDestination ? 'destination' : ''}`);
        
        // Point de la ville
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', city.x);
        circle.setAttribute('cy', city.y);
        circle.setAttribute('r', isDestination ? '12' : '6');
        circle.setAttribute('fill', isDestination ? '#D4AF37' : 'rgba(255, 255, 255, 0.8)');
        circle.setAttribute('stroke', isDestination ? '#f0c44d' : 'rgba(255, 255, 255, 0.6)');
        circle.setAttribute('stroke-width', '2');
        
        // Animation de pulsation pour la destination
        if (isDestination) {
            const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            pulse.setAttribute('attributeName', 'r');
            pulse.setAttribute('values', '12;16;12');
            pulse.setAttribute('dur', '2s');
            pulse.setAttribute('repeatCount', 'indefinite');
            circle.appendChild(pulse);
        }
        
        cityGroup.appendChild(circle);
        
        // Label de la ville (toujours visible)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', city.x);
        text.setAttribute('y', city.y - (isDestination ? 25 : 18));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', isDestination ? '#D4AF37' : 'rgba(255, 255, 255, 0.9)');
        text.setAttribute('font-size', isDestination ? '16' : '12');
        text.setAttribute('font-weight', isDestination ? 'bold' : '500');
        text.setAttribute('class', 'city-label');
        text.textContent = city.name;
        
        cityGroup.appendChild(text);
        
        svg.appendChild(cityGroup);
    });
}

// ============================================
// CRÉER LES TRAJETS D'AVION
// ============================================

function createFlightPaths(svg) {
    // Créer les trajets depuis chaque ville vers Hyères
    Object.entries(cities).forEach(([key, city]) => {
        if (key === 'hyeres') return; // Pas de trajet depuis la destination
        
        const path = createFlightPath(svg, city, cities.hyeres);
        
        // Animer le trajet
        animateFlightPath(path);
    });
}

function createFlightPath(svg, fromCity, toCity) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', 'flight-path');
    
    // Créer une courbe de Bézier pour le trajet
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Point de contrôle pour la courbe (plus haut pour effet d'arc)
    const controlX = (fromCity.x + toCity.x) / 2;
    const controlY = Math.min(fromCity.y, toCity.y) - 80; // Arc vers le haut
    
    const pathData = `M ${fromCity.x},${fromCity.y} Q ${controlX},${controlY} ${toCity.x},${toCity.y}`;
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(212, 175, 55, 0.6)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '8,4');
    path.setAttribute('opacity', '0');
    
    group.appendChild(path);
    
    // Ajouter un avion qui suit le trajet
    const plane = createPlane(svg);
    group.appendChild(plane);
    
    // Stocker les données pour l'animation
    group.dataset.pathData = pathData;
    
    svg.appendChild(group);
    
    return group;
}

function createPlane(svg) {
    // Créer un simple icône d'avion
    const plane = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    plane.setAttribute('class', 'plane');
    plane.setAttribute('opacity', '0');
    
    // Forme d'avion simplifiée (plus grande)
    const planePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    planePath.setAttribute('d', 'M 0,-6 L -4,4 L 0,2 L 4,4 Z');
    planePath.setAttribute('fill', '#D4AF37');
    planePath.setAttribute('stroke', '#f0c44d');
    planePath.setAttribute('stroke-width', '1');
    
    plane.appendChild(planePath);
    
    return plane;
}

// ============================================
// ANIMER LES TRAJETS
// ============================================

function animateFlightPath(pathGroup) {
    const path = pathGroup.querySelector('path');
    const plane = pathGroup.querySelector('.plane');
    
    if (!path || !plane) return;
    
    // Longueur du trajet
    const pathLength = path.getTotalLength();
    
    // Animation CSS du trajet
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.opacity = '1';
    
    // Fonction pour animer le trajet
    let start = null;
    const duration = 3000; // 3 secondes
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        // Animer le trajet
        path.style.strokeDashoffset = pathLength * (1 - progress);
        
        // Déplacer l'avion le long du trajet
        if (progress > 0.1) { // Commencer l'avion après 10% du trajet
            plane.setAttribute('opacity', '1');
            const point = path.getPointAtLength(pathLength * progress);
            
            // Calculer l'angle de rotation de l'avion
            const point2 = path.getPointAtLength(pathLength * Math.min(progress + 0.01, 1));
            const angle = Math.atan2(point2.y - point.y, point2.x - point.x) * 180 / Math.PI;
            
            plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle + 90})`);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation terminée, garder l'avion visible quelques secondes
            setTimeout(() => {
                plane.style.opacity = '0';
            }, 2000);
        }
    }
    
    // Démarrer l'animation après un délai aléatoire
    const delay = Math.random() * 1000;
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, delay);
}

// ============================================
// OBSERVER LA SLIDE DE LA CARTE
// ============================================

function observeMapSlide() {
    const mapSlide = document.querySelector('.slide-map');
    if (!mapSlide) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // La carte devient visible, lancer les animations
                setTimeout(() => {
                    animateAllFlights();
                }, 500);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(mapSlide);
}

function animateAllFlights() {
    const flightPaths = document.querySelectorAll('.flight-path');
    flightPaths.forEach((path, index) => {
        setTimeout(() => {
            animateFlightPath(path);
        }, index * 200); // Décalage entre chaque animation
    });
}

// ============================================
// RESPONSIVE - Ajuster la carte
// ============================================

function adjustMapForMobile() {
    if (window.innerWidth < 768) {
        // Sur mobile, on pourrait simplifier la carte
        const cityLabels = document.querySelectorAll('.city-label');
        cityLabels.forEach(label => {
            // Masquer certains labels pour éviter la surcharge
            if (!label.closest('.destination')) {
                label.style.fontSize = '8px';
            }
        });
    }
}

window.addEventListener('resize', debounce(adjustMapForMobile, 200));

// Fonction debounce (utilise celle de main.js ou redéfinir ici)
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

console.log('✅ Map.js chargé');