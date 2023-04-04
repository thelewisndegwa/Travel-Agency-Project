// nav bar js
const menuToggle= document.querySelector(".menu-bars");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("slide");
});

// slideshow js
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls 
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

setInterval(() => {
  plusSlides(1);
}, 3000);


//fetch and display items to flip cards

const cardsContainer = document.getElementById('cards-container');

fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const accommodations = data.accommodations;
    for (const accommodation of accommodations) {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const flipper = document.createElement('div');
      flipper.classList.add('flipper');
      
      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = accommodation.type;
      
      const back = document.createElement('div');
      back.classList.add('back');
      const price = document.createElement('p');
      price.textContent = `Price per night: $${accommodation.price_per_night}`;
      const rooms = document.createElement('p');
      rooms.textContent = `Available rooms: ${accommodation.available_rooms}`;
      const occupancy = document.createElement('p');
      occupancy.textContent = `Max occupancy: ${accommodation.max_occupancy}`;
      const description = document.createElement('p');
      description.textContent = accommodation.description;
      const type = document.createElement('h2');
      type.textContent = accommodation.type;
      
      back.appendChild(type);
      back.appendChild(price);
      back.appendChild(rooms);
      back.appendChild(occupancy);
      back.appendChild(description);
      
      flipper.appendChild(front);
      flipper.appendChild(back);
      
      card.appendChild(flipper);
      
      cardsContainer.appendChild(card);
    }
  })
  .catch(error => console.error(error));
