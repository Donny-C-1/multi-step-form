import { state } from "../../js/state.js";

class TabButton extends HTMLElement {
    #index;
    constructor() {
        super();
    }

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
        this.querySelector('button').addEventListener('click', () => {
            state.tabIndex = this.#index;

            const tabBtns = document.querySelectorAll('tab-button button');
            const tabs = document.querySelectorAll('.tab');
            const prevBtn = document.querySelector("[is='prev-button']");
            const nextBtn = document.querySelector("[is='next-button']");
            const submitBtn = nextBtn.nextElementSibling;

            if (this.#index == 0) {
                prevBtn.setAttribute('hidden', true);
            } else {
                prevBtn.removeAttribute('hidden');
            }
            if (this.#index == 3) {
                nextBtn.setAttribute('hidden', true);
                submitBtn.removeAttribute('hidden');
            } else {
                nextBtn.removeAttribute('hidden');
                submitBtn.setAttribute('hidden', true);
            }

            tabs.forEach(el => el.setAttribute('hidden', true));
            tabs[this.#index].removeAttribute('hidden');

            tabBtns.forEach(el => el.classList.remove('active'));
            tabBtns[this.#index].classList.add('active');
        })
    }

    #removeHandler() {
        //
    }
}

export default TabButton;