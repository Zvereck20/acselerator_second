// Modal window

const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const closeModalButton = modal.querySelector('.modal__toggle');
const openModalButton = document.querySelector('.navigation__button');

const MODAL_QUESTION = document.querySelector('#modal-question');
const MODAL_NAME = modal.querySelector('#modal-name');
const MODAL_PHONE = modal.querySelector('#modal-telephone');
const MODAL_CHECKBOX = modal.querySelector('#modal-agree');

function existVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight
};

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
};

openModalButton.addEventListener('click', e => {
  e.preventDefault();

  body.dataset.scrollY = getBodyScrollTop();

  modal.classList.remove('visually-hidden');

  modal.querySelector('#modal-name').focus();

  if (existVerticalScroll()) {
    body.classList.add('body-lock')
    body.style.top = `-${body.dataset.scrollY}px`
  };
})

closeModalButton.addEventListener('click', e => {
  e.preventDefault();

  modal.classList.add('visually-hidden');

  if (existVerticalScroll()) {
    body.classList.remove('body-lock')
    window.scrollTo(0, body.dataset.scrollY)
  };
})

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    if (!modal.classList.contains('visually-hidden')) {
      modal.classList.add('visually-hidden');
    }

    if (existVerticalScroll()) {
      body.classList.remove('body-lock')
      window.scrollTo(0, body.dataset.scrollY)
    }
  };
});

const checkedCheckbox = (ckeckbox) => {
   if (!ckeckbox.checked) {
    ckeckbox.setCustomValidity('К сожалению вы не дали своего согласия!');
  } else {
    ckeckbox.setCustomValidity('');
  }
}

// Local save
MODAL_CHECKBOX.addEventListener('click', () => {
  checkedCheckbox(MODAL_CHECKBOX);
});

modal.addEventListener('submit', (evt) => {
  evt.preventDefault();

  localStorage.setItem('modal__name', MODAL_NAME.value);
  localStorage.setItem('modal__phone', MODAL_PHONE.value);
  localStorage.setItem('modal__question', MODAL_QUESTION.value);
  MODAL_NAME.value = '';
  MODAL_PHONE.value = '';
  MODAL_QUESTION.value = 'Ваш вопрос';

  modal.classList.add('visually-hidden');

  if (existVerticalScroll()) {
    body.classList.remove('body-lock')
    window.scrollTo(0, body.dataset.scrollY)
  };
});

const feedbackForm = document.querySelector('.feedback__field');
const FEEDBACK_NAME = feedbackForm.querySelector('#name');
const FEEDBACK_PHONE = feedbackForm.querySelector('#telephone');
const FEEDBACK_QUESTION = feedbackForm.querySelector('#question');
const FEEDBACK_CHECKBOX = feedbackForm.querySelector('#agree');

FEEDBACK_CHECKBOX.addEventListener('click', () => {
  checkedCheckbox(FEEDBACK_CHECKBOX);
});

feedbackForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  localStorage.setItem('feedback__name', FEEDBACK_NAME.value);
  localStorage.setItem('feedback__phone', FEEDBACK_PHONE.value);
  localStorage.setItem('feedback__question', FEEDBACK_QUESTION.value);
  FEEDBACK_NAME.value = '';
  FEEDBACK_PHONE.value = '';
  FEEDBACK_QUESTION.value = 'Ваш вопрос';
});

// Form validation

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
  };

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

  const fields = document.querySelectorAll('input[type="tel"]');
  fields.forEach((input) => {
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  });
});


// Accordion

const accordion = document.querySelectorAll('.accordion');
const accordionToggle = document.querySelectorAll('.toggle');

accordion.forEach((item) => {
  item.classList.add('accordion--close');
});

const emergenceToggle = () => {
  accordionToggle.forEach((toggle) => {
    toggle.classList.add('toggle--close');
  })
};

emergenceToggle();

accordionToggle.forEach((toggle) => {
  toggle.addEventListener('click', () => {

    emergenceToggle();

    const parent = toggle.parentNode;

    if (parent.classList.contains('accordion--close')) {
      toggle.classList.remove('toggle--close');
      toggle.classList.add('toggle--open');
    } else {
      toggle.classList.add('toggle--close');
      toggle.classList.remove('toggle--open');
    }

    if (parent.classList.contains('accordion--close')) {
      accordion.forEach((item) => item.classList.add('accordion--close'));
      parent.classList.remove('accordion--close');
    } else {
      parent.classList.add('accordion--close');
    }
  })
});
