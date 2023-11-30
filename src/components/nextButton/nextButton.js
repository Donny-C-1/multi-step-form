import { state } from "../../js/state.js";

class NextButton extends HTMLButtonElement {
    constructor() {
        super();
        this.className = 'text-white bg-marine-blue ml-auto border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:bg-purplish-blue active:scale-95';
        this.type = 'button';
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            let bool = true;
            document.querySelectorAll('text-input input').forEach(el => bool = bool && el.checkValidity());
            if (state.tabIndex == '0' && bool == false) return;
            state.tabIndex++;
            document.querySelector('form').setAttribute('data-tab', state.tabIndex);

        })
    }
}

export default NextButton;