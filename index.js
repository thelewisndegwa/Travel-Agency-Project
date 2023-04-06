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

// Get accommodations and activities data from db.json
fetch("db.json")
  .then(response => response.json())
  .then(data => {
    const accommodations = data.accommodations;
    const activities = data.activities;

    // Get flip card containers from the HTML document
    const accommodationsContainer = document.getElementById("accommodations-container");
    const activitiesContainer = document.getElementById("activities-container");

    // Create flip card elements for accommodations
    accommodations.forEach(accommodation => {
      const flipCard = document.createElement("div");
      flipCard.classList.add("flip-card");

      const flipCardInner = document.createElement("div");
      flipCardInner.classList.add("flip-card-inner");

      const flipCardFront = document.createElement("div");
      flipCardFront.classList.add("flip-card-front");

      const image = document.createElement("img");
      image.src = accommodation.image;
      image.alt = accommodation.type;
      flipCardFront.appendChild(image);

      const type = document.createElement("h3");
      type.textContent = accommodation.type;
      flipCardFront.appendChild(type);

      flipCardInner.appendChild(flipCardFront);

      const flipCardBack = document.createElement("div");
      flipCardBack.classList.add("flip-card-back");

      const price = document.createElement("p");
      price.textContent = "Price per night: $" + accommodation.price_per_night;
      flipCardBack.appendChild(price);

      const availableRooms = document.createElement("p");
      availableRooms.textContent = "Available rooms: " + accommodation.available_rooms;
      flipCardBack.appendChild(availableRooms);

      const maxOccupancy = document.createElement("p");
      maxOccupancy.textContent = "Max occupancy: " + accommodation.max_occupancy;
      flipCardBack.appendChild(maxOccupancy);

      const description = document.createElement("p");
      description.textContent = accommodation.description;
      flipCardBack.appendChild(description);

      flipCardInner.appendChild(flipCardBack);

      flipCard.appendChild(flipCardInner);

      accommodationsContainer.appendChild(flipCard);
    });

    // Create flip card elements for activities
    activities.forEach(activity => {
      const flipCard = document.createElement("div");
      flipCard.classList.add("flip-card");

      const flipCardInner = document.createElement("div");
      flipCardInner.classList.add("flip-card-inner");

      const flipCardFront = document.createElement("div");
      flipCardFront.classList.add("flip-card-front");

      const image = document.createElement("img");
      image.src = activity.image;
      image.alt = activity.name;
      flipCardFront.appendChild(image);

      const name = document.createElement("h3");
      name.textContent = activity.name;
      flipCardFront.appendChild(name);

      flipCardInner.appendChild(flipCardFront);

      const flipCardBack = document.createElement("div");
      flipCardBack.classList.add("flip-card-back");

      const price = document.createElement("p");
      price.textContent = "Price: $" + activity.price;
      flipCardBack.appendChild(price);

      const time = document.createElement("p");
      time.textContent = "Time: " + activity.time;
      flipCardBack.appendChild(time);

      const description = document.createElement("p");
      description.textContent = activity.description;
      flipCardBack.appendChild(description);

      flipCardInner.appendChild(flipCardBack);

      flipCard.appendChild(flipCardInner);

      activitiesContainer.appendChild(flipCard);
    });
  })
  .catch(error => console.log(error));

 