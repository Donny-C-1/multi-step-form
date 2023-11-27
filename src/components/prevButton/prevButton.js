import { state } from "../../js/state.js";

class PrevButton extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        //* Add Class
        this.setAttribute('class', 'text-cool-gray border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:text-marine-blue active:scale-95')
        this.setAttribute('type', 'button');
        this.setAttribute('hidden', true);

        //* Add Events
        this.addEventListener('click', () => {
            const tabs = document.querySelectorAll('.tab');
            state.tabIndex--;
            if (state.tabIndex == 0) {
                this.setAttribute('hidden', true);
            }
            if (state.tabIndex == 2) {
                this.nextElementSibling.removeAttribute('hidden');
                this.nextElementSibling.nextElementSibling.setAttribute('hidden', true);
            }
            tabs.forEach(el => el.setAttribute('hidden', true));
            tabs[state.tabIndex].removeAttribute('hidden');
        })
    }
}

export default PrevButton;