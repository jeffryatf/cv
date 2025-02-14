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
      let gloss = card.querySelector('.card__gloss');

      gloss.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255,' + y / height * .9 + ') 0%, rgba(255, 255, 255, 0) 80%)';
  }

  function tilt(card, x, y) {
      let force = 25,
          rx = (x / width) * force,
          ry = (y / height) * -force;

      card.style.transform = 'rotateY(' + (rx) + 'deg) rotateX(' + (ry) + 'deg)';
      // let content = card.querySelector('.card__content');
      // content.style.transform = 'translateX(' + (rx * .75) + 'px) translateY(' + (ry * .75) + 'px)';
  }

  init();
})();