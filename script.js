// ---------- REVEAL AL HACER SCROLL ----------
const els = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
els.forEach(el => io.observe(el));

// ---------- TABS (si existen en la página) ----------
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ---------- FAQ ACORDEÓN ----------
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

// ---------- BANNER DE COOKIES ----------
const banner = document.getElementById('cookieBanner');
const configPanel = document.getElementById('cookieConfig');
const btnSaveConfig = document.getElementById('btnSaveConfig');
const btnToggleSettings = document.getElementById('btnToggleSettings');

window.addEventListener('load', function () {
    if (!banner) return;
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        banner.style.display = 'block';
    } else {
        executeScripts(JSON.parse(consent));
    }
});

function openCookieBanner() {
    if (banner) banner.style.display = 'block';
}

function toggleSettings() {
    const isHidden = configPanel.style.display === 'none' || configPanel.style.display === '';
    configPanel.style.display = isHidden ? 'block' : 'none';
    btnSaveConfig.style.display = isHidden ? 'block' : 'none';
    btnToggleSettings.style.display = isHidden ? 'none' : 'block';
}

function acceptAllCookies() {
    saveConsent({ analytics: true, marketing: true });
}

function rejectAllCookies() {
    saveConsent({ analytics: false, marketing: false });
}

function saveCustomCookies() {
    saveConsent({
        analytics: document.getElementById('cookiesAnalytics').checked,
        marketing: document.getElementById('cookiesMarketing').checked
    });
}

function saveConsent(consent) {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    banner.style.display = 'none';
    executeScripts(consent);
}

function executeScripts(consent) {
    if (consent.analytics) {
        console.log("Inicializando Google Analytics...");
        let scriptGA = document.createElement('script');
        scriptGA.async = true;
        scriptGA.src = "https://www.googletagmanager.com/gtag/js?id=G-9LG1S598NR";
        document.head.appendChild(scriptGA);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-9LG1S598NR');
    }

    if (consent.marketing) {
        console.log("Inicializando cookies de marketing...");
    }
}