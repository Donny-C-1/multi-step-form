class Form extends HTMLFormElement {
    constructor() {
        super();
    }

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
    }
}

export default Form;