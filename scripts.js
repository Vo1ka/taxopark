document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.cars-cards');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const cards = document.querySelectorAll('.car-card');

    // Определяем сколько карточек видно одновременно
    function getVisibleCards() {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 3;
    }

    let currentIndex = 0;
    let visibleCards = getVisibleCards();

    function updateSlider() {
        visibleCards = getVisibleCards();
        const cardWidth = cards[0].offsetWidth + 28; // 28px — gap
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        // Скрыть кнопки если карточек мало
        if (cards.length <= visibleCards) {
            prevBtn.style.visibility = 'hidden';
            nextBtn.style.visibility = 'hidden';
        } else {
            prevBtn.style.visibility = 'visible';
            nextBtn.style.visibility = 'visible';
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - visibleCards);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Инициализация
    updateSlider();

    // Active menu highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // 80px — запас под фиксированный хедер
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});


const carData = {
  "comfort": [
    { model: "Hyundai Solaris", price: 3200 },
    { model: "Kia Rio", price: 3300 }
  ],
  "comfort-plus": [
    { model: "Skoda Octavia", price: 3700 },
    { model: "Toyota Camry", price: 4200 }
  ],
  "economy": [
    { model: "Renault Logan", price: 2800 },
    { model: "Volkswagen Polo", price: 2900 }
  ]
};

function fillModels(category) {
  const select = document.getElementById('car-model');
  select.innerHTML = '';
  if (carData[category]) {
    carData[category].forEach(car => {
      const opt = document.createElement('option');
      opt.value = car.model;
      opt.textContent = car.model;
      select.appendChild(opt);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const carCategory = document.getElementById('car-category');
  fillModels(carCategory.value);

  carCategory.addEventListener('change', function() {
    fillModels(this.value);
  });

  document.getElementById('calc-btn').addEventListener('click', function() {
    const cat = document.getElementById('car-category').value;
    const model = document.getElementById('car-model').value;
    const days = Math.max(1, parseInt(document.getElementById('rent-days').value) || 1);

    // Валидация
    if (!cat || !model || isNaN(days) || days < 1) {
      alert('Пожалуйста, выберите категорию, модель и укажите срок аренды.');
      return;
    }
    const car = carData[cat].find(c => c.model === model);
    if (!car) {
      alert('Модель не найдена!');
      return;
    }
    let sum = car.price * days;
    // Пример скидки: при аренде от 14 дней скидка 10%
    if (days >= 14) sum = Math.round(sum * 0.9);

    document.getElementById('calc-sum').textContent = sum.toLocaleString('ru-RU');
    document.getElementById('calc-result').style.display = 'block';
  });
});
