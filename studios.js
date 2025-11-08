document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('locations-toggle');
    const menu = document.getElementById('locations-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function(event) {
            event.stopPropagation(); 
            menu.classList.toggle('show');
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                menu.classList.remove('show');
            }
        });
        
        menu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                menu.classList.remove('show');
            }
        });
    }
});