/* ── Datos comerciales ─────────────────────────────────────── */
    const WHATSAPP = "5493764144012";            // wa.me usa 549 + número
    const WHATSAPP_LABEL = "+54 9 3764 144012"; // texto visible
    const EMAIL = "brooposadas@gmail.com";
    const CIUDAD = "Todo Misiones, Argentina";
    const SOCIAL = [
        { name: 'Facebook',  url: 'https://www.facebook.com/share/1bE9HE62eN/' },
        { name: 'Instagram', url: 'https://www.instagram.com/rs.misiones' },
        { name: 'TikTok',    url: 'https://www.tiktok.com/@rsmisiones' }
    ];

    /* Iconos SVG de redes sociales */
    const ICONS = {
        Facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V11H9v3h2.3v7h2.2z"/></svg>',
        Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
        TikTok:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.5 3.6 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1.1v5.7c0 3.4-2.4 5.8-5.6 5.8-2.8 0-5-2-5-4.9 0-3.2 2.5-5.4 5.7-5.2v2.7c-.4-.1-.8-.2-1.2-.2-1.5 0-2.5 1-2.5 2.5 0 1.4 1 2.4 2.5 2.4 1.5 0 2.6-1.1 2.6-2.8V3h4z"/></svg>'
    };

    function renderSocial(containerId) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = SOCIAL.map(s => {
            const icon = ICONS[s.name] || '';
            if (!s.url) {
                return '<span class="social-link" title="' + s.name + ' (completar URL)" aria-label="' + s.name + '">' + icon + '</span>';
            }
            return '<a class="social-link" href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.name + '" title="' + s.name + '">' + icon + '</a>';
        }).join('');
    }

    /* Rellenar los datos de contacto */
    function initContact() {
        const wa = document.getElementById('wa-link');
        const mail = document.getElementById('mail-link');
        const zona = document.getElementById('zona-valor');
        if (wa) { wa.textContent = WHATSAPP_LABEL; wa.href = 'https://wa.me/' + WHATSAPP; }
        if (mail) { mail.textContent = EMAIL; mail.href = 'mailto:' + EMAIL; }
        if (zona && CIUDAD) zona.textContent = CIUDAD;
        const waFloat = document.getElementById('waFloat');
        if (waFloat) waFloat.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Hola ìDOC 👋 Quiero información sobre GC');
        renderSocial('socialRow');
        renderSocial('socialRowFooter');
    }
    initContact();

    /* ── Menú móvil ─────────────────────────────────────────────── */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    burger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        burger.textContent = open ? '✕' : '☰';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.textContent = '☰';
    }));

    /* ── Header con sombra al hacer scroll ──────────────────────── */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    /* ── Botón volver arriba ────────────────────────────────────── */
    const toTop = document.getElementById('toTop');
    if (toTop) {
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 600));
    }

    /* ── Smooth scroll (respetando header fijo) ─────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    /* ── Animaciones de aparición ───────────────────────────────── */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* ── Formulario: compone WhatsApp o mailto ──────────────────── */
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    if (form) form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('f-nombre').value.trim();
        if (!nombre) {
            document.getElementById('f-nombre').focus();
            note.textContent = 'Por favor, escribí tu nombre para continuar.';
            return;
        }
        const comercio = document.getElementById('f-comercio').value.trim();
        const rubro = document.getElementById('f-rubro').value.trim();
        const modelo = document.getElementById('f-modelo').value;
        const mensaje = document.getElementById('f-mensaje').value.trim();

        const texto = [
            'Hola ìDOC 👋',
            'Nombre: ' + nombre,
            comercio ? 'Comercio: ' + comercio : '',
            rubro ? 'Rubro: ' + rubro : '',
            modelo ? 'Modelo de interés: ' + modelo : '',
            mensaje ? 'Mensaje: ' + mensaje : ''
        ].filter(Boolean).join('\n');

        if (WHATSAPP) {
            window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank');
        } else if (EMAIL) {
            window.location.href = 'mailto:' + EMAIL + '?subject=' +
                encodeURIComponent('Consulta GC · ' + nombre) + '&body=' + encodeURIComponent(texto);
        } else {
            note.textContent = 'Los datos de contacto aún no están configurados. Completalos en el bloque CONFIGURACIÓN del archivo index.html.';
        }
    });
    }
/* ── Lightbox (abrir imágenes al hacer clic) ──────────────────── */
(function () {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Cerrar">✕</button><img alt="">';
    document.body.appendChild(lb);
    var img = lb.querySelector('img');
    var close = lb.querySelector('.lb-close');
    function openLb(src) { img.src = src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; img.src = ''; }
    document.querySelectorAll('.shot img, .sol-media img, .device-window img, .floating-phone img, .why-brand img').forEach(function (el) {
        el.addEventListener('click', function () { openLb(el.getAttribute('src')); });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === close) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
})();
