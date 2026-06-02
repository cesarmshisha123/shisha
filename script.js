/* ====================================================
    1. INICIALIZAR ICONOS LUCIDE
==================================================== */
lucide.createIcons();

/* ====================================================
    2. CURSOR PERSONALIZADO
==================================================== */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = (mouseX - 4) + 'px';
    dot.style.top  = (mouseY - 4) + 'px';
});

(function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = (ringX - 15) + 'px';
    ring.style.top  = (ringY - 15) + 'px';
    requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, img').forEach(el => {
    el.addEventListener('mouseenter', () => {
    ring.style.width = '50px'; ring.style.height = '50px'; ring.style.opacity = '.55';
    dot.style.transform = 'scale(0)';
    });
    el.addEventListener('mouseleave', () => {
    ring.style.width = '30px'; ring.style.height = '30px'; ring.style.opacity = '1';
    dot.style.transform = 'scale(1)';
    });
});

/* ====================================================
    3. NAVBAR — sombra al hacer scroll
==================================================== */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    mainNav.style.background = window.scrollY > 30
    ? 'rgba(8,8,14,.97)' : 'rgba(8,8,14,.7)';
    mainNav.style.boxShadow = window.scrollY > 30
    ? '0 1px 24px rgba(0,0,0,.5)' : 'none';
});

/* ====================================================
    4. NAVEGACIÓN SPA — mostrar/ocultar secciones
    Para agregar una nueva sección:
        1. Crea un <section class="spa-section" id="mi-id">
        2. Crea un <button onclick="showSection('mi-id')">
        3. Dale un id al botón: id="btn-mi-id"
==================================================== */
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.spa-section').forEach(s => s.classList.remove('active'));
    // Mostrar la sección seleccionada
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Actualizar estado activo de botones en sidebar
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + sectionId);
    if (activeBtn) activeBtn.classList.add('active');

    // Scroll al top del contenido (útil en mobile)
    document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });

    // Animar barras de progreso si vamos a "idiomas"
    if (sectionId === 'idiomas') animateBars();
}

/* ====================================================
    5. BARRAS DE PROGRESO — animación al entrar a "idiomas"
==================================================== */
function animateBars() {
    document.querySelectorAll('.skill-fill').forEach(fill => {
    const pct = fill.getAttribute('data-pct') || '0';
    fill.style.width = '0';
    setTimeout(() => { fill.style.width = pct + '%'; }, 80);
    });
}

/* ====================================================
    6. ACORDEÓN FAQ
==================================================== */
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    // Cerrar todos
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('open'));
    // Abrir el seleccionado (si estaba cerrado)
    if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
    }
}

/* ====================================================
    7. LIBRO DE VISITAS — agregar nota dinámica
==================================================== */
function addGuestEntry() {
    const name = document.getElementById('guestName').value.trim();
    const msg  = document.getElementById('guestMsg').value.trim();
    if (!name || !msg) { alert('Por favor completa tu nombre y mensaje.'); return; }

    const entry = document.createElement('div');
    entry.className = 'card';
    entry.style.cssText = 'padding:1rem 1.25rem;animation:sectionIn .3s ease;';
    entry.innerHTML = `
    <p style="font-size:.88rem;font-style:italic;color:var(--text);">"${escapeHtml(msg)}"</p>
    <p style="font-size:.75rem;color:var(--accent);margin-top:.5rem;font-weight:600;">— ${escapeHtml(name)}</p>
    `;

    const container = document.getElementById('guest-entries');
    container.insertBefore(entry, container.firstChild);

    // Limpiar campos
    document.getElementById('guestName').value = '';
    document.getElementById('guestMsg').value = '';
}

// Sanitizar HTML para evitar XSS
function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

/* ====================================================
    8. PARALLAX SUAVE en imágenes laterales del Hero
==================================================== */
const imgLeft  = document.querySelector('.img-left img');
const imgRight = document.querySelector('.img-right img');
window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    if (imgLeft)  imgLeft.style.transform  = `translate(${dx * -7}px, ${dy * -5}px)`;
    if (imgRight) imgRight.style.transform = `translate(${dx *  7}px, ${dy * -5}px)`;
});

/* ====================================================
    9. DESCARGAR CV — Generación de PDF con jsPDF
    El PDF se genera y descarga al instante,
    sin diálogos de impresión ni redirecciones.

    📝 PARA EDITAR TUS DATOS: modifica el objeto `cv` abajo.
==================================================== */
function downloadCV() {
    // Validar que jsPDF esté cargado
    if (!window.jspdf) {
    alert('Error: la librería de PDF no se cargó. Recarga la página.');
    return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // ============ DATOS DEL CV — EDITA AQUÍ ============
    const cv = {
    name:     'CESAR SHISHA',
    role:     'Full Stack Developer',
    email:    'cesar.shisha@email.com',
    phone:    '+51 900 000 000',
    linkedin: 'linkedin.com/in/shisha',
    github:   'github.com/shisha',
    location: 'Huánuco, Perú',
    about:    'Desarrollador apasionado por construir soluciones robustas desde el frontend hasta la infraestructura. Del navegador al servidor, de la base de datos al contenedor. Especializado en JavaScript, Node.js, Python y administración de servidores.',
    education: [
        {
        title:  'Ingeniería de Sistemas',
        org:    'UNHEVAL — Universidad Nacional Hermilio Valdizán',
        period: '2021 — Actualidad'
        }
    ],
    experience: [
        {
        title:  'Full Stack Developer',
        org:    'Freelance / Proyectos personales',
        period: '2023 — Actualidad',
        desc:   'Desarrollo de aplicaciones web completas usando tecnologías modernas. Integración frontend-backend, gestión de bases de datos y despliegue en la nube.'
        },
        {
        title:  'Administrador de Servidores Jr.',
        org:    'Práctica universitaria',
        period: '2022 — 2023',
        desc:   'Configuración y mantenimiento de servidores Linux. Gestión de servicios, monitoreo y automatización con scripts Bash.'
        }
    ],
    skills:    ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'React',
                'PostgreSQL', 'MongoDB', 'Docker', 'Linux', 'Git', 'AWS', 'Nginx'],
    languages: [
        { lang: 'Español', level: 'Nativo' },
        { lang: 'Inglés',  level: 'Intermedio (B1)' }
    ]
    };
    // =====================================================

    // Paleta (RGB)
    const PURPLE = [138, 92, 246];   // violeta más sólido para impresión
    const PINK   = [236, 72, 153];
    const DARK   = [30, 30, 45];
    const GRAY   = [110, 110, 130];
    const LIGHT  = [245, 240, 255];

    let y = 0;

    /* ===== HEADER con barra de color ===== */
    doc.setFillColor(...PURPLE);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text(cv.name, 15, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.text(cv.role, 15, 29);

    // Línea separadora rosa
    doc.setDrawColor(...PINK);
    doc.setLineWidth(0.7);
    doc.line(15, 33, 55, 33);

    y = 52;

    /* ===== Datos de contacto en 2 columnas ===== */
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);

    const contactL = [['Email',  cv.email],   ['Telefono', cv.phone]];
    const contactR = [['LinkedIn', cv.linkedin], ['GitHub', cv.github]];
    let yC = y;
    contactL.forEach(([k, v]) => {
    doc.setFont('helvetica', 'bold'); doc.setTextColor(...PURPLE);
    doc.text(k + ':', 15, yC);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...DARK);
    doc.text(v, 35, yC);
    yC += 5.5;
    });
    yC = y;
    contactR.forEach(([k, v]) => {
    doc.setFont('helvetica', 'bold'); doc.setTextColor(...PURPLE);
    doc.text(k + ':', 110, yC);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...DARK);
    doc.text(v, 132, yC);
    yC += 5.5;
    });
    y += 13;

    doc.setFont('helvetica', 'bold'); doc.setTextColor(...PURPLE);
    doc.text('Ubicacion:', 15, y);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...DARK);
    doc.text(cv.location, 35, y);
    y += 10;

    /* ===== Helper: título de sección ===== */
    function sectionTitle(title) {
    y += 2;
    doc.setFillColor(...PURPLE);
    doc.rect(15, y - 4, 3.5, 6, 'F');
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), 22, y + 0.5);
    y += 4;
    doc.setDrawColor(220, 220, 230);
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);
    y += 6;
    }

    /* ===== PERFIL ===== */
    sectionTitle('Perfil Profesional');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 75);
    const aboutLines = doc.splitTextToSize(cv.about, 180);
    doc.text(aboutLines, 15, y);
    y += aboutLines.length * 5 + 4;

    /* ===== EDUCACIÓN ===== */
    sectionTitle('Educacion');
    cv.education.forEach(edu => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.text(edu.title, 15, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(edu.period, 195, y, { align: 'right' });
    y += 5;
    doc.setFont('helvetica', 'italic'); doc.setFontSize(10);
    doc.setTextColor(80, 80, 100);
    doc.text(edu.org, 15, y);
    y += 9;
    });

    /* ===== EXPERIENCIA ===== */
    sectionTitle('Experiencia Laboral');
    cv.experience.forEach(exp => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.text(exp.title, 15, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(exp.period, 195, y, { align: 'right' });
    y += 5;
    doc.setFont('helvetica', 'italic'); doc.setFontSize(10);
    doc.setTextColor(80, 80, 100);
    doc.text(exp.org, 15, y);
    y += 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 75);
    const descLines = doc.splitTextToSize(exp.desc, 180);
    doc.text(descLines, 15, y);
    y += descLines.length * 4.5 + 6;
    });

    /* ===== SKILLS como tags ===== */
    sectionTitle('Habilidades Tecnicas');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    let xPos = 15;
    cv.skills.forEach(skill => {
    const w = doc.getTextWidth(skill) + 6;
    if (xPos + w > 195) { xPos = 15; y += 8; }
    doc.setFillColor(...LIGHT);
    doc.roundedRect(xPos, y - 4, w, 6.5, 2, 2, 'F');
    doc.setTextColor(...PURPLE);
    doc.text(skill, xPos + 3, y);
    xPos += w + 2.5;
    });
    y += 12;

    /* ===== IDIOMAS ===== */
    sectionTitle('Idiomas');
    cv.languages.forEach(lang => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(lang.lang, 15, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    doc.text(lang.level, 60, y);
    y += 6;
    });

    /* ===== FOOTER ===== */
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(
    'CV generado desde el portafolio web — ' + new Date().toLocaleDateString('es-PE'),
    105, 290, { align: 'center' }
    );

    // Nombre de archivo limpio (sin tildes/espacios)
    const fileName = 'CV_' + cv.name.replace(/\s+/g, '_').replace(/[^\w]/g, '') + '.pdf';
    doc.save(fileName);
}