@@include('./swiper.js');
@@include('./modal.js');
@@include('./vanillaTextMask.js');


document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Phone mask
  (function() {
    const phoneMask = ['+', '7', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    const myInput = document.querySelector('.js-tel');

    vanillaTextMask.maskInput({
      inputElement: myInput,
      mask: phoneMask
    });
  })();


  // Menu burger
  (function() {
    document.getElementById('js-burger').addEventListener('click', function() {
      this.classList.toggle('has-active');
      document.getElementById('header-menu').classList.toggle('is-visible');
      document.body.classList.toggle('hidden-scroll');
    });
  })();


  // Menu sublinks
  (function() {
    const menuSubLinks = document.getElementsByClassName('js-menu-sub');

    for (let i = 0; i < menuSubLinks.length; i++) {
      menuSubLinks[i].addEventListener('click', function() {
        this.classList.toggle('has-dropdown');
      });
    }
  })();


  // Search toggle
  (function() {
    const searchToggleBtn = document.getElementById('js-toggle-search');
    const headerSearchBlock = searchToggleBtn.closest('.header-search');

    if (!searchToggleBtn || !headerSearchBlock) return;

    searchToggleBtn.addEventListener('click', function() {
      if (headerSearchBlock.classList.contains('is-active')) {
        document.removeEventListener('click', searchClick);
      } else {
        document.addEventListener('click', searchClick);
      }

      headerSearchBlock.classList.toggle('is-active');
    });

    function searchClick(e) {
      const flyoutElement = document.getElementById('js-search');
      let targetElement = e.target;

      do {
        if (targetElement == flyoutElement) return;

        targetElement = targetElement.parentNode;
      } while (targetElement);

      document.removeEventListener('click', searchClick);
      headerSearchBlock.classList.remove('is-active');
    }
  })();


  // Quotes slider
  (function() {
    const quotesSlider = document.getElementById('js-quotes-slider');

    if (!quotesSlider) return;

    new Swiper (quotesSlider, {
      loop: true,
      autoHeight: true,

      pagination: {
        el: '.quotes-block__dots',
        clickable: true
      },
      navigation: {
        nextEl: '.quotes-block__arrow--next',
        prevEl: '.quotes-block__arrow--prev',
      }
    });
  })();

  // Books slider
  (function() {
    const booksSlider = document.getElementById('js-books-slider');

    if (!booksSlider) return;

    new Swiper (booksSlider, {
      loop: false,
      autoHeight: true,
      slidesPerView: 'auto',
      freeMode: true,

      pagination: {
        el: '.books-slider__dots',
        clickable: true
      },
      navigation: {
        nextEl: '.books-slider__arrow--next',
        prevEl: '.books-slider__arrow--prev',
      },
      breakpoints: {
        1221: {
          freeMode: false,
          slidesPerView: 5
        }
      }
    });
  })();


  // Modals
  (function() {
    initBaseModals();

    function initBaseModals() {
      var modals = document.getElementsByClassName('js-modal');

      for (var i = 0; i < modals.length; i++) {
        initModal(modals[i]);
      }
    }

    function initModal(modalElement) {
      var modalPlugin = new Modal(modalElement);
      var modalId =  modalElement.getAttribute('id');

      addButtonsEvent(modalPlugin);

      return modalPlugin;

      function addButtonsEvent(obj) {
        var modalBtns = document.querySelectorAll('[data-modal="'+ modalId +'"]');

        for (var j = 0; j < modalBtns.length; j++) {
          modalBtns[j].addEventListener('click', function() {
            obj.open();
            }, false);
        }
      }
    }
  })();


  // Textarea auto-height
  (function() {
    document.querySelectorAll('textarea').forEach(el => {
      const bordersWidth = parseInt(getComputedStyle(el, null).getPropertyValue('border-top-width'));

      el.style.height = el.setAttribute('style', 'height: ' + (el.scrollHeight + bordersWidth * 2) + 'px');
      el.classList.add('auto');
      el.addEventListener('input', e => {
          el.style.height = 'auto';
          el.style.height = (el.scrollHeight + bordersWidth * 2) + 'px';
      });
    });
  })();




});
