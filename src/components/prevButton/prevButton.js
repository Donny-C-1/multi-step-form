import { state } from "../../js/state.js";

class PrevButton extends HTMLButtonElement {
    constructor() {
        super();
        this.className = 'text-cool-gray border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:text-marine-blue active:scale-95';
        this.type = 'button';
    }

    connectedCallback() {
        //* Add Attributes
        this.setAttribute('hidden', true);

        //* Add Events
        this.addEventListener('click', () => {
            document.querySelector('form').setAttribute('data-tab', Number(state.tabIndex) - 1);
        })
    }
}

export default PrevButton;