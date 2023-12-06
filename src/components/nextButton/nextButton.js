import { state } from "../../js/state.js";

class NextButton extends HTMLButtonElement {
    constructor() {
        super();
        this.className = 'text-white bg-marine-blue ml-auto border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:bg-purplish-blue active:scale-95';
        this.type = 'button';
    }

    connectedCallback() {
        // * Add Events
        this.addEventListener('click', () => {
            document.querySelector('form').setAttribute('data-tab', Number(state.tabIndex) + 1);
        })
    }
}

export default NextButton;