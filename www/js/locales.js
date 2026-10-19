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
        transiciones: {
            cap1_p2: "La gaveta se abre. Un reloj de pared al fondo marca las 3:15.",
            cap2_p1: "La puerta 47 se cierra detrás de ustedes. Frente a ustedes, un panel con electrodos.",
            cap2_p2: "Las voces susurran desde las paredes. Una cinta de audio yace en el suelo.",
            cap2_p3: "Un espejo roto cuelga de la pared. Los fragmentos parecen moverse.",
            cap2_p4: "Un diario antiguo descansa sobre la mesa. Las páginas están desordenadas.",
            cap3_p1: "El fuego avanza. Un panel de válvulas de gas bloquea el paso.",
            cap3_p2: "El humo se disipa un poco. Un mapa del hospital está clavado en la pared.",
            cap3_p3: "Frente a la puerta 47, un cilindro de metal con anillos gira lentamente.",
            cap4_p2: "La máquina cobra vida con un zumbido eléctrico. Una radio antigua parpadea en la esquina.",
            cap4_p3: "La señal se capta entre la estática. Una voz susurra un nombre. Solo falta escribirlo en el cilindro.",
            cap4_final: "El nombre está completo. La silla de electroshock se apaga lentamente. El silencio inunda el sótano."
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
            puzzle4_mateo_hint: "Dicta las fechas y pistas de las notas a Eugenia",
            puzzle4_correct: "✓ Las páginas forman un mensaje",
            puzzle4_wrong: "✗ El orden de las fechas no es correcto",
            puzzle4_palabra1: "NO",
            puzzle4_palabra2: "FUISTE",
            puzzle4_palabra3: "TÚ",
            puzzle4_palabra4: "EL",
            puzzle4_palabra5: "CULPABLE",
            puzzle4_hint1: "1. Negación",
            puzzle4_hint2: "2. Ir (pasado)",
            puzzle4_hint3: "3. Segunda persona",
            puzzle4_hint4: "4. Artículo definido",
            puzzle4_hint5: "5. Culpable",
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
            puzzle1_mateo_hint: "La pared revela los ángulos de las válvulas",
            puzzle1_mateo_orden: "Ángulos:\nA = 90°\nB = 270°\nC = 0°\nD = 180°",
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
        capitulo4: {
            title: "Capítulo 4 — Tratamiento Cero",
            puzzle1_title: "La Silla de Electroshock",
            puzzle1_eugenia_hint: "Arrastra los cables a los puertos correctos",
            puzzle1_mateo_hint: "Los puertos están sucios. Dime los colores que recuerdas",
            puzzle1_correct: "✓ La máquina se enciende",
            puzzle1_wrong: "✗ Los cables no coinciden",
            puzzle2_title: "La Frecuencia de Radio",
            puzzle2_eugenia_hint: "Sintoniza la frecuencia que recuerdes",
            puzzle2_eugenia_frecuencia: "Recuerdo la frecuencia: 33.7 MHz",
            puzzle2_mateo_hint: "La radio no tiene energía. Necesito la frecuencia",
            puzzle2_correct: "✓ La señal se capta",
            puzzle2_wrong: "✗ Solo hay estática",
            puzzle3_title: "El Nombre Verdadero",
            puzzle3_eugenia_hint: "Escribe el nombre de la Paciente Cero",
            puzzle3_mateo_hint: "El nombre de mi abuela. Lo vi en los archivos",
            puzzle3_mateo_nota: "Anotación de los archivos:\n\"El nombre de la Paciente Cero es CARMEN\"",
            puzzle3_correct: "✓ Las voces descansan",
            puzzle3_wrong: "✗ El nombre no es correcto",
            chapter_end_title: "TRATAMIENTO CERO COMPLETADO",
            chapter_end_eugenia: "Tu mitad del código:",
            chapter_end_mateo: "Tu mitad del código:",
            chapter_end_instruction: "Dicta tu mitad a tu compañero e ingresa el código final:",
            chapter_code_confirm: "CERRAR EL EXPERIMENTO",
            chapter_code_ok: "✓ Tratamiento Cero cerrado",
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
        transiciones: {
            cap1_p2: "The drawer opens. A wall clock in the background reads 3:15.",
            cap2_p1: "Door 47 closes behind you. In front of you, a panel with electrodes.",
            cap2_p2: "Voices whisper from the walls. An audio tape lies on the floor.",
            cap2_p3: "A broken mirror hangs on the wall. The fragments seem to move.",
            cap2_p4: "An old diary rests on the table. The pages are out of order.",
            cap3_p1: "The fire advances. A panel of gas valves blocks the way.",
            cap3_p2: "The smoke clears a bit. A hospital map is nailed to the wall.",
            cap3_p3: "In front of door 47, a metal cylinder with rings spins slowly.",
            cap4_p2: "The machine hums to life with an electric buzz. An old radio flickers in the corner.",
            cap4_p3: "The signal is caught through the static. A voice whispers a name. It just needs to be written.",
            cap4_final: "The name is complete. The electroshock chair slowly powers down. Silence floods the basement."
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
            puzzle4_mateo_hint: "Dictate the dates and hints from the notes to Eugenia",
            puzzle4_correct: "✓ The pages form a message",
            puzzle4_wrong: "✗ The date order is wrong",
            puzzle4_palabra1: "YOU",
            puzzle4_palabra2: "WERE",
            puzzle4_palabra3: "NOT",
            puzzle4_palabra4: "THE",
            puzzle4_palabra5: "CULPRIT",
            puzzle4_hint1: "1. 2nd Person",
            puzzle4_hint2: "2. Past Verb",
            puzzle4_hint3: "3. Negation",
            puzzle4_hint4: "4. Article",
            puzzle4_hint5: "5. Guilty",
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
            puzzle1_mateo_hint: "The wall reveals the valve angles",
            puzzle1_mateo_orden: "Angles:\nA = 90°\nB = 270°\nC = 0°\nD = 180°",
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
        capitulo4: {
            title: "Chapter 4 — Treatment Zero",
            puzzle1_title: "The Electroshock Chair",
            puzzle1_eugenia_hint: "Drag the cables to the correct ports",
            puzzle1_mateo_hint: "The ports are dirty. Tell me the colors you remember",
            puzzle1_correct: "✓ The machine turns on",
            puzzle1_wrong: "✗ The cables don't match",
            puzzle2_title: "The Radio Frequency",
            puzzle2_eugenia_hint: "Tune to the frequency you remember",
            puzzle2_eugenia_frecuencia: "I remember the frequency: 33.7 MHz",
            puzzle2_mateo_hint: "The radio has no power. I need the frequency",
            puzzle2_correct: "✓ The signal is caught",
            puzzle2_wrong: "✗ Only static",
            puzzle3_title: "The True Name",
            puzzle3_eugenia_hint: "Write the name of Patient Zero",
            puzzle3_mateo_hint: "My grandmother's name. I saw it in the files",
            puzzle3_mateo_nota: "File note:\n\"Patient Zero's name is CARMEN\"",
            puzzle3_correct: "✓ The voices rest",
            puzzle3_wrong: "✗ The name is wrong",
            chapter_end_title: "TREATMENT ZERO COMPLETE",
            chapter_end_eugenia: "Your half of the code:",
            chapter_end_mateo: "Your half of the code:",
            chapter_end_instruction: "Tell your partner your half and enter the final code:",
            chapter_code_confirm: "CLOSE THE EXPERIMENT",
            chapter_code_ok: "✓ Treatment Zero closed",
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