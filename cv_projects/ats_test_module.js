/**
 * ============================================================
 *  ATS PDF Validation Module
 *  Versión 2.0 — Valida el TEXTO EXTRAÍDO del PDF final
 * ============================================================
 *
 *  INSTRUCCIONES DE USO:
 *  ─────────────────────
 *  1. Genera tu PDF (desde cv_visual.html o cv_ats.html).
 *  2. Abre el PDF en el navegador o Acrobat Reader.
 *  3. Selecciona TODO el texto: Ctrl+A → Copia: Ctrl+C.
 *  4. Abre CUALQUIER página web en Chrome/Edge, presiona F12.
 *  5. En la pestaña "Console", pega TODO este código y presiona Enter.
 *  6. Luego escribe y ejecuta:
 *
 *       testATS(`pega aquí el texto copiado del PDF`)
 *
 *     Ejemplo:
 *       testATS(`Brandon José Bello Moncada Full-Stack Senior...`)
 *
 *  ⚠️  NOTA: Esto es una SIMULACIÓN LOCAL para validación preliminar.
 *      No reemplaza pruebas en sistemas reales de reclutamiento (Workday, etc.)
 * ============================================================
 */

window.testATS = function(pdfText) {

    // ── Guardia de entrada ──────────────────────────────────
    if (typeof pdfText !== 'string' || pdfText.trim().length < 80) {
        console.error([
            '❌ ERROR: Texto muy corto o vacío.',
            'Asegúrate de copiar el texto completo del PDF (Ctrl+A → Ctrl+C dentro del PDF).',
            'Luego pega el texto entre backticks: testATS(`tu texto aquí`)'
        ].join('\n'));
        return;
    }

    const t = pdfText; // alias

    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#6366f1');
    console.log('%c 🔍 ATS PDF VALIDATION MODULE v2.0', 'color:#6366f1;font-size:15px;font-weight:bold');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#6366f1');

    // ──────────────────────────────────────────────────────
    //  NIVEL 1: Parser Sencillo (Workday / iCIMS básico)
    //  Verifica presencia de campos críticos
    // ──────────────────────────────────────────────────────
    const simpleChecks = {
        'Nombre detectado':       /brandon|bello/i.test(t),
        'Email detectado':        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(t),
        'Teléfono detectado':     /\+?\d[\d\s\-().]{7,}/.test(t),
        'LinkedIn detectado':     /linkedin\.com/i.test(t),
        'Sección Experiencia':    /experiencia|trayectoria/i.test(t),
        'Sección Educación':      /educaci[oó]n|formaci[oó]n/i.test(t),
        'Sección Habilidades':    /habilidades|competencias|skills/i.test(t),
        'Texto seleccionable':    t.length > 200,          // Si pudiste copiar, sí lo es
        'Sin caracteres basura':  !/[\uFFFD\x00-\x08\x0B\x0E-\x1F]/.test(t),
        'Sin caracteres especiales raros': !/[▪▸►→✓✗★☆♦]/.test(t),
    };

    const simplePass  = Object.values(simpleChecks).filter(Boolean).length;
    const simpleTotal = Object.keys(simpleChecks).length;

    console.log('\n%c── NIVEL 1: Parser Básico (Workday / iCIMS Style) ──', 'font-weight:bold;color:#333');
    Object.entries(simpleChecks).forEach(([label, ok]) => {
        console.log(`  ${ok ? '✅' : '❌'} ${label}`);
    });
    console.log(`\n  Resultado: ${simplePass}/${simpleTotal} checks pasados`);

    const level1Status = simplePass >= 8 ? 'PASA ✅' : 'REQUIERE REVISIÓN ⚠️';
    console.log(`%c  → NIVEL 1: ${level1Status}`, `color:${simplePass >= 8 ? '#10b981' : '#f59e0b'};font-weight:bold`);

    // ──────────────────────────────────────────────────────
    //  NIVEL 2: ATS Avanzado (Greenhouse / Lever / Taleo)
    //  Keyword match + densidad de secciones
    // ──────────────────────────────────────────────────────
    const targetKeywords = [
        // Tech Stack
        'Go', 'Golang', 'Laravel', 'Vue', 'Flutter', 'NestJS',
        'TypeScript', 'PostgreSQL', 'Docker', 'Firebase',
        // Architecture
        'Microservicios', 'API', 'Clean Architecture', 'CI/CD', 'TDD',
        // Domain
        'n8n', 'Senior', 'Transformación Digital', 'Full-Stack',
        // Tools
        'Power BI', 'SQL Server', 'Angular', 'Python'
    ];

    const foundKw  = targetKeywords.filter(kw => new RegExp(`\\b${kw}\\b`, 'gi').test(t));
    const missedKw = targetKeywords.filter(kw => !new RegExp(`\\b${kw}\\b`, 'gi').test(t));
    const kwScore  = Math.round((foundKw.length / targetKeywords.length) * 100);

    // Extracción de métricas cuantificables (demuestran impacto)
    const metricsFound = t.match(/\d+[%k+]|\d+\s*(registros|proyectos|clientes|horas|días)/gi) || [];

    console.log('\n%c── NIVEL 2: Parser Avanzado (Greenhouse / Lever Style) ──', 'font-weight:bold;color:#333');
    console.log(`\n  📊 Keyword Match Rate: ${kwScore}%`);
    console.log('  ✅ Palabras clave encontradas:', foundKw.join(', ') || 'ninguna');
    if (missedKw.length) {
        console.log('  ⚠️  Palabras clave ausentes (considera agregar):', missedKw.join(', '));
    }
    console.log(`\n  📈 Métricas cuantificables detectadas (${metricsFound.length}):`, metricsFound.join(' | ') || 'Ninguna — agrega % o números de impacto');

    // ──────────────────────────────────────────────────────
    //  PUNTUACIÓN FINAL PONDERADA
    // ──────────────────────────────────────────────────────
    const w1 = (simplePass / simpleTotal) * 40;    // 40% estructura básica
    const w2 = (kwScore / 100) * 40;               // 40% keyword match
    const w3 = Math.min(metricsFound.length, 5) / 5 * 20; // 20% métricas (máx 5)
    const finalScore = Math.round(w1 + w2 + w3);

    const badge = finalScore >= 80 ? '🟢 ALTA' : finalScore >= 60 ? '🟡 MEDIA' : '🔴 BAJA';

    console.log('\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#6366f1');
    console.log(`%c  PUNTUACIÓN ATS ESTIMADA: ${finalScore}/100  ${badge} COMPATIBILIDAD`,
        `font-size:14px;font-weight:bold;color:${finalScore >= 80 ? '#10b981' : finalScore >= 60 ? '#f59e0b' : '#ef4444'}`
    );
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#6366f1');

    if (finalScore >= 80) {
        console.log('%c  ✅ Tu PDF es altamente legible por sistemas ATS automáticos.', 'color:#10b981');
    } else {
        console.log('%c  ⚠️  Recomendaciones:', 'color:#f59e0b;font-weight:bold');
        if (kwScore < 60) console.log('     • Añade más keywords técnicas al texto del CV (ver lista de ausentes).');
        if (metricsFound.length < 3) console.log('     • Incluye más métricas cuantificables (%, números, plazos).');
        if (simplePass < 8) console.log('     • Verifica que el PDF no sea una imagen escaneada (texto no seleccionable).');
    }

    console.log('\n%c  ℹ️ Esta es una simulación local. Prueba el CV en linkedin.com/profinder o resume.io para validación adicional.', 'color:#94a3b8;font-size:11px');

    // Devuelve el reporte como objeto (útil para scripting)
    return { simplePass, simpleTotal, kwScore, metricsFound, finalScore };
};

console.log('%c ATS Module cargado ✅  —  Ejecuta: testATS(`texto del PDF`)', 'color:#6366f1;font-weight:bold');
