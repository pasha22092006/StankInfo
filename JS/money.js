// Данные о стипендиях
const scholarshipData = [
    { rating: "35-37", scholarship: "2700 ₽/мес" },
    { rating: "38-39", scholarship: "2900 ₽/мес" },
    { rating: "40-42", scholarship: "3100 ₽/мес" },
    { rating: "43-44", scholarship: "3400 ₽/мес" },
    { rating: "45-47", scholarship: "4100 ₽/мес" },
    { rating: "48-49", scholarship: "4850 ₽/мес" },
    { rating: "50+", scholarship: "5500 ₽/мес" }
];

// Элементы DOM
const slider = document.getElementById('rating-slider');
const sliderValue = document.getElementById('slider-value');
const tableBody = document.getElementById('scholarship-data');
const modal = document.getElementById('tipsModal');
const closeModalBtn = document.querySelector('.close-modal');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateScholarshipTable(slider.value);
    setupEventListeners();
});

// Настройка обработчиков событий
function setupEventListeners() {
    slider.addEventListener('input', handleSliderChange);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Обработка изменения слайдера
function handleSliderChange(e) {
    const value = e.target.value;
    sliderValue.textContent = value;
    updateScholarshipTable(value);
    
    // Анимация изменения значения
    sliderValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        sliderValue.style.transform = 'scale(1)';
    }, 200);
}

// Обновление таблицы стипендий
function updateScholarshipTable(rating) {
    const ratingNum = parseInt(rating);
    let matchedRange = scholarshipData.find(item => {
        const [min, max] = item.rating.split('-').map(num => 
            num.endsWith('+') ? 999 : parseInt(num)
        );
        return ratingNum >= min && (max ? ratingNum <= max : true);
    });
    
    if (!matchedRange) {
        matchedRange = scholarshipData[scholarshipData.length - 1];
    }
    
    tableBody.innerHTML = `
        <tr>
            <td>${matchedRange.rating}</td>
            <td class="highlight">${matchedRange.scholarship}</td>
        </tr>
    `;
}

// Рассчитать стипендию
function calculateScholarship() {
    const rating = slider.value;
    const ratingNum = parseInt(rating);
    let matchedRange = scholarshipData.find(item => {
        const [min, max] = item.rating.split('-').map(num => 
            num.endsWith('+') ? 999 : parseInt(num)
        );
        return ratingNum >= min && (max ? ratingNum <= max : true);
    });
    
    if (!matchedRange) {
        matchedRange = scholarshipData[scholarshipData.length - 1];
    }
    
    alert(`При рейтинге ${rating} ваша стипендия составит ${matchedRange.scholarship}`);
}

// Показать модальное окно с советами
function showTipsModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}