export class GCard {
    /**
     * @param {Object} anchor the element to point to
     * @param {String} position the position of the card, relative to anchor
     * @param {String} content the text of the card
     * @param {Object} options the options
     */
    constructor(anchor, position, content, options = {}) {
        const defaults = {
            showPrev: true,
            canFinish: true,
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
    getElement() {
        return this.element;
    }

    /**
     * Creates the DOM element representing the card.
     */
    createElement() {
        const card = document.createElement('div');
        card.className = 'gg-card';

        const content = document.createElement('div');
        content.className = 'gg-card-content';
        content.innerHTML = this.content;

        const footer = document.createElement('div');
        footer.className = 'gg-card-footer';

        const footerLeft = document.createElement('div');
        footerLeft.className = 'gg-card-footer-left';

        const footerCenter = document.createElement('div');
        footerCenter.className = 'gg-card-footer-center';

        const footerRight = document.createElement('div');
        footerRight.className = 'gg-card-footer-right';

        footer.append(footerLeft);
        footer.append(footerCenter);
        footer.append(footerRight);

        if (this.options.showPrev) {
            const prev = document.createElement('a');
            prev.setAttribute('role', 'button');
            prev.textContent = '<< prev';
            prev.addEventListener('click', this.options.onPrev, false);

            footerLeft.append(prev);
        }

        if (this.options.canFinish) {
            const finish = document.createElement('a');
            finish.setAttribute('role', 'button');
            finish.className = 'gg-card-action-finish';
            finish.textContent = 'end it now';

            finish.addEventListener('click', this.options.onFinish, false);

            footerCenter.append(finish);
        }

        const next = document.createElement('a');
        next.setAttribute('role', 'button');
        next.className = 'gg-card-action-next';
        next.textContent = 'Got it!';
        next.addEventListener('click', this.options.onNext, false);

        footerRight.append(next);

        const arrow = document.createElement('div');
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
    getAnchorCoordinates() {
        const position = this.anchor.getBoundingClientRect();

        return {
            top: position.top + window.pageYOffset,
            left: position.left + window.pageXOffset,
        };
    }

    /**
     * Add classes and styles to positioning the card element.
     */
    setCardInPosition() {
        const anchorCoordinates = this.getAnchorCoordinates();

        switch (this.position) {
            case 'top':
            default:
                this.element.className += ' gg-card-top';
                this.element.style.left =
                    anchorCoordinates.left -
                    this.element.offsetWidth / 2 +
                    this.anchor.offsetWidth / 2 +
                    'px';
                this.element.style.top =
                    anchorCoordinates.top - this.element.offsetHeight - 15 + 'px';
                break;
            case 'right':
                this.element.className += ' gg-card-right';
                this.element.style.left =
                    anchorCoordinates.left + this.anchor.offsetWidth + 15 + 'px';
                this.element.style.top =
                    anchorCoordinates.top -
                    this.element.offsetHeight / 2 +
                    this.anchor.offsetHeight / 2 +
                    'px';
                break;
            case 'bottom':
                this.element.className += ' gg-card-bottom';
                this.element.style.left =
                    anchorCoordinates.left -
                    this.element.offsetWidth / 2 +
                    this.anchor.offsetWidth / 2 +
                    'px';
                this.element.style.top =
                    anchorCoordinates.top + this.anchor.offsetHeight + 15 + 'px';
                break;
            case 'left':
                this.element.className += ' gg-card-left';
                this.element.style.left =
                    anchorCoordinates.left - this.element.offsetWidth - 15 + 'px';
                this.element.style.top =
                    anchorCoordinates.top -
                    this.element.offsetHeight / 2 +
                    this.anchor.offsetHeight / 2 +
                    'px';
                break;
        }
    }
}
