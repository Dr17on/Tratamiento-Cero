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
        capitulo2: {
            title: "Capítulo 2 — Las Voces",
            puzzle1_title: "El Panel de Electrodos",
            puzzle1_eugenia_hint: "Arrastra cada electrodo a su ranura en el orden correcto",
            puzzle1_mateo_hint: "La pared revela el orden: I, II, III, IV",
            puzzle1_correct: "✓ ¡El panel se activa!",
            puzzle1_wrong: "✗ El orden no es correcto",
            puzzle2_title: "La Cinta de Audio",
            puzzle2_eugenia_hint: "Arrastra las palabras correctas a los huecos",
            puzzle2_mateo_hint: "Escucha la cinta y dicta las palabras que faltan",
            puzzle2_frase: "El Paciente Cero no olvidó. Escogió [1]. Y en el [2] entre [3], encontró una [4] que lo [5].",
            puzzle2_correct: "✓ Transcripción completada",
            puzzle2_wrong: "✗ Algunas palabras no encajan",
            puzzle3_title: "El Espejo Roto",
            puzzle3_eugenia_hint: "Ordena los fragmentos del 1 al 5",
            puzzle3_mateo_hint: "Cada fragmento tiene un número grabado detrás",
            puzzle3_correct: "✓ El mensaje está completo",
            puzzle3_wrong: "✗ El orden está mal",
            puzzle4_title: "El Diario de la Abuela",
            puzzle4_eugenia_hint: "Ordena las páginas según las fechas que te dicte Mateo",
            puzzle4_mateo_hint: "Dicta las fechas de cada página a Eugenia",
            puzzle4_correct: "✓ Las páginas forman un mensaje",
            puzzle4_wrong: "✗ El orden de las fechas no es correcto",
            chapter_end_title: "CAPÍTULO 2 COMPLETADO",
            chapter_end_eugenia: "Tu mitad del código:",
            chapter_end_mateo: "Tu mitad del código:",
            chapter_end_instruction: "Dicta tu mitad a tu compañero e ingresa el código completo:",
            chapter_code_confirm: "DESBLOQUEAR CAPÍTULO 3",
            chapter_code_ok: "✓ Capítulo 3 desbloqueado",
            chapter_code_bad: "✗ Código incorrecto"
        },
        capitulo3: {
            title: "Capítulo 3 — El Incendio",
            puzzle1_title: "Las Válvulas de Gas",
            puzzle1_eugenia_hint: "Gira cada válvula a la posición que te dicte Mateo",
            puzzle1_mateo_hint: "La pared revela el orden de las válvulas",
            puzzle1_correct: "✓ ¡El gas se corta!",
            puzzle1_wrong: "✗ Algo no está bien",
            puzzle2_title: "El Mapa del Hospital",
            puzzle2_eugenia_hint: "Toca las habitaciones en el orden que te dicte Mateo",
            puzzle2_mateo_hint: "El camino está dibujado con carbón en el mapa",
            puzzle2_correct: "✓ El camino está trazado",
            puzzle2_wrong: "✗ El camino no es correcto",
            puzzle3_title: "El Cilindro Cifrado",
            puzzle3_eugenia_hint: "Forma la palabra usando la frase clave",
            puzzle3_eugenia_frase: "«LA CULPA NO ES DE LOS NIÑOS»",
            puzzle3_mateo_hint: "Algunas letras se ven en el cilindro quemado",
            puzzle3_correct: "✓ La puerta 47 se abre",
            puzzle3_wrong: "✗ La palabra no es la correcta",
            chapter_end_title: "CAPÍTULO 3 COMPLETADO",
            chapter_end_eugenia: "Tu mitad del código:",
            chapter_end_mateo: "Tu mitad del código:",
            chapter_end_instruction: "Dicta tu mitad a tu compañero e ingresa el código completo:",
            chapter_code_confirm: "DESBLOQUEAR CAPÍTULO 4",
            chapter_code_ok: "✓ Capítulo 4 desbloqueado",
            chapter_code_bad: "✗ Código incorrecto"
        },
        interludio: {
            title: "INTERLUDIO",
            tap: "Toca para continuar",
            skip: "Saltar »",
            int1_narr1: "Año 1953. Eugenia cruza la puerta 47.",
            int1_eugenia1: "Huele a ceniza. El pasillo se estira más de lo que debería.",
            int1_mateo1: "Yo veo lo mismo pero en ruinas. Hay un reloj al fondo, detenido a las 3:00.",
            int1_eugenia2: "Mateo, ¿me estás oyendo?",
            int1_mateo2: "Sí. Pero tu voz viene de muy lejos.",
            int1_narr2: "Ambos cruzan el pasillo, cada uno desde su tiempo.",

            int2_narr1: "El diario estaba en la estantería. Las páginas formaban una frase.",
            int2_mateo1: "«No fuiste tú el culpable». Eugenia, mi abuela escribió esto.",
            int2_eugenia1: "Recuerdo ese nombre. Estaba en el expediente del Tratamiento Cero.",
            int2_mateo2: "¿Era una paciente?",
            int2_eugenia2: "No. Era la Paciente Cero. La primera.",
            int2_narr2: "El nombre de la abuela de Mateo cuelga en el aire.",

            int3_narr1: "El incendio comenzó a las 3:00. Ni un minuto antes.",
            int3_eugenia1: "Mateo, fue un accidente. Lo vi. Nadie pudo evitarlo.",
            int3_mateo1: "Pero yo pude haber hecho algo. Pude haber cambiado el pasado.",
            int3_eugenia2: "No. El pasado no se cambia. Solo se entiende.",
            int3_mateo2: "Entonces, ¿para qué estamos aquí?",
            int3_narr2: "Una última puerta les espera. La del Tratamiento Cero.",

            int4_narr1: "Cerraron el experimento. Las voces callan, una por una.",
            int4_eugenia1: "Mateo... esa voz. La que me guio en 1953.",
            int4_mateo1: "¿Qué pasa con ella?",
            int4_eugenia2: "Eras tú. Siempre fuiste tú.",
            int4_mateo2: "No puede ser. Yo nunca estuve en 1953.",
            int4_eugenia3: "No en cuerpo. Pero tu voz cruzó el tiempo. El Tratamiento Cero unía personas, no épocas.",
            int4_narr2: "Eugenia mira a Mateo. Setenta y tres años de gratitud en una sola mirada.",
            int4_narr3: "El Hospital Santa Elena se queda en silencio. Por primera vez en décadas."
        },
        common: {
            back: "Menú",
            previous: "Anterior",
            next: "Siguiente",
            correct: "Correcto",
            wrong: "Incorrecto",
            reiniciar: "🔄 Reiniciar",
            reiniciar_confirm: "¿Reiniciar todos los puzles de este capítulo?",
            si: "Sí",
            no: "No",
            puzzle_resuelto: "✓ Puzle resuelto"
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
        capitulo2: {
            title: "Chapter 2 — The Voices",
            puzzle1_title: "The Electrode Panel",
            puzzle1_eugenia_hint: "Drag each electrode to its slot in the right order",
            puzzle1_mateo_hint: "The wall reveals the order: I, II, III, IV",
            puzzle1_correct: "✓ The panel activates!",
            puzzle1_wrong: "✗ Wrong order",
            puzzle2_title: "The Audio Tape",
            puzzle2_eugenia_hint: "Drag the right words into the blanks",
            puzzle2_mateo_hint: "Listen to the tape and dictate the missing words",
            puzzle2_frase: "Patient Zero did not forget. He chose to [1]. And in the [2] between [3], he found a [4] that [5] for him.",
            puzzle2_correct: "✓ Transcript complete",
            puzzle2_wrong: "✗ Some words don't fit",
            puzzle3_title: "The Broken Mirror",
            puzzle3_eugenia_hint: "Order the fragments from 1 to 5",
            puzzle3_mateo_hint: "Each fragment has a number carved behind it",
            puzzle3_correct: "✓ The message is complete",
            puzzle3_wrong: "✗ The order is wrong",
            puzzle4_title: "Grandmother's Diary",
            puzzle4_eugenia_hint: "Order the pages by the dates Mateo dictates",
            puzzle4_mateo_hint: "Dictate the date of each page to Eugenia",
            puzzle4_correct: "✓ The pages form a message",
            puzzle4_wrong: "✗ The date order is wrong",
            chapter_end_title: "CHAPTER 2 COMPLETE",
            chapter_end_eugenia: "Your half of the code:",
            chapter_end_mateo: "Your half of the code:",
            chapter_end_instruction: "Tell your partner your half and enter the full code:",
            chapter_code_confirm: "UNLOCK CHAPTER 3",
            chapter_code_ok: "✓ Chapter 3 unlocked",
            chapter_code_bad: "✗ Wrong code"
        },
        capitulo3: {
            title: "Chapter 3 — The Fire",
            puzzle1_title: "The Gas Valves",
            puzzle1_eugenia_hint: "Turn each valve to the position Mateo dictates",
            puzzle1_mateo_hint: "The wall reveals the order of the valves",
            puzzle1_correct: "✓ The gas is cut!",
            puzzle1_wrong: "✗ Something is wrong",
            puzzle2_title: "The Hospital Map",
            puzzle2_eugenia_hint: "Tap the rooms in the order Mateo dictates",
            puzzle2_mateo_hint: "The path is drawn with charcoal on the map",
            puzzle2_correct: "✓ The path is traced",
            puzzle2_wrong: "✗ The path is wrong",
            puzzle3_title: "The Cipher Cylinder",
            puzzle3_eugenia_hint: "Form the word using the key phrase",
            puzzle3_eugenia_frase: "«THE BLAME IS NOT THE CHILDREN'S»",
            puzzle3_mateo_hint: "Some letters are visible on the burnt cylinder",
            puzzle3_correct: "✓ Door 47 opens",
            puzzle3_wrong: "✗ Wrong word",
            chapter_end_title: "CHAPTER 3 COMPLETE",
            chapter_end_eugenia: "Your half of the code:",
            chapter_end_mateo: "Your half of the code:",
            chapter_end_instruction: "Tell your partner your half and enter the full code:",
            chapter_code_confirm: "UNLOCK CHAPTER 4",
            chapter_code_ok: "✓ Chapter 4 unlocked",
            chapter_code_bad: "✗ Wrong code"
        },
        interludio: {
            title: "INTERLUDE",
            tap: "Tap to continue",
            skip: "Skip »",
            int1_narr1: "1953. Eugenia steps through door 47.",
            int1_eugenia1: "It smells of ash. The hallway stretches longer than it should.",
            int1_mateo1: "I see the same but in ruins. There's a clock at the end, stopped at 3:00.",
            int1_eugenia2: "Mateo, can you hear me?",
            int1_mateo2: "Yes. But your voice comes from very far away.",
            int1_narr2: "They both walk the hallway, each from their own time.",

            int2_narr1: "The diary was on the shelf. The pages formed a sentence.",
            int2_mateo1: "«You were not the culprit». Eugenia, my grandmother wrote this.",
            int2_eugenia1: "I remember that name. It was in the Treatment Zero file.",
            int2_mateo2: "Was she a patient?",
            int2_eugenia2: "No. She was Patient Zero. The first one.",
            int2_narr2: "Mateo's grandmother's name hangs in the air.",

            int3_narr1: "The fire started at 3:00. Not a minute earlier.",
            int3_eugenia1: "Mateo, it was an accident. I saw it. No one could have stopped it.",
            int3_mateo1: "But I could have done something. I could have changed the past.",
            int3_eugenia2: "No. The past can't be changed. Only understood.",
            int3_mateo2: "So what are we doing here?",
            int3_narr2: "One last door awaits them. Treatment Zero's.",

            int4_narr1: "They shut down the experiment. The voices fall silent, one by one.",
            int4_eugenia1: "Mateo... that voice. The one that guided me in 1953.",
            int4_mateo1: "What about it?",
            int4_eugenia2: "It was you. It was always you.",
            int4_mateo2: "It can't be. I was never in 1953.",
            int4_eugenia3: "Not in body. But your voice crossed time. Treatment Zero connected people, not eras.",
            int4_narr2: "Eugenia looks at Mateo. Seventy-three years of gratitude in one glance.",
            int4_narr3: "Santa Elena Hospital falls silent. For the first time in decades."
        },
        common: {
            back: "Menu",
            previous: "Previous",
            next: "Next",
            correct: "Correct",
            wrong: "Wrong",
            reiniciar: "🔄 Restart",
            reiniciar_confirm: "Restart all puzzles in this chapter?",
            si: "Yes",
            no: "No",
            puzzle_resuelto: "✓ Puzzle solved"
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

// ==========================================
// IMÁGENES BILINGÜES
// ==========================================
function getImg(key) {
    return currentLang === 'en' ? key + '_en' : key + '_es';
}

// ==========================================
// SISTEMA DE PROGRESO DE PUZLES
// ==========================================
function marcarResuelto(cap, puzzle) {
    localStorage.setItem('tc' + cap + '_p' + puzzle + '_resuelto', 'true');
}

function estaResuelto(cap, puzzle) {
    return localStorage.getItem('tc' + cap + '_p' + puzzle + '_resuelto') === 'true';
}

function reiniciarCapitulo(cap) {
    const totalPuzzles = (cap === 1) ? 3 : ((cap === 2) ? 5 : 4); // Cap 3 tiene 4 "puzles" (incluyendo final)
    for (let i = 1; i <= totalPuzzles; i++) {
        localStorage.removeItem('tc' + cap + '_p' + i + '_resuelto');
    }
    localStorage.setItem('tc' + cap + '_puzzle', '1');
}