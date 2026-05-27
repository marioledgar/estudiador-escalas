let scaleHistory = [];

try {
    scaleHistory = JSON.parse(localStorage.getItem("estudiador_historial") || "[]");
} catch (e) {
    console.error("Error parsing local history:", e);
}

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
    const dates = [...new Set(scaleHistory.map(e => e.date))].sort().reverse();

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
    const unique = new Set(scaleHistory.map(e => e.date + e.tonality));
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
    let container = document.getElementById('container');
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

    const stats = [
        ["played scales", getTotalScales(), "totalScalesMainStats"],
        ["played sections", getTotalSections(), "totalSectionsMainStats"],
        ["perfect sections", getSectionQuantities()[2], "perfectSectionsMainStats"]
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



    container.appendChild(mainStatsBar);
}

document.addEventListener('DOMContentLoaded', displayMainStatsBar);

/*
{
"date":"2026-05-24",
"tonality":"sostenido4",
"section":"normal_mayor",
"speed":80,
"difficulty":5,
"execution":"perfecto"}
*/
