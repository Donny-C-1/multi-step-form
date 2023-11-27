import { state } from "../../js/state.js";

class NextButton extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('class', 'text-white bg-marine-blue ml-auto border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:bg-purplish-blue active:scale-95');
        this.textContent = 'Next Step';
        this.setAttribute('type', 'button');

        this.addEventListener('click', () => {
            const tabs = document.querySelectorAll('.tab');
            state.tabIndex++;
            if (state.tabIndex == 1) {
                this.previousElementSibling.removeAttribute('hidden');
            }
            if (state.tabIndex == 3) {
                this.setAttribute('hidden', true);
                this.nextElementSibling.removeAttribute('hidden');
            }

            tabs.forEach(el => el.setAttribute('hidden', true));
            tabs[state.tabIndex].removeAttribute('hidden');
        })
    }
}

export default NextButton;