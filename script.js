document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобильное меню (бургер)
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('nav ul');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Закрываем меню при клике на ссылку (удобно на мобильных)
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // 2. Анимация появления карточек при прокрутке (Scroll Reveal)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // анимируем один раз
      }
    });
  }, observerOptions);

  // Элементы, которые будут плавно появляться
  document.querySelectorAll('.card, .hero h1, .hero p').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
    // 3. Калькулятор билетов (только на странице tour.html)
  const ticketForm = document.querySelector('#ticket-form');

  if (ticketForm) {
    const promoCodes = {
      'AURORA10': 0.10,
      'MUSIC20': 0.20,
      'FAN15': 0.15
    };

    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const citySelect = document.querySelector('#city');
      const cityPrice = parseInt(citySelect.options[citySelect.selectedIndex].dataset.price);

      const categorySelect = document.querySelector('#category');
      const multiplier = parseFloat(categorySelect.options[categorySelect.selectedIndex].dataset.multiplier);

      const quantity = parseInt(document.querySelector('#quantity').value) || 1;
      const vipChecked = document.querySelector('#vip').checked;
      const promoInput = document.querySelector('#promo').value.trim().toUpperCase();
      const promoMsg = document.querySelector('#promo-msg');

      // Базовая цена за 1 билет
      let pricePerTicket = cityPrice * multiplier;

      // VIP-пакет
      if (vipChecked) {
        pricePerTicket += 1500;
      }

      // Промокод
      let discount = 0;
      if (promoInput && promoCodes[promoInput]) {
        discount = promoCodes[promoInput];
        promoMsg.textContent = `Промокод принят! Скидка ${discount * 100}%`;
        promoMsg.style.color = 'green';
      } else if (promoInput) {
        promoMsg.textContent = 'Неверный промокод';
        promoMsg.style.color = 'red';
      } else {
        promoMsg.textContent = '';
      }

      // Считаем итог
      let total = pricePerTicket * quantity;
      total = total - (total * discount);
      total = total + (total * 0.05); // сервисный сбор 5%

      // Показываем результат
      const resultDiv = document.querySelector('#result');
      const totalPrice = document.querySelector('#total-price');
      resultDiv.style.display = 'block';
      totalPrice.textContent = Math.round(total) + ' ₽';
    });
  }

});
