// portfolio.js - Фильтрация портфолио и модальное окно
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImages = [];
    let currentIndex = 0;

    // Функция фильтрации
    function filterPortfolio(filterValue) {
        // Сохраняем выбранный фильтр в sessionStorage (только на время сессии)
        sessionStorage.setItem('portfolioFilter', filterValue);
        
        portfolioItems.forEach(item => {
            if (item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Функция активации кнопки фильтра
    function activateFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            }
        });
    }

    // Функция открытия модального окна
    function openModal(imgElement) {
        const currentCategory = imgElement.closest('.portfolio-item').getAttribute('data-category');
        currentImages = Array.from(document.querySelectorAll(`.portfolio-item[data-category="${currentCategory}"] img`));
        
        currentIndex = currentImages.findIndex(img => img.src === imgElement.src);
        
        modal.style.display = 'block';
        modalImg.src = imgElement.getAttribute('data-full') || imgElement.src;
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Функция переключения фото
    function navigate(direction) {
        currentIndex += direction;
        
        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }
        
        modalImg.src = currentImages[currentIndex].getAttribute('data-full') || currentImages[currentIndex].src;
    }

    // Обработчики событий для кнопок фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            activateFilterButton(filterValue);
            filterPortfolio(filterValue);
        });
    });

    // Обработчики для открытия модального окна
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            openModal(this.querySelector('img'));
        });
    });

    // Обработчики для модального окна
    closeBtn.addEventListener('click', closeModal);
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(1);
    });

    // Закрытие модального окна при клике на фон
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Навигация с помощью клавиатуры
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });

    // Инициализация - восстанавливаем фильтр только если страница обновлена
    const savedFilter = sessionStorage.getItem('portfolioFilter');
    if (savedFilter && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        // Если есть сохраненный фильтр И страница была обновлена
        activateFilterButton(savedFilter);
        filterPortfolio(savedFilter);
    } else {
        // Если новая сессия или переход с другой страницы - показываем семейные фото
        activateFilterButton('family');
        filterPortfolio('family');
        // Очищаем sessionStorage при новом заходе
        sessionStorage.removeItem('portfolioFilter');
    }
});