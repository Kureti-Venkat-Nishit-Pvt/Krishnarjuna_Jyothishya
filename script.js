console.log("KRISHNARJUNA JYOTHISHA website loaded successfully");



/* =========================

   CARD HOVER EFFECT

========================= */



const cards = document.querySelectorAll(

  ".card, .price-card"

);



cards.forEach((card) => {



  card.addEventListener("mouseenter", () => {

    card.style.transform =

      "translateY(-8px) scale(1.02)";

  });



  card.addEventListener("mouseleave", () => {

    card.style.transform =

      "translateY(0) scale(1)";

  });



});



/* =========================

   BUTTON CLICK EFFECT

========================= */



const buttons =

document.querySelectorAll(".btn");



buttons.forEach((button) => {



  button.addEventListener("click", () => {



    button.style.transform =

      "scale(0.96)";



    setTimeout(() => {

      button.style.transform =

        "scale(1)";

    }, 150);



  });



});



/* =========================

   FADE IN ANIMATION

========================= */



const observer =

new IntersectionObserver((entries) => {



  entries.forEach((entry) => {



    if(entry.isIntersecting){



      entry.target.classList.add("show");



    }



  });



});



document

.querySelectorAll("section")

.forEach((section) => {



  section.classList.add("hidden");



  observer.observe(section);



});
