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