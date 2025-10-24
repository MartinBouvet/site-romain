// ============================================
// CARTE EUROPE INTERACTIVE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const mapSvg = document.getElementById('europe-map');
    
    if (!mapSvg) return;
    
    // ============================================
    // COORDONNÉES DES VILLES (relatives au SVG)
    // ============================================
    
    const cities = [
        { name: 'Paris', x: 250, y: 180, country: 'France' },
        { name: 'Londres', x: 200, y: 150, country: 'Royaume-Uni' },
        { name: 'Bruxelles', x: 240, y: 160, country: 'Belgique' },
        { name: 'Amsterdam', x: 260, y: 140, country: 'Pays-Bas' },
        { name: 'Berlin', x: 350, y: 140, country: 'Allemagne' },
        { name: 'Munich', x: 340, y: 180, country: 'Allemagne' },
        { name: 'Zurich', x: 310, y: 200, country: 'Suisse' },
        { name: 'Milan', x: 320, y: 230, country: 'Italie' },
        { name: 'Barcelone', x: 230, y: 280, country: 'Espagne' },
        { name: 'Madrid', x: 180, y: 290, country: 'Espagne' }
    ];
    
    const destination = {
        name: "L'Almanarre",
        x: 290,
        y: 260
    };
    
    // ============================================
    // CRÉER LA CARTE
    // ============================================
    
    function createMap() {
        // Fond de la carte (simplifié)
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('width', '800');
        background.setAttribute('height', '600');
        background.setAttribute('fill', 'rgba(255,255,255,0.02)');
        background.setAttribute('rx', '15');
        mapSvg.appendChild(background);
        
        // Contour Europe simplifié
        drawEuropeOutline();
        
        // Dessiner les trajets d'avion
        cities.forEach(city => {
            drawFlightPath(city, destination);
        });
        
        // Dessiner les villes
        cities.forEach(city => {
            drawCity(city, false);
        });
        
        // Dessiner la destination (L'Almanarre) en plus grand
        drawCity(destination, true);
        
        // Légende
        drawLegend();
    }
    
    // ============================================
    // DESSINER LE CONTOUR DE L'EUROPE
    // ============================================
    
    function drawEuropeOutline() {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Contour simplifié de l'Europe
        const europePath = `
            M 150 120
            Q 180 100, 220 110
            Q 280 100, 340 110
            Q 400 120, 450 160
            Q 470 200, 460 250
            Q 450 300, 420 340
            Q 380 380, 320 390
            Q 260 380, 220 360
            Q 180 330, 160 290
            Q 140 240, 150 200
            Q 155 160, 150 120
            Z
        `;
        
        path.setAttribute('d', europePath);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(212,175,55,0.2)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '10,5');
        
        mapSvg.appendChild(path);
    }
    
    // ============================================
    // DESSINER TRAJET D'AVION
    // ============================================
    
    function drawFlightPath(from, to) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('flight-path');
        
        // Ligne pointillée
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('stroke', 'rgba(212,175,55,0.4)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        line.classList.add('flight-line');
        
        group.appendChild(line);
        
        // Icône avion (petit triangle)
        const plane = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        
        plane.setAttribute('d', 'M -6,-3 L 6,0 L -6,3 Z');
        plane.setAttribute('fill', '#D4AF37');
        plane.setAttribute('transform', `translate(${midX}, ${midY}) rotate(${angle})`);
        plane.classList.add('plane-icon');
        
        group.appendChild(plane);
        mapSvg.appendChild(group);
        
        // Animation au survol
        group.addEventListener('mouseenter', function() {
            line.setAttribute('stroke', 'rgba(212,175,55,0.8)');
            line.setAttribute('stroke-width', '3');
        });
        
        group.addEventListener('mouseleave', function() {
            line.setAttribute('stroke', 'rgba(212,175,55,0.4)');
            line.setAttribute('stroke-width', '2');
        });
    }
    
    // ============================================
    // DESSINER VILLE
    // ============================================
    
    function drawCity(city, isDestination = false) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('city-marker');
        
        // Point de la ville
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', city.x);
        circle.setAttribute('cy', city.y);
        circle.setAttribute('r', isDestination ? '12' : '6');
        circle.setAttribute('fill', isDestination ? '#D4AF37' : '#fff');
        circle.setAttribute('stroke', isDestination ? '#fff' : '#D4AF37');
        circle.setAttribute('stroke-width', '2');
        
        if (isDestination) {
            circle.setAttribute('filter', 'drop-shadow(0 0 10px rgba(212,175,55,0.8))');
        }
        
        group.appendChild(circle);
        
        // Nom de la ville
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', city.x);
        text.setAttribute('y', city.y - (isDestination ? 20 : 12));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', isDestination ? '16' : '12');
        text.setAttribute('font-weight', isDestination ? 'bold' : 'normal');
        text.textContent = city.name;
        
        if (isDestination) {
            text.setAttribute('fill', '#D4AF37');
        }
        
        group.appendChild(text);
        
        // Animation pulsation pour destination
        if (isDestination) {
            const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulseCircle.setAttribute('cx', city.x);
            pulseCircle.setAttribute('cy', city.y);
            pulseCircle.setAttribute('r', '12');
            pulseCircle.setAttribute('fill', 'none');
            pulseCircle.setAttribute('stroke', '#D4AF37');
            pulseCircle.setAttribute('stroke-width', '2');
            pulseCircle.setAttribute('opacity', '0');
            
            // Animation CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulse {
                    0% {
                        r: 12;
                        opacity: 0.8;
                    }
                    100% {
                        r: 30;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            pulseCircle.style.animation = 'pulse 2s ease-out infinite';
            group.insertBefore(pulseCircle, group.firstChild);
        }
        
        // Tooltip au survol
        group.addEventListener('mouseenter', function() {
            if (!isDestination && city.country) {
                showTooltip(city.x, city.y - 25, `${city.name}, ${city.country}`);
            }
            circle.setAttribute('r', isDestination ? '14' : '8');
        });
        
        group.addEventListener('mouseleave', function() {
            hideTooltip();
            circle.setAttribute('r', isDestination ? '12' : '6');
        });
        
        mapSvg.appendChild(group);
    }
    
    // ============================================
    // LÉGENDE
    // ============================================
    
    function drawLegend() {
        const legendGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        legendGroup.setAttribute('transform', 'translate(20, 520)');
        
        // Fond légende
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('width', '200');
        bg.setAttribute('height', '60');
        bg.setAttribute('fill', 'rgba(0,0,0,0.5)');
        bg.setAttribute('rx', '10');
        legendGroup.appendChild(bg);
        
        // Texte légende
        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text1.setAttribute('x', '15');
        text1.setAttribute('y', '25');
        text1.setAttribute('fill', '#fff');
        text1.setAttribute('font-size', '12');
        text1.textContent = '✈️ Trajets directs';
        legendGroup.appendChild(text1);
        
        const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text2.setAttribute('x', '15');
        text2.setAttribute('y', '45');
        text2.setAttribute('fill', '#D4AF37');
        text2.setAttribute('font-size', '12');
        text2.setAttribute('font-weight', 'bold');
        text2.textContent = "⭐ L'Almanarre";
        legendGroup.appendChild(text2);
        
        mapSvg.appendChild(legendGroup);
    }
    
    // ============================================
    // TOOLTIP
    // ============================================
    
    let tooltip;
    
    function showTooltip(x, y, text) {
        if (!tooltip) {
            tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bg.setAttribute('fill', 'rgba(0,0,0,0.9)');
            bg.setAttribute('rx', '5');
            tooltip.appendChild(bg);
            
            const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textEl.setAttribute('fill', '#fff');
            textEl.setAttribute('font-size', '12');
            textEl.setAttribute('text-anchor', 'middle');
            tooltip.appendChild(textEl);
            
            mapSvg.appendChild(tooltip);
        }
        
        const textEl = tooltip.querySelector('text');
        textEl.textContent = text;
        
        // Ajuster la taille du fond
        const bbox = textEl.getBBox();
        const bg = tooltip.querySelector('rect');
        bg.setAttribute('x', x - bbox.width / 2 - 10);
        bg.setAttribute('y', y - 20);
        bg.setAttribute('width', bbox.width + 20);
        bg.setAttribute('height', '25');
        
        textEl.setAttribute('x', x);
        textEl.setAttribute('y', y - 5);
        
        tooltip.style.opacity = '1';
    }
    
    function hideTooltip() {
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
    
    // ============================================
    // INITIALISATION
    // ============================================
    
    createMap();
});