/*!
 * Gentle Guide v1.0.0
 * Copyright (c) 2020 Dariel Vicedo <dariel@devmanextensions.com> (https://devmanextensions.com)
 * Licensed under ISC (https://github.com/devmanextensions/gentle-guide/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.GGuide = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var GCard = /*#__PURE__*/function () {
    /**
     * @param {Object} anchor the element to point to
     * @param {String} position the position of the card, relative to anchor
     * @param {String} content the text of the card
     * @param {Object} options the options
     */
    function GCard(anchor, position, content) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, GCard);

      var defaults = {
        showPrev: true,
        canFinish: true
      };
      this.anchor = anchor;
      this.position = position;
      this.content = content;
      this.options = Object.assign({}, defaults, options);
      this.element = this.createElement();
    }
    /**
     * Gets the DOM element representing the card.
     */


    _createClass(GCard, [{
      key: "getElement",
      value: function getElement() {
        return this.element;
      }
      /**
       * Creates the DOM element representing the card.
       */

    }, {
      key: "createElement",
      value: function createElement() {
        var card = document.createElement('div');
        card.className = 'gg-card';
        var content = document.createElement('div');
        content.className = 'gg-card-content';
        content.innerHTML = this.content;
        var footer = document.createElement('div');
        footer.className = 'gg-card-footer';
        var footerLeft = document.createElement('div');
        footerLeft.className = 'gg-card-footer-left';
        var footerCenter = document.createElement('div');
        footerCenter.className = 'gg-card-footer-center';
        var footerRight = document.createElement('div');
        footerRight.className = 'gg-card-footer-right';
        footer.append(footerLeft);
        footer.append(footerCenter);
        footer.append(footerRight);

        if (this.options.showPrev) {
          var prev = document.createElement('a');
          prev.setAttribute('role', 'button');
          prev.textContent = '<< prev';
          prev.addEventListener('click', this.options.onPrev, false);
          footerLeft.append(prev);
        }

        if (this.options.canFinish) {
          var finish = document.createElement('a');
          finish.setAttribute('role', 'button');
          finish.className = 'gg-card-action-finish';
          finish.textContent = 'end it now';
          finish.addEventListener('click', this.options.onFinish, false);
          footerCenter.append(finish);
        }

        var next = document.createElement('a');
        next.setAttribute('role', 'button');
        next.className = 'gg-card-action-next';
        next.textContent = 'Got it!';
        next.addEventListener('click', this.options.onNext, false);
        footerRight.append(next);
        var arrow = document.createElement('div');
        arrow.className = 'gg-card-arrow';
        card.append(content);
        card.append(footer);
        card.append(arrow);
        return card;
      }
      /**
       * Gets the coordinates of the anchor in the page.
       *
       * @return {Object}
       */

    }, {
      key: "getAnchorCoordinates",
      value: function getAnchorCoordinates() {
        var position = this.anchor.getBoundingClientRect();
        return {
          top: position.top + window.pageYOffset,
          left: position.left + window.pageXOffset
        };
      }
      /**
       * Add classes and styles to positioning the card element.
       */

    }, {
      key: "setCardInPosition",
      value: function setCardInPosition() {
        var anchorCoordinates = this.getAnchorCoordinates();

        switch (this.position) {
          case 'top':
          default:
            this.element.className += ' gg-card-top';
            this.element.style.left = anchorCoordinates.left - this.element.offsetWidth / 2 + this.anchor.offsetWidth / 2 + 'px';
            this.element.style.top = anchorCoordinates.top - this.element.offsetHeight - 15 + 'px';
            break;

          case 'right':
            this.element.className += ' gg-card-right';
            this.element.style.left = anchorCoordinates.left + this.anchor.offsetWidth + 15 + 'px';
            this.element.style.top = anchorCoordinates.top - this.element.offsetHeight / 2 + this.anchor.offsetHeight / 2 + 'px';
            break;

          case 'bottom':
            this.element.className += ' gg-card-bottom';
            this.element.style.left = anchorCoordinates.left - this.element.offsetWidth / 2 + this.anchor.offsetWidth / 2 + 'px';
            this.element.style.top = anchorCoordinates.top + this.anchor.offsetHeight + 15 + 'px';
            break;

          case 'left':
            this.element.className += ' gg-card-left';
            this.element.style.left = anchorCoordinates.left - this.element.offsetWidth - 15 + 'px';
            this.element.style.top = anchorCoordinates.top - this.element.offsetHeight / 2 + this.anchor.offsetHeight / 2 + 'px';
            break;
        }
      }
    }]);

    return GCard;
  }();

  var GGuide = /*#__PURE__*/function () {
    /**
     * @param {object} cards the cards of the guide
     * @param {object} options the client options
     *
     * @return {GGuide}
     */
    function GGuide(cards) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, GGuide);

      _defineProperty(this, "onNext", function () {
        _this.showNext();
      });

      _defineProperty(this, "onPrev", function () {
        _this.showPrev();
      });

      _defineProperty(this, "onFinish", function () {
        _this.end();
      });

      var defaults = {
        firstCard: 0,
        showPrev: true,
        canFinish: true
      };
      this.options = Object.assign({}, defaults, options);
      this.currentStep = typeof this.options.firstCard === 'string' ? parseInt(this.options.firstCard, 10) : this.options.firstCard;
      this.steps = this.createSteps(cards);
      this.onNext = this.onNext.bind(this);
      this.onPrev = this.onPrev.bind(this);
      this.onFinish = this.onFinish.bind(this);
      return this;
    }
    /**
     * Next card event callback.
     */


    _createClass(GGuide, [{
      key: "createSteps",

      /**
       * Create the steps based on the client's cards.
       *
       * @param {Object} cards the card object of the client
       * @return {Object[]}
       */
      value: function createSteps(cards) {
        var stepList = [];

        for (var i = 0; i < cards.length; i++) {
          var anchor = this.getAnchor(cards[i].selector);

          if (anchor) {
            var step = {};
            step.anchor = anchor;
            step.position = cards[i].position;
            step.content = cards[i].content;
            step.prev = stepList && stepList.length ? stepList[stepList.length - 1] : null;
            step.next = null;

            if (step.prev !== null) {
              step.prev.next = step;
            }

            var cardOptions = typeof cards[i].options !== 'undefined' ? cards[i].options : {};
            var canFinish = typeof cardOptions.canFinish !== 'undefined' ? cardOptions.canFinish : true;
            var defaults = {
              showPrev: this.options.showPrev ? step.prev !== null : false,
              canFinish: this.options.canFinish ? canFinish : false,
              cardStep: i,
              onNext: this.onNext,
              onPrev: this.onPrev,
              onFinish: this.onFinish
            };
            var options = Object.assign({}, defaults, cards[i].options);
            var card = new GCard(step.anchor, step.position, step.content, options);
            step.card = card;
            stepList.push(step);
          } else {
            console.warn("GGuide: The card with selector '" + cards[i].selector + "' was ignored since no DOM element was found.");
          }
        }

        return stepList;
      }
      /**
       * Starts the guide.
       *
       * @return {GGuide}
       */

    }, {
      key: "begin",
      value: function begin() {
        this.drawStep(this.steps[this.currentStep]);
        return this;
      }
      /**
       * Ends the guide.
       *
       * @return {GGuide}
       */

    }, {
      key: "end",
      value: function end() {
        this.removeStep(this.steps[this.currentStep]);
        this.currentStep = this.options.firstCard;

        if (typeof this.options.onFinish !== 'undefined' && typeof this.options.onFinish === 'function') {
          this.options.onFinish();
        }

        return this;
      }
      /**
       * Display the next card or end the guide.
       */

    }, {
      key: "showNext",
      value: function showNext() {
        var currentStep = this.steps[this.currentStep];

        if (this.steps[this.currentStep].next !== null) {
          var nextStep = this.currentStep += 1;
          this.removeStep(currentStep);
          this.drawStep(currentStep.next);
          this.currentStep = nextStep;

          if (typeof this.options.onNext !== 'undefined' && typeof this.options.onNext === 'function') {
            this.options.onNext(nextStep);
          }

          if (typeof this.options.onChange !== 'undefined' && typeof this.options.onChange === 'function') {
            this.options.onChange(nextStep);
          }
        } else {
          this.end();
        }
      }
      /**
       * Display the previous card if apply.
       */

    }, {
      key: "showPrev",
      value: function showPrev() {
        var currentStep = this.steps[this.currentStep];

        if (this.steps[this.currentStep].prev !== null) {
          var prevStep = this.currentStep -= 1;
          this.removeStep(currentStep);
          this.drawStep(currentStep.prev);
          this.currentStep = prevStep;

          if (typeof this.options.onPrev !== 'undefined' && typeof this.options.onPrev === 'function') {
            this.options.onPrev(prevStep);
          }

          if (typeof this.options.onChange !== 'undefined' && typeof this.options.onChange === 'function') {
            this.options.onChange(prevStep);
          }
        }
      }
      /**
       * Draws the card corresponding to the step.
       *
       * @param {Object} step the step that owns the card to draw
       */

    }, {
      key: "drawStep",
      value: function drawStep(step) {
        step.anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        document.body.append(step.card.getElement());
        step.card.setCardInPosition();
      }
      /**
       * Removes the card corresponding to the step.
       *
       * @param {Object} step the step that owns the card to remove
       */

    }, {
      key: "removeStep",
      value: function removeStep(step) {
        step.card.getElement().remove();
      }
      /**
       * Select a DOM element based on selector.
       *
       * @param {String} selector
       */

    }, {
      key: "getAnchor",
      value: function getAnchor(selector) {
        var anchor = document.getElementById(selector);

        if (typeof anchor != 'undefined' && anchor != null) {
          return anchor;
        }

        return false;
      }
    }]);

    return GGuide;
  }();

  return GGuide;

})));
//# sourceMappingURL=gg.js.map
