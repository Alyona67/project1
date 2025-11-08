// Управление формой отзывов
const reviewForm = document.getElementById('reviewForm');
const testimonialsContainer = document.getElementById('testimonialsContainer');
const submitBtn = document.getElementById('submitReviewBtn');

// Загружаем отзывы при загрузке страницы
// Загружаем отзывы при загрузке страницы
function loadTestimonials() {
    const savedTestimonials = localStorage.getItem('userTestimonials');
    
    // Если есть сохраненные отзывы - очищаем контейнер и загружаем только их
    if (savedTestimonials) {
        const testimonials = JSON.parse(savedTestimonials);
        
        // Очищаем контейнер от исходных отзывов
        testimonialsContainer.innerHTML = '';
        
        // Добавляем только сохраненные отзывы
        testimonials.forEach(testimonial => {
            addTestimonialToDOM(testimonial);
        });
    }
    // Если нет сохраненных отзывов - оставляем исходные из HTML
}

// Сохраняем отзывы в localStorage
function saveTestimonials() {
    const testimonials = [];
    document.querySelectorAll('.testimonial-card').forEach(card => {
        const text = card.querySelector('.testimonial-text').textContent;
        const name = card.querySelector('.client-info h4').textContent;
        const type = card.querySelector('.client-info p').textContent;
        const initials = card.querySelector('.client-avatar').textContent;
        
        testimonials.push({ text, name, type, initials });
    });
    localStorage.setItem('userTestimonials', JSON.stringify(testimonials));
}

// Добавляем отзыв в DOM
function addTestimonialToDOM(testimonial) {
    const newTestimonial = document.createElement('div');
    newTestimonial.className = 'testimonial-card';
    newTestimonial.innerHTML = `
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-client">
            <div class="client-avatar">${testimonial.initials}</div>
            <div class="client-info">
                <h4>${testimonial.name}</h4>
                <p>${testimonial.type}</p>
            </div>
        </div>
    `;
    testimonialsContainer.prepend(newTestimonial);
}

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохраненные отзывы
    loadTestimonials();
    
    // Обработчик отправки отзыва
    submitBtn.addEventListener('click', function() {
        const name = document.getElementById('clientName').value;
        const shootType = document.getElementById('shootType').value;
        const reviewText = document.getElementById('reviewText').value;
        
        if (!name || !shootType || !reviewText) {
            alert('Заполните все поля');
            return;
        }
        
        // Создаем новый отзыв
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        const testimonial = {
            text: `"${reviewText}"`,
            name: name,
            type: shootType,
            initials: initials
        };
        
        // Добавляем в DOM и сохраняем
        addTestimonialToDOM(testimonial);
        saveTestimonials();
        
        // Закрываем форму
        reviewForm.style.display = 'none';
        document.getElementById('newReviewForm').reset();
        
        alert('Спасибо за ваш отзыв!');
    });
    
    // Остальные обработчики...
    document.querySelector('.add-review-btn').addEventListener('click', function() {
        reviewForm.style.display = 'block';
    });
    
    document.querySelector('.cancel-btn').addEventListener('click', function() {
        reviewForm.style.display = 'none';
    });
    
    reviewForm.addEventListener('click', function(e) {
        if (e.target === reviewForm) {
            reviewForm.style.display = 'none';
        }
    });
});