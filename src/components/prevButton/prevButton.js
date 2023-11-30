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
            const tabBtns = document.querySelectorAll('tab-button');

            state.tabIndex--;

            document.querySelector('form').setAttribute('data-tab', state.tabIndex);
        })
    }
}

export default PrevButton;