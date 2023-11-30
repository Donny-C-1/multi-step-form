class Form extends HTMLFormElement {
    constructor() {
        super();
    }

    static observedAttributes = [ 'data-tab' ];

    connectedCallback() {
        // * Add Events
        this.addEventListener('submit', this.#submitHandler);
    }

    #submitHandler(e) {
        e.preventDefault();

        const tabs = this.querySelectorAll('.tab');
        tabs.forEach(el => el.setAttribute('hidden', true));
        this.querySelector('.conclusion').removeAttribute('hidden');
        this.querySelector('.controls').setAttribute('hidden', true);
        this.querySelector('.controls').classList.add('hidden');
        document.querySelectorAll('tab-button').forEach(el => el.setAttribute('disabled', true));
    }

    attributeChangedCallback(name, _oldvalue, newValue) {
        if (name == 'data-tab') this.#displayTab(newValue);
    }

    #displayTab(index) {
        const tabs = this.querySelectorAll('.tab');
        const prevBtn = this.querySelector("[is='prev-button']");
        const nextBtn = this.querySelector("[is='next-button']");
        const submitBtn = this.querySelector("button[type='submit']");
        const tabBtns = document.querySelectorAll('tab-button');

        tabs.forEach(el => el.setAttribute('hidden', true));
        tabs[index].removeAttribute('hidden');

        tabBtns.forEach(el => el.setAttribute('data-active', false));
        tabBtns[index].setAttribute('data-active', true);

        if (index === '0') {
            prevBtn.setAttribute('hidden', true);
        } else {
            prevBtn.removeAttribute('hidden');
        }
        if (index === '3') {
            nextBtn.setAttribute('hidden', true);
            submitBtn.removeAttribute('hidden');
        } else {
            nextBtn.removeAttribute('hidden');
            submitBtn.setAttribute('hidden', true);
        }
    }
}

export default Form;