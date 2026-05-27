console.log("KRISHNARJUNA JYOTHISHA website loaded successfully");



// Smooth hover animation for cards

const cards = document.querySelectorAll(".card, .price-card");



cards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.transform = "translateY(-8px) scale(1.02)";

  });



  card.addEventListener("mouseleave", () => {

    card.style.transform = "translateY(0) scale(1)";

  });

});



// Button click animation

const buttons = document.querySelectorAll(".btn");



buttons.forEach((button) => {

  button.addEventListener("click", () => {

    button.style.transform = "scale(0.96)";



    setTimeout(() => {

      button.style.transform = "scale(1)";

    }, 150);

  });

});



// Fade-in animation on scroll

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {



    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }



  });

});



document.querySelectorAll("section").forEach((section) => {

  section.classList.add("hidden");

  observer.observe(section);

});
