// Navigation block

const body = document.querySelector('main')
const header = document.querySelector('header');
const navMain = document.querySelector('.navigation');
const navToggle = document.querySelector('.navigation__toggle');

navMain.classList.remove('navigation--nojs');
header.classList.remove('header--nojs')

navToggle.addEventListener('click', function () {

  if (navMain.classList.contains('navigation--closed')) {
    navMain.classList.remove('navigation--closed');
    navMain.classList.add('navigation--opened');
    body.classList.add('body-lock')
  } else {
    navMain.classList.add('navigation--closed');
    navMain.classList.remove('navigation--opened');
    body.classList.remove('body-lock')
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    if (!navMain.classList.contains('navigation--closed')) {
      navMain.classList.remove('navigation--opened');
      navMain.classList.add('navigation--closed');
      body.classList.remove('body-lock')
    }
  }
});

const navLinks = document.querySelectorAll('.navigation__link');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMain.classList.add('navigation--closed');
    navMain.classList.remove('navigation--opened');
    body.classList.remove('body-lock')
  })
})

window.addEventListener("DOMContentLoaded", function () {

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(event) {
    var matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");

    if (val.length < 10) {
      this.setCustomValidity('Номер введен не полностью');
    } else {
      this.setCustomValidity('');
    }

    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });

    if (event.type == "blur") {
      if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
  };

  var input = document.querySelector("#telephone");
  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);

});
