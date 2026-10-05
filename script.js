// ============================================================
// 1. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ
// ============================================================
(function typedEffect() {
    const output = document.getElementById('typedOutput');
    const cursor = document.getElementById('typedCursor');
    const phrases = [
        'Справедливость не знает пощады.',
        'Мир будет очищен.',
        'Я — закон.',
        'Только я могу судить.',
        'Новый мир начинается здесь.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 70;

    function type() {
        const current = phrases[phraseIndex];
        if (!isDeleting) {
            output.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                speed = 1200;
                setTimeout(type, speed);
                return;
            }
            speed = 60 + Math.random() * 40;
        } else {
            output.textContent = current.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
                setTimeout(type, speed);
                return;
            }
            speed = 40 + Math.random() * 30;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 600);
})();

// ============================================================
// 2. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset -
                headerHeight - 10;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            document.getElementById('navMenu').classList.remove('nav--open');
        }
    });
});

// ============================================================
// 3. МОБИЛЬНОЕ МЕНЮ
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('nav--open');
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('nav--open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('nav--open');
        const icon = navToggle.querySelector('i');
        icon.className = 'fas fa-bars';
    }
});

// ============================================================
// 4. МОДАЛЬНОЕ ОКНО ПО КЛИКУ НА ЛОГОТИП
// ============================================================
const logoTrigger = document.getElementById('logoTrigger');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal() {
    modalOverlay.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
    document.body.style.transition = 'background 0.15s';
    document.body.style.background = 'rgba(192,57,43,0.08)';
    setTimeout(() => {
        document.body.style.background = '';
    }, 300);
}

function closeModal() {
    modalOverlay.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
}

logoTrigger.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ============================================================
// 5. АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ ПРИ СКРОЛЛЕ
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
    const headerHeight = document.getElementById('header').offsetHeight;
    let current = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight + 60) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('nav__link--active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

// ============================================================
// 6. АНИМАЦИЯ ПОЯВЛЕНИЯ (Fade-up при скролле)
// ============================================================
const fadeElements = document.querySelectorAll('.fade-up');

function checkFade() {
    const windowHeight = window.innerHeight;
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade, { passive: true });
window.addEventListener('load', checkFade);
setTimeout(checkFade, 300);

// ============================================================
// 7. ФОРМА (имитация отправки)
// ============================================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const btn = this.querySelector('.contact__form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Отправлено...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        alert('Ваше послание доставлено. Я прочту его.');
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
    }, 1200);
});

// ============================================================
// 8. МОДАЛЬНЫЕ ОКНА ПРОЕКТОВ (КРАСНЫЕ НИТИ)
// ============================================================
// Открытие по клику на карточку проекта
document.querySelectorAll('.projects__item').forEach(item => {
    item.addEventListener('click', function() {
        const modalId = this.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('modal-project--open');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие по кнопке "×"
document.querySelectorAll('.modal-project__close').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal-project');
        modal.classList.remove('modal-project--open');
        document.body.style.overflow = '';
    });
});

// Закрытие по клику на тёмный фон
document.querySelectorAll('.modal-project').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('modal-project--open');
            document.body.style.overflow = '';
        }
    });
});

console.log('💀 Сайт Нового Бога загружен. Справедливость восторжествует.');