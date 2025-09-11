// Находим элементы ОДИН раз
const form = document.getElementById('contactForm');
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');

let lastActive = null;

// Обработчик открытия модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal(); // модальный режим + затемнение
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Обработчик закрытия модалки
closeBtn.addEventListener('click', () => {
    dlg.close('cancel');
});

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // 2) Проверка валидации
    if (!form.checkValidity()) {
        // Показываем ошибки
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        form.reportValidity();
        
        // Подсветка невалидных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }
    
    // 3) Если форма валидна - закрываем модалку и сбрасываем форму
    dlg.close('success');
    form.reset();
});

// Фокус на предыдущий элемент после закрытия
dlg.addEventListener('close', () => {
    lastActive?.focus();
});