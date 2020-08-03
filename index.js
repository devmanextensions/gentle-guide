import { GCard } from './src/Card';

export default class GGuide {
    /**
     * @param {object} cards the cards of the guide
     * @param {object} options the client options
     *
     * @return {GGuide}
     */
    constructor(cards, options = {}) {
        const defaults = {
            firstCard: 0,
            showPrev: true,
            canFinish: true,
        };

        this.options = Object.assign({}, defaults, options);

        this.currentStep = this.options.firstCard;
        this.steps = this.createSteps(cards);

        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onFinish = this.onFinish.bind(this);

        return this;
    }

    /**
     * Next card event callback.
     */
    onNext = () => {
        this.showNext();
    };

    /**
     * Prev card event callback.
     */
    onPrev = () => {
        this.showPrev();
    };

    /**
     * Finish guide event callback.
     */
    onFinish = () => {
        this.end();
    };

    /**
     * Create the steps based on the client's cards.
     *
     * @param {Object} cards the card object of the client
     * @return {Object[]}
     */
    createSteps(cards) {
        const stepList = [];

        for (let i = 0; i < cards.length; i++) {
            const step = {};

            step.anchor = this.getAnchor(cards[i].selector);
            step.position = cards[i].position;
            step.content = cards[i].content;

            step.prev = i > 0 ? stepList[i - 1] : null;
            step.next = null;
            if (step.prev !== null) {
                step.prev.next = step;
            }

            const cardOptions = typeof cards[i].options !== 'undefined' ? cards[i].options : {};

            const canFinish =
                typeof cardOptions.canFinish !== 'undefined' ? cardOptions.canFinish : true;

            const defaults = {
                showPrev: this.options.showPrev ? step.prev !== null : false,
                canFinish: this.options.canFinish ? canFinish : false,
                cardStep: i,
                onNext: this.onNext,
                onPrev: this.onPrev,
                onFinish: this.onFinish,
            };

            const options = Object.assign({}, defaults, cards[i].options);

            const card = new GCard(step.anchor, step.position, step.content, options);
            step.card = card;

            stepList.push(step);
        }

        return stepList;
    }

    /**
     * Starts the guide.
     *
     * @return {GGuide}
     */
    begin() {
        this.drawStep(this.steps[this.currentStep]);

        return this;
    }

    /**
     * Ends the guide.
     *
     * @return {GGuide}
     */
    end() {
        this.removeStep(this.steps[this.currentStep]);
        this.currentStep = this.options.firstCard;

        if (
            typeof this.options.onFinish !== 'undefined' &&
            typeof this.options.onFinish === 'function'
        ) {
            this.options.onFinish();
        }

        return this;
    }

    /**
     * Display the next card or end the guide.
     */
    showNext() {
        const currentStep = this.steps[this.currentStep];

        if (this.steps[this.currentStep].next !== null) {
            this.removeStep(currentStep);
            this.drawStep(currentStep.next);

            this.currentStep += 1;
        } else {
            this.end();
        }
    }

    /**
     * Display the previous card if apply.
     */
    showPrev() {
        const currentStep = this.steps[this.currentStep];

        if (this.steps[this.currentStep].prev !== null) {
            this.removeStep(currentStep);
            this.drawStep(currentStep.prev);

            this.currentStep -= 1;
        }
    }

    /**
     * Draws the card corresponding to the step.
     *
     * @param {Object} step the step that owns the card to draw
     */
    drawStep(step) {
        step.anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
        });
        document.body.append(step.card.getElement());

        step.card.setCardInPosition();
    }

    /**
     * Removes the card corresponding to the step.
     *
     * @param {Object} step the step that owns the card to remove
     */
    removeStep(step) {
        step.card.getElement().remove();
    }

    /**
     * Select a DOM element based on selector.
     *
     * @param {String} selector
     */
    getAnchor(selector) {
        const anchor = document.getElementById(selector);

        return anchor;
    }
}
