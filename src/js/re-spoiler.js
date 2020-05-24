// Simple text spoiler
// Usage: add 'max-height' in css & data-spoiler="Text spoiler" to div
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initSpoiler();

  function initSpoiler() {
    var spolersList = document.querySelectorAll('[data-spoiler]');
    var btnHiddenClass = 'sp-more--hidden';
    var windowWidth = getWindowWidth();

    for (var i = 0; i < spolersList.length; i++) {
      var spolersListItem = spolersList[i];

      // create text wrapper
      var spoilerWrapper = document.createElement('div');

      spoilerWrapper.className = 'sp-wrapper';
      spolersListItem.parentNode.insertBefore(spoilerWrapper, spolersListItem);
      spoilerWrapper.appendChild(spolersListItem);

      // create btn
      var spoilerShowText = spolersListItem.dataset.spoiler || 'Show';
      var spoilerBtn = document.createElement('div');
      var spoilerBtnLink = document.createElement('span');

      spoilerBtn.className = 'sp-more';
      spoilerBtnLink.textContent = spoilerShowText;
      spoilerBtn.appendChild(spoilerBtnLink);
      spoilerWrapper.appendChild(spoilerBtn);
      spoilerBtn.classList.add(btnHiddenClass);

      reDraw(spolersListItem);

      spoilerBtnLink.addEventListener('click', function() {
        var thisParent = this.parentNode;
        var thisWrapper = thisParent.previousSibling;

        thisParent.classList.add(btnHiddenClass);

        thisWrapper.classList.add('sp-opened');
        thisWrapper.style.maxHeight = thisWrapper.scrollHeight + 'px';
      }, false);
    }

    window.addEventListener('resize', function() {
      var newWindowWidth = getWindowWidth();

      // if width change
      if (newWindowWidth !== windowWidth) {
        for (var i = 0; i < spolersList.length; i++) {
          reDraw(spolersList[i]);
        }

        windowWidth = newWindowWidth;
      }
    });

    function getWindowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    function reDraw(el) {
      var hasElScroll = el.scrollHeight > el.clientHeight;
      var btn = el.nextSibling;

      el.style.maxHeight = null;

      if (hasElScroll) {
        el.classList.add('sp-collapse');
        el.classList.remove('sp-opened');
        btn.classList.remove(btnHiddenClass);
      } else {
        btn.classList.add(btnHiddenClass);
        el.classList.add('sp-opened');
      }
    }
  }

});
