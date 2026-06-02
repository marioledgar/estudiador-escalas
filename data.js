let scaleHistory = [];
let scaleData = {};
let container = document.getElementById('container');

if (!Array.prototype.average) {
    Array.prototype.average = function () {
        // 'this' refers to the array the method is called on
        if (this.length === 0) return 0;
        return this.reduce((sum, num) => sum + num, 0) / this.length;
    };
}

function cloneDefaultData() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function loadScaleHistory() {
    const localHistory = localStorage.getItem(HISTORY_KEY);
    if (!localHistory) return [];

    try {
        const storedHistory = JSON.parse(localHistory);
        return Array.isArray(storedHistory) ? storedHistory : [];
    } catch (e) {
        console.error("Error parsing local history:", e);
        return [];
    }
}

function loadScaleData() {
    const localData = localStorage.getItem(DATA_KEY);
    if (localData) {
        try {
            const storedData = JSON.parse(localData);
            if (storedData && typeof storedData === "object" && !Array.isArray(storedData) && Object.keys(storedData).length > 0) {
                return storedData;
            }
        } catch (e) {
            console.error("Error parsing local data:", e);
        }
    }

    const defaultData = cloneDefaultData();
    localStorage.setItem(DATA_KEY, JSON.stringify(defaultData));
    return defaultData;
}

scaleHistory = loadScaleHistory();
scaleData = loadScaleData();

tonalities = Object.keys(scaleData)

function localDateStr(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function previousDay(dateStr) {
    const date = new Date(dateStr + 'T00:00:00'); // hora local
    date.setDate(date.getDate() - 1);
    return localDateStr(date); // <- sin toISOString()
}

function getStreak() {
    const dates = [...new Set(scaleHistory.map(e => e.date).filter(Boolean))].sort().reverse();

    if (dates.length === 0) return 0;

    const today = localDateStr();
    if (dates[0] !== today && dates[0] !== previousDay(today)) return 0;

    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        if (previousDay(dates[i]) === dates[i + 1]) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

function getTotalScales() {
    const unique = new Set(
        scaleHistory
            .filter(e => e.date && e.tonality)
            .map(e => e.date + e.tonality)
    );
    return unique.size;
}

function getTotalSections() {
    return scaleHistory.length;
}

function getSectionQuantities() {
    let m = scaleHistory.filter(e => { return String(e.execution).startsWith('m') }).length;
    let b = scaleHistory.filter(e => { return String(e.execution).startsWith('b') }).length;
    let p = scaleHistory.filter(e => { return String(e.execution).startsWith('p') }).length;
    return [m, b, p]
}

function displayMainStatsBar() {
    container = document.getElementById('container');
    if (!container) return;

    let mainStatsBar = document.createElement('div');
    mainStatsBar.className = "stats-bar data-main-element total-width-spanning";

    let streakItem = document.createElement('div');
    streakItem.className = "stats-bar-streak";

    let streakValue = document.createElement('div');
    streakValue.className = "stats-bar-streak-value";
    streakValue.id = "streaksMainStats";
    streakValue.textContent = `${getStreak()}🔥`;

    streakItem.appendChild(streakValue);
    mainStatsBar.appendChild(streakItem);

    const sectionQuantities = getSectionQuantities();
    const stats = [
        ["played scales", getTotalScales(), "totalScalesMainStats"],
        ["played sections", getTotalSections(), "totalSectionsMainStats"],
        ["perfect sections", sectionQuantities[2], "perfectSectionsMainStats"]
    ];

    stats.forEach(([label, value, id]) => {
        let statItem = document.createElement('div');
        statItem.className = "stats-bar-item";

        let statLabel = document.createElement('div');
        statLabel.className = "stats-bar-label";
        statLabel.textContent = label;
        statItem.appendChild(statLabel);

        let statValue = document.createElement('div');
        statValue.className = "stats-bar-value";
        statValue.id = id;
        statValue.textContent = value;

        statItem.appendChild(statValue);
        mainStatsBar.appendChild(statItem);
    });



    let dataWrapper = document.createElement('div');
    dataWrapper.id = "data-page-wrapper";
    dataWrapper.style.display = "flex";
    dataWrapper.style.flexDirection = "column";
    dataWrapper.style.width = "fit-content";
    dataWrapper.style.maxWidth = "100%";
    dataWrapper.style.margin = "0 auto";

    dataWrapper.appendChild(mainStatsBar);
    container.appendChild(dataWrapper);
}


const getAverageSpeed = (tonality) => { return Object.values(scaleData[tonality].sections).map(e => { return e[1].v }).average(); }

function statsCard(tonality) {
    const averageSpeed = getAverageSpeed(tonality);
    const key = scaleData[tonality].key;
    const match = key.match(/^(\d+)(.*)$/);
    const number = match ? match[1] : key;
    let accidentals = match ? match[2] : "";

    if (number === "0" && accidentals === "♭/♯") {
        accidentals = `<div class="stacked-accidentals"><span>♭</span><span>♯</span></div>`;
    }

    return `
        <div class="tonality-card-header">
            <div class="tonality-card-number">${number}</div>
            <div class="tonality-card-accidentals">${accidentals}</div>
        </div>
        <div class="tonality-card-stats">
            <div class="tonality-card-speed">
                <svg width="24" height="36" viewBox="0 0 20 30" fill="currentColor">
                    <ellipse cx="6" cy="24" rx="6" ry="4" transform="rotate(-20 6 24)" />
                    <rect x="9.78" y="1.38" width="2" height="22" />
                </svg>
                <span>= ${averageSpeed.toFixed(0)}</span>
            </div>
        </div>
    `;
}

function displayStatCards() {
    container = document.getElementById('container');
    if (!container) return;

    let statCardContainer = document.createElement('div');
    statCardContainer.className = 'tonality-grid';
    for (let i = 0; i < tonalities.length; i++) {
        const tonality = tonalities[i];

        let tonalityCard = document.createElement('div');
        tonalityCard.className = 'tonality-card';
        tonalityCard.id = `tonality-card-${tonality}`;
        tonalityCard.innerHTML = statsCard(tonality);

        statCardContainer.appendChild(tonalityCard);
    }

    let newTonalityCard = document.createElement('div');
    newTonalityCard.className = 'tonality-card new-tonality-card';
    newTonalityCard.innerHTML = '<div class="tonality-card-symbol">+</div>';
    statCardContainer.appendChild(newTonalityCard);

    let dataWrapper = document.getElementById('data-page-wrapper');
    if (dataWrapper) {
        dataWrapper.appendChild(statCardContainer);
    } else {
        container.appendChild(statCardContainer);
    }
}

document.addEventListener('DOMContentLoaded', displayMainStatsBar);
document.addEventListener('DOMContentLoaded', displayStatCards);

/*
{
"date":"2026-05-24",
"tonality":"sostenido4",
"section":"normal_mayor",
"speed":80,
"difficulty":5,
"execution":"perfecto"}
*/
