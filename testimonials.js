// Управление формой отзывов
const reviewForm = document.getElementById('reviewForm');
const addReviewBtn = document.querySelector('.add-review-btn');
const newReviewForm = document.getElementById('newReviewForm');
const testimonialsContainer = document.getElementById('testimonialsContainer');
const clientsCount = document.getElementById('clientsCount');
const reviewsCount = document.getElementById('reviewsCount');

function openForm() {
    reviewForm.style.display = 'block';
}

function closeForm() {
    reviewForm.style.display = 'none';
    newReviewForm.reset();
}

// Обработчик отправки формы
newReviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const shootType = document.getElementById('shootType').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Создаем новый отзыв
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const newTestimonial = document.createElement('div');
    newTestimonial.className = 'testimonial-card';
    newTestimonial.innerHTML = `
        <p class="testimonial-text">"${reviewText}"</p>
        <div class="testimonial-client">
            <div class="client-avatar">${initials}</div>
            <div class="client-info">
                <h4>${name}</h4>
                <p>${shootType}</p>
            </div>
        </div>
    `;
    
    // Добавляем новый отзыв в начало
    testimonialsContainer.insertBefore(newTestimonial, testimonialsContainer.firstChild);
    
    // Обновляем счетчики
    updateCounters();
    
    // Закрываем форму и очищаем
    closeForm();
    
    // Показываем подтверждение
    alert('Спасибо за ваш отзыв!');
});

// Обновление счетчиков
function updateCounters() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    reviewsCount.textContent = `${testimonialCards.length}+`;
}

// Закрытие формы по клику на overlay
reviewForm.addEventListener('click', function(e) {
    if (e.target === reviewForm) {
        closeForm();
    }
});

// Открытие формы по кнопке
addReviewBtn.addEventListener('click', openForm);

// Закрытие формы по кнопке отмена
document.querySelector('.cancel-btn').addEventListener('click', closeForm);

// Анимация появления отзывов
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    updateCounters();
});