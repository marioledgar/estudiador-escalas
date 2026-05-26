let history = JSON.parse(localStorage.estudiador_historial)

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
    const dates = [...new Set(history.map(e => e.date))].sort().reverse();

    if (dates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
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
    const unique = new Set(historyData.map(e => e.date + e.tonality));
    return unique.size;
}

function getTotalSections() {
    return history.length;
}

function getSectionValues() {
    let m = history.filter(e => { return e.execution === 'm' }).length;
    let b = history.filter(e => { return e.execution === 'b' }).length;
    let p = history.filter(e => { return e.execution === 'p' }).length;
    return [m, b, p]
}

function displayMainStatsBar() {

}

/*
{
"date":"2026-05-24",
"tonality":"sostenido4",
"section":"normal_mayor",
"speed":80,
"difficulty":5,
"execution":"perfecto"}
*/