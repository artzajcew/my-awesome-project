// Находим элементы ОДИН раз
const form = document.getElementById('contactForm');
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');

let lastActive = null;

// Обработчик открытия модалки
if (openBtn) {
    openBtn.addEventListener('click', () => {
        lastActive = document.activeElement;
        dlg.showModal();
        dlg.querySelector('input, select, textarea, button')?.focus();
    });
}

// Обработчики закрытия модалки
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        dlg.close('cancel');
    });
}

if (closeDialogBtn) {
    closeDialogBtn.addEventListener('click', () => {
        dlg.close('cancel');
    });
}

// Закрытие модалки по клику на backdrop
if (dlg) {
    dlg.addEventListener('click', (e) => {
        if (e.target === dlg) {
            dlg.close('cancel');
        }
    });
}

// Обработчик отправки формы
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Сброс ошибок
        resetFormErrors();
        
        // Валидация формы
        if (validateForm()) {
            // Симуляция успешной отправки
            showSuccessMessage();
            setTimeout(() => {
                dlg.close('success');
                form.reset();
            }, 1500);
        }
    });
}

// Фокус на предыдущий элемент после закрытия
if (dlg) {
    dlg.addEventListener('close', () => {
        lastActive?.focus();
    });
}

// Функции валидации
function resetFormErrors() {
    const fields = form.querySelectorAll('.form__field');
    const errors = form.querySelectorAll('.form__error');
    
    fields.forEach(field => {
        field.classList.remove('form__field--error');
    });
    
    errors.forEach(error => {
        error.style.display = 'none';
    });
}

function validateForm() {
    let isValid = true;
    const fields = form.elements;
    
    for (let field of fields) {
        if (field.willValidate && !field.checkValidity()) {
            markFieldAsInvalid(field);
            isValid = false;
        }
    }
    
    return isValid;
}

function markFieldAsInvalid(field) {
    field.classList.add('form__field--error');
    const errorElement = field.parentNode.querySelector('.form__error');
    if (errorElement) {
        errorElement.style.display = 'block';
    }
}

function showSuccessMessage() {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправлено!';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Маска для телефона
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('7')) {
            value = '7' + value.substring(1);
        }
        
        let formattedValue = '+7 (';
        
        if (value.length > 1) {
            formattedValue += value.substring(1, 4);
        }
        if (value.length >= 4) {
            formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formattedValue += '-' + value.substring(9, 11);
        }
        
        e.target.value = formattedValue;
    });

    phoneInput.addEventListener('keydown', function(e) {
        if ([46, 8, 9, 27, 13].includes(e.keyCode) || 
            (e.keyCode === 65 && e.ctrlKey === true) || 
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

// Автоматическое определение активного пункта меню
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === '/' && currentPage === 'index.html')) {
            link.classList.add('nav__link--active');
        }
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});