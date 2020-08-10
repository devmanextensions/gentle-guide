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

        this.currentStep =
            typeof this.options.firstCard === 'string'
                ? parseInt(this.options.firstCard, 10)
                : this.options.firstCard;

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
            const anchor = this.getAnchor(cards[i].selector);

            if (anchor) {
                const step = {};

                step.anchor = anchor;
                step.position = cards[i].position;
                step.content = cards[i].content;

                step.prev = stepList && stepList.length ? stepList[stepList.length - 1] : null;
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
            } else {
                console.warn(
                    "GGuide: The card with selector '" +
                        cards[i].selector +
                        "' was ignored since no DOM element was found."
                );
            }
        }

        return stepList;
    }

    /**
     * Starts the guide.
     *
     * @return {GGuide}
     */
    begin() {
        if (this.steps.length <= 0) {
            console.info('GGuide: Nothing to show, add some cards.');

            return;
        }

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
            const nextStep = (this.currentStep += 1);

            this.removeStep(currentStep);
            this.drawStep(currentStep.next);

            this.currentStep = nextStep;

            if (
                typeof this.options.onNext !== 'undefined' &&
                typeof this.options.onNext === 'function'
            ) {
                this.options.onNext(nextStep);
            }

            if (
                typeof this.options.onChange !== 'undefined' &&
                typeof this.options.onChange === 'function'
            ) {
                this.options.onChange(nextStep);
            }
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
            const prevStep = (this.currentStep -= 1);

            this.removeStep(currentStep);
            this.drawStep(currentStep.prev);

            this.currentStep = prevStep;

            if (
                typeof this.options.onPrev !== 'undefined' &&
                typeof this.options.onPrev === 'function'
            ) {
                this.options.onPrev(prevStep);
            }

            if (
                typeof this.options.onChange !== 'undefined' &&
                typeof this.options.onChange === 'function'
            ) {
                this.options.onChange(prevStep);
            }
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
        const anchor = document.querySelector(selector);

        if (typeof anchor != 'undefined' && anchor != null) {
            return anchor;
        }

        return false;
    }
}
