import { state } from "../../js/state.js";

class TabButton extends HTMLElement {
    #index;
    #btnFunc
    constructor() {
        super();
        this.#btnFunc = this.#clickHandler.bind(this);
    }

    static observedAttributes = ['disabled', 'data-active' ];

    connectedCallback() {
        // * Add Attributes
        this.setAttribute('class', 'flex gap-3 items-center');

        // * Get Index
        let parent = this.parentElement, grandParent = parent.parentElement;
        this.#index = [].indexOf.call(grandParent.children, parent);

        const html = `
        <button type='button' class='bg-transparent text-white font-medium rounded-full px-3 aspect-square border-2 border-solid border-current hover:bg-light-blue hover:border-light-blue hover:text-marine-blue transition-all duration-300 active:scale-90 [&.active]:bg-light-blue [&.active]:text-marine-blue [&.active]:border-light-blue'>${this.#index + 1}</button>
        <div class="hidden md:block">
            <p class="text-sm text-cool-gray">Step ${this.#index + 1}</p>
            <p class="text-white font-medium uppercase text-sm">${this.textContent}</p>
          </div>
        `

        this.innerHTML = html;

        if (this.#index == 0) document.querySelector('button').classList.add('active');

        //* Add Events
        this.querySelector('button').addEventListener('click', this.#btnFunc);
    }

    attributeChangedCallback(name, oldvalue, newValue) {
        if (name === 'disabled' && newValue === 'true') this.#removeHandler();
        if (name === 'data-active') this.#setActive(newValue);
    }

    #clickHandler(e) {
        document.querySelector('form').setAttribute('data-tab', this.#index);
    }

    #removeHandler() {
        this.querySelector('button').removeEventListener('click', this.#btnFunc);
    }

    #setActive(val) {
        const btn = this.querySelector('button');
        if (val == 'true') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
}

export default TabButton;