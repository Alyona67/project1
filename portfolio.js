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

    // Современная проверка типа загрузки страницы
    function isPageReloaded() {
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        return navigationEntry ? navigationEntry.type === 'reload' : false;
    }

    function filterPortfolio(filterValue) {
        sessionStorage.setItem('portfolioFilter', filterValue);
        
        portfolioItems.forEach(item => {
            const isMatch = item.getAttribute('data-category') === filterValue;
            
            if (isMatch) {
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

    function activateFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
        });
    }

    function openModal(imgElement) {
        const portfolioItem = imgElement.closest('.portfolio-item');
        const currentCategory = portfolioItem.getAttribute('data-category');
        
        currentImages = Array.from(document.querySelectorAll(
            `.portfolio-item[data-category="${currentCategory}"] img`
        ));
        
        currentIndex = currentImages.findIndex(img => img.src === imgElement.src);
        
        modal.style.display = 'block';
        modalImg.src = imgElement.getAttribute('data-full') || imgElement.src;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex].getAttribute('data-full') || currentImages[currentIndex].src;
    }

    // Инициализация обработчиков событий
    function initEventListeners() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                activateFilterButton(filterValue);
                filterPortfolio(filterValue);
            });
        });

        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                openModal(this.querySelector('img'));
            });
        });

        closeBtn.addEventListener('click', closeModal);
        
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(-1);
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(1);
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case 'ArrowLeft':
                        navigate(-1);
                        break;
                    case 'ArrowRight':
                        navigate(1);
                        break;
                }
            }
        });
    }

    // Инициализация при загрузке страницы
    function initPortfolio() {
        const savedFilter = sessionStorage.getItem('portfolioFilter');
        const isReloaded = isPageReloaded();

        if (savedFilter && isReloaded) {
            // Восстанавливаем фильтр только при перезагрузке
            activateFilterButton(savedFilter);
            filterPortfolio(savedFilter);
        } else {
            // Новая сессия - показываем семейные фото
            activateFilterButton('family');
            filterPortfolio('family');
            
            // Очищаем сохраненный фильтр для новых сессий
            if (!isReloaded) {
                sessionStorage.removeItem('portfolioFilter');
            }
        }
    }

    // Запуск
    initEventListeners();
    initPortfolio();
});