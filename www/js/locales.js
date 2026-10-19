// (El objeto LOCALES se mantiene exactamente igual que en el mensaje anterior, 
// solo debes actualizar las funciones del final)

// ... [Todo el bloque const LOCALES = { ... } se mantiene igual] ...

let currentLang = 'es';

function detectLanguage() {
    const saved = localStorage.getItem('tc_lang');
    if (saved && LOCALES[saved]) {
        currentLang = saved;
        return currentLang;
    }
    const deviceLang = (navigator.language || 'es').split('-')[0].toLowerCase();
    currentLang = (deviceLang === 'en') ? 'en' : 'es';
    return currentLang;
}

function t(key) {
    const keys = key.split('.');
    let value = LOCALES[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }
    return value;
}

function setLanguage(lang) {
    if (LOCALES[lang]) {
        currentLang = lang;
        localStorage.setItem('tc_lang', lang);
    }
}

function getVolumen() {
    const v = localStorage.getItem('tc_volumen');
    return v !== null ? parseFloat(v) : 0.7;
}

function setVolumen(valor) {
    localStorage.setItem('tc_volumen', valor.toString());
}

// ==========================================
// IMÁGENES BILINGÜES
// ==========================================
function getImg(key) {
    return currentLang === 'en' ? key + '_en' : key + '_es';
}

// ==========================================
// SISTEMA DE PROGRESO DE PUZLES (POR ROL)
// ==========================================
function marcarResuelto(cap, puzzle, rol) {
    localStorage.setItem('tc' + cap + '_p' + puzzle + '_resuelto_' + rol, 'true');
}

function estaResuelto(cap, puzzle, rol) {
    return localStorage.getItem('tc' + cap + '_p' + puzzle + '_resuelto_' + rol) === 'true';
}

function reiniciarCapitulo(cap, rol) {
    const totalPuzzles = (cap === 1) ? 3 : ((cap === 2) ? 5 : 4);
    for (let i = 1; i <= totalPuzzles; i++) {
        localStorage.removeItem('tc' + cap + '_p' + i + '_resuelto_' + rol);
    }
    localStorage.removeItem('tc' + cap + '_puzzle_' + rol);
}