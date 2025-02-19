(function () {
  "use strict";

  var cards = document.querySelectorAll('.card'),
      width = window.innerWidth,
      height = window.innerHeight;

  function init() {
      bindMouse();

      cards.forEach(card => {
          light(card, 350, -125);
          tilt(card, 350, -125);
      });
  }

  function bindMouse() {
      document.addEventListener('mousemove', (event) => {
          let x = event.clientX - (width / 2),
              y = event.clientY - (height / 2);

          cards.forEach(card => {
              light(card, x, y);
              tilt(card, x, y);
          });
      });
  }

  function light(card, x, y) {
      let angle = (Math.atan2(y, x) * 180) / Math.PI - 90;
      let gloss = card.querySelector('.card-gloss');

      gloss.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255,' + y / height * .9 + ') 0%, rgba(255, 255, 255, 0) 80%)';
  }

  function tilt(card, x, y) {
      let force = 25,
          rx = (x / width) * force,
          ry = (y / height) * -force;

      card.style.transform = 'rotateY(' + (rx) + 'deg) rotateX(' + (ry) + 'deg)';
  }

  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  function openModal(title, description, image, buttonText, buttonVisible, buttonLink) {
    modal.querySelector("h1").textContent = title;
    modal.querySelector("p").innerHTML = description.replace(/\n/g, '<br>');
    modal.querySelector("img").src = image;
    var modalButton = modal.querySelector(".modal-button");
    modalButton.textContent = buttonText;
    modalButton.style.display = buttonVisible ? 'block' : 'none';
    modalButton.onclick = function() {
      window.location.href = buttonLink;
    };
    modal.classList.add("show");
    setTimeout(function() {
      modal.style.opacity = "1";
    }, 10);
  }

  span.onclick = function() {
    modal.style.opacity = "0";
    setTimeout(function() {
      modal.classList.remove("show");
    }, 300); 
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.opacity = "0";
      setTimeout(function() {
        modal.classList.remove("show");
      }, 300);
    }
  }

  document.querySelectorAll(".modalclick").forEach(function(modalClickItem) {
    modalClickItem.addEventListener("click", function() {
      var title = modalClickItem.getAttribute("data-title");
      var description = modalClickItem.getAttribute("data-description");
      var image = modalClickItem.getAttribute("data-image");
      var buttonText = modalClickItem.getAttribute("data-button-text") || "";
      var buttonVisible = modalClickItem.getAttribute("data-button-visible") === "true";
      var buttonLink = modalClickItem.getAttribute("data-button-link") || "#";
      openModal(title, description, image, buttonText, buttonVisible, buttonLink);
    });
  });

  init();
})();
