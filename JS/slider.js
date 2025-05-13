const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
let currentIndex = 0;
let slideInterval;

// Создание точек
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');

  document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active-dot'));
  dots[index].classList.add('active-dot');

  currentIndex = index;
}

document.querySelector('.prev').addEventListener('click', () => {
  let index = currentIndex - 1;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
  resetInterval();
});

document.querySelector('.next').addEventListener('click', () => {
  let index = currentIndex + 1;
  if (index >= slides.length) index = 0;
  showSlide(index);
  resetInterval();
});

// Автоперелистывание
function startInterval() {
  slideInterval = setInterval(() => {
    let index = currentIndex + 1;
    if (index >= slides.length) index = 0;
    showSlide(index);
  }, 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Инициализация
showSlide(0);
startInterval();
  