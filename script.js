document.addEventListener('DOMContentLoaded', () => {
  console.log('KRISHNARJUNA JYOTHISHA website loaded successfully');

  const animatedItems = document.querySelectorAll('.card, .price-card, .contact-box, .about-text, .note');

  animatedItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.animationDelay = `${index * 0.08}s`;
  });
});