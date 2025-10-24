// ============================================
// GESTION DES DISPONIBILITÉS VIA GOOGLE SHEETS
// ============================================

/*
 * CONFIGURATION GOOGLE SHEETS
 * 
 * 1. Créer un Google Sheet avec ces colonnes:
 *    A: Date de début (format: YYYY-MM-DD)
 *    B: Date de fin (format: YYYY-MM-DD)
 *    C: Prix (ex: 2890)
 *    D: Statut (Disponible / Complet / Réservé)
 * 
 * 2. Publier le sheet:
 *    Fichier > Partager > Publier sur le web
 *    Choisir: "Feuille 1" et format "CSV"
 *    Copier le lien
 * 
 * 3. Remplacer SHEET_URL ci-dessous par votre lien
 */

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTng9bRDKt0g2VzXx_8u0invSVm3ISmrZ6F8m7diXNTQx_JaSsbyxeTsBzieI3GnPSKSF6msi7BMdKz/pub?gid=1762476459&single=true&output=csv';
// ============================================
// FORMAT D'EXEMPLE DU GOOGLE SHEET
// ============================================

/*
Exemple de contenu du Google Sheet:

Date début    | Date fin     | Prix  | Statut
2025-06-15    | 2025-06-22   | 2890  | Disponible
2025-06-29    | 2025-07-06   | 3190  | Disponible
2025-07-13    | 2025-07-20   | 3490  | Complet
2025-07-27    | 2025-08-03   | 3490  | Disponible
2025-08-10    | 2025-08-17   | 3190  | Réservé
2025-08-24    | 2025-08-31   | 2890  | Disponible
*/

// ============================================
// CHARGEMENT DES DATES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadAvailability();
});

async function loadAvailability() {
    const container = document.getElementById('dates-disponibles');
    
    if (!container) return;
    
    // Vérifier si l'URL du sheet est configurée
    if (SHEET_URL === 'VOTRE_LIEN_GOOGLE_SHEET_CSV_ICI') {
        container.innerHTML = `
            <div class="availability-placeholder">
                <h4>📅 Dates à venir</h4>
                <p>Saisons 2025-2026</p>
                <div class="dates-example">
                    <div class="date-item available">
                        <span class="date-range">15 - 22 Juin 2025</span>
                        <span class="price">2 890€</span>
                        <span class="status disponible">Disponible</span>
                    </div>
                    <div class="date-item available">
                        <span class="date-range">29 Juin - 6 Juillet 2025</span>
                        <span class="price">3 190€</span>
                        <span class="status disponible">Disponible</span>
                    </div>
                    <div class="date-item">
                        <span class="date-range">13 - 20 Juillet 2025</span>
                        <span class="price">3 490€</span>
                        <span class="status complet">Complet</span>
                    </div>
                    <div class="date-item available">
                        <span class="date-range">27 Juillet - 3 Août 2025</span>
                        <span class="price">3 490€</span>
                        <span class="status disponible">Disponible</span>
                    </div>
                </div>
                <p class="config-note">
                    ⚙️ <strong>Configuration Google Sheets non détectée.</strong><br>
                    Affichage des dates d'exemple. Consultez le fichier js/availability.js pour configurer.
                </p>
            </div>
        `;
        
        addAvailabilityStyles();
        return;
    }
    
    try {
        container.innerHTML = '<p class="loading">⏳ Chargement des disponibilités...</p>';
        
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        const dates = parseCSV(csvText);
        displayDates(dates, container);
        
    } catch (error) {
        console.error('Erreur chargement disponibilités:', error);
        container.innerHTML = `
            <p class="error">❌ Impossible de charger les dates.</p>
            <p class="error-detail">Merci de nous contacter directement pour connaître les disponibilités.</p>
        `;
    }
}

// ============================================
// PARSER LE CSV
// ============================================

function parseCSV(csv) {
    const lines = csv.split('\n').slice(1); // Ignorer l'en-tête
    const dates = [];
    
    lines.forEach(line => {
        if (!line.trim()) return;
        
        const [dateDebut, dateFin, prix, statut] = line.split(',').map(s => s.trim());
        
        if (dateDebut && dateFin && prix) {
            dates.push({
                dateDebut: dateDebut,
                dateFin: dateFin,
                prix: parseInt(prix),
                statut: statut || 'Disponible'
            });
        }
    });
    
    return dates;
}

// ============================================
// AFFICHER LES DATES
// ============================================

function displayDates(dates, container) {
    if (dates.length === 0) {
        container.innerHTML = '<p>Aucune date disponible pour le moment.</p>';
        return;
    }
    
    let html = '<h4>📅 Dates disponibles</h4><div class="dates-list">';
    
    dates.forEach(date => {
        const dateDebutFormatted = formatDate(date.dateDebut);
        const dateFinFormatted = formatDate(date.dateFin);
        const statusClass = date.statut.toLowerCase().replace('é', 'e');
        const isAvailable = date.statut.toLowerCase() === 'disponible';
        
        html += `
            <div class="date-item ${isAvailable ? 'available' : ''}">
                <span class="date-range">${dateDebutFormatted} - ${dateFinFormatted}</span>
                <span class="price">${formatPrice(date.prix)}</span>
                <span class="status ${statusClass}">${date.statut}</span>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    addAvailabilityStyles();
}

// ============================================
// FORMATER LES DATES
// ============================================

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(price);
}

// ============================================
// STYLES POUR LES DISPONIBILITÉS
// ============================================

function addAvailabilityStyles() {
    if (document.getElementById('availability-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'availability-styles';
    style.textContent = `
        .availability-placeholder h4,
        .dates-list h4 {
            color: #D4AF37;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .dates-example,
        .dates-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .date-item {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 15px;
            padding: 15px 20px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            align-items: center;
            transition: all 0.3s ease;
        }
        
        .date-item.available:hover {
            background: rgba(212,175,55,0.1);
            border-color: rgba(212,175,55,0.3);
            transform: translateX(5px);
        }
        
        .date-range {
            font-weight: 500;
            color: #fff;
        }
        
        .price {
            font-size: 1.2rem;
            font-weight: 600;
            color: #D4AF37;
            text-align: center;
        }
        
        .status {
            padding: 5px 15px;
            border-radius: 20px;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .status.disponible {
            background: rgba(76,175,80,0.2);
            color: #4caf50;
            border: 1px solid #4caf50;
        }
        
        .status.complet {
            background: rgba(244,67,54,0.2);
            color: #f44336;
            border: 1px solid #f44336;
        }
        
        .status.reserve {
            background: rgba(255,152,0,0.2);
            color: #ff9800;
            border: 1px solid #ff9800;
        }
        
        .loading {
            text-align: center;
            color: rgba(255,255,255,0.7);
            font-style: italic;
        }
        
        .error {
            color: #ff9800;
            text-align: center;
            margin: 10px 0;
        }
        
        .error-detail {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.7);
        }
        
        .config-note {
            margin-top: 25px;
            padding: 15px;
            background: rgba(255,152,0,0.1);
            border: 1px solid rgba(255,152,0,0.3);
            border-radius: 10px;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.8);
            line-height: 1.6;
        }
        
        @media screen and (max-width: 768px) {
            .date-item {
                grid-template-columns: 1fr;
                gap: 10px;
                text-align: center;
            }
            
            .price {
                font-size: 1.4rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ============================================
// FONCTION POUR METTRE À JOUR MANUELLEMENT
// ============================================

/*
 * Si tu veux tester sans Google Sheets, tu peux utiliser cette fonction
 * avec des données en dur:
 */

function loadMockData() {
    const mockDates = [
        { dateDebut: '2025-06-15', dateFin: '2025-06-22', prix: 2890, statut: 'Disponible' },
        { dateDebut: '2025-06-29', dateFin: '2025-07-06', prix: 3190, statut: 'Disponible' },
        { dateDebut: '2025-07-13', dateFin: '2025-07-20', prix: 3490, statut: 'Complet' },
        { dateDebut: '2025-07-27', dateFin: '2025-08-03', prix: 3490, statut: 'Disponible' },
        { dateDebut: '2025-08-10', dateFin: '2025-08-17', prix: 3190, statut: 'Réservé' },
        { dateDebut: '2025-08-24', dateFin: '2025-08-31', prix: 2890, statut: 'Disponible' }
    ];
    
    const container = document.getElementById('dates-disponibles');
    displayDates(mockDates, container);
}