const LOCALES = {
    es: {
        presentacion: {
            slide1: "En 1953, el Hospital Santa Elena inició un experimento secreto.",
            slide2: "Buscaban borrar los recuerdos traumáticos.",
            slide3: "Crearon algo peor.",
            slide4: "Dos personas. Dos épocas. Una sola voz.",
            skip: "Toca para continuar"
        },
        menu: {
            title: "TRATAMIENTO CERO",
            subtitle: "Dos épocas. Una sola voz.",
            select_role: "Selecciona tu personaje",
            eugenia: "Eugenia",
            mateo: "Mateo",
            eugenia_desc: "Enfermera, 1953",
            mateo_desc: "Investigador, 2026"
        },
        menu_settings: "⚙ Configuración",
        menu_chapters: "📖 Capítulos",
        chapters: {
            title: "SELECCIONA UN CAPÍTULO",
            chapter1: "Capítulo 1",
            chapter1_sub: "El Ingreso",
            chapter2: "Capítulo 2",
            chapter2_sub: "Las Voces",
            chapter3: "Capítulo 3",
            chapter3_sub: "El Incendio",
            chapter4: "Capítulo 4",
            chapter4_sub: "Tratamiento Cero",
            locked: "Bloqueado",
            completed: "Completado",
            current: "Actual",
            coming_soon: "Próximamente"
        },
        config: {
            title: "CONFIGURACIÓN",
            language: "Idioma",
            music_volume: "Volumen de música",
            credits: "Créditos",
            close: "Cerrar"
        },
        capitulo1: {
            title: "Capítulo 1 — El Ingreso",
            form_header: "HOSPITAL SANTA ELENA",
            form_subtitle: "Formulario de Ingreso — 1953",
            eugenia_hint: "📻 Lee las fechas de ingreso a Mateo",
            wall_label: "Nombres grabados en la pared:",
            mateo_instruction: "Ingresa el último dígito del día",
            mateo_instruction2: "de ingreso, en orden de la lista",
            confirm: "CONFIRMAR",
            correct: "✓ ¡El candado se abre!",
            wrong: "✗ Código incorrecto",
            clock_title: "El Reloj Detenido",
            clock_eugenia_hint: "Ajusta el reloj a la hora correcta",
            clock_mateo_hint: "Las marcas en la pared revelan una hora",
            clock_mateo_shown: "9:45",
            hour_label: "HORA",
            minute_label: "MINUTO",
            clock_check: "VERIFICAR",
            clock_correct: "✓ El reloj se detiene. Una puerta se abre.",
            clock_wrong: "✗ La hora no es correcta.",
            chapter_end_title: "CAPÍTULO 1 COMPLETADO",
            chapter_end_eugenia: "Tu mitad del código:",
            chapter_end_mateo: "Tu mitad del código:",
            chapter_end_instruction: "Dicta tu mitad a tu compañero e ingresa el código completo:",
            chapter_code_confirm: "DESBLOQUEAR CAPÍTULO 2",
            chapter_code_ok: "✓ Capítulo 2 desbloqueado",
            chapter_code_bad: "✗ Código incorrecto",
            continuar: "Continuar →"
        },
        common: {
            back: "Menú",
            previous: "Anterior",
            next: "Siguiente",
            correct: "Correcto",
            wrong: "Incorrecto"
        }
    },
    en: {
        presentacion: {
            slide1: "In 1953, Santa Elena Hospital began a secret experiment.",
            slide2: "They sought to erase traumatic memories.",
            slide3: "They created something worse.",
            slide4: "Two people. Two eras. One voice.",
            skip: "Tap to continue"
        },
        menu: {
            title: "TREATMENT ZERO",
            subtitle: "Two eras. One voice.",
            select_role: "Select your character",
            eugenia: "Eugenia",
            mateo: "Mateo",
            eugenia_desc: "Nurse, 1953",
            mateo_desc: "Researcher, 2026"
        },
        menu_settings: "⚙ Settings",
        menu_chapters: "📖 Chapters",
        chapters: {
            title: "SELECT A CHAPTER",
            chapter1: "Chapter 1",
            chapter1_sub: "Admission",
            chapter2: "Chapter 2",
            chapter2_sub: "The Voices",
            chapter3: "Chapter 3",
            chapter3_sub: "The Fire",
            chapter4: "Chapter 4",
            chapter4_sub: "Treatment Zero",
            locked: "Locked",
            completed: "Completed",
            current: "Current",
            coming_soon: "Coming soon"
        },
        config: {
            title: "SETTINGS",
            language: "Language",
            music_volume: "Music volume",
            credits: "Credits",
            close: "Close"
        },
        capitulo1: {
            title: "Chapter 1 — Admission",
            form_header: "SANTA ELENA HOSPITAL",
            form_subtitle: "Admission Form — 1953",
            eugenia_hint: "📻 Read the admission dates to Mateo",
            wall_label: "Names carved on the wall:",
            mateo_instruction: "Enter the last digit of the day",
            mateo_instruction2: "of admission, in list order",
            confirm: "CONFIRM",
            correct: "✓ The lock opens!",
            wrong: "✗ Wrong code",
            clock_title: "The Stopped Clock",
            clock_eugenia_hint: "Set the clock to the right time",
            clock_mateo_hint: "The scratches on the wall reveal a time",
            clock_mateo_shown: "9:45",
            hour_label: "HOUR",
            minute_label: "MINUTE",
            clock_check: "CHECK",
            clock_correct: "✓ The clock stops. A door opens.",
            clock_wrong: "✗ The time is wrong.",
            chapter_end_title: "CHAPTER 1 COMPLETE",
            chapter_end_eugenia: "Your half of the code:",
            chapter_end_mateo: "Your half of the code:",
            chapter_end_instruction: "Tell your partner your half and enter the full code:",
            chapter_code_confirm: "UNLOCK CHAPTER 2",
            chapter_code_ok: "✓ Chapter 2 unlocked",
            chapter_code_bad: "✗ Wrong code",
            continuar: "Continue →"
        },
        common: {
            back: "Menu",
            previous: "Previous",
            next: "Next",
            correct: "Correct",
            wrong: "Wrong"
        }
    }
};

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