import { state } from "../../js/state.js";

class SubmitButton extends HTMLButtonElement {
    constructor() {
        super();
        this.type = 'submit';
        this.className = 'text-white bg-marine-blue ml-auto border-0 px-6 py-3 transition-all duration-300 rounded-md cursor-pointer hover:bg-purplish-blue active:scale-95';
    }

    connectedCallback() {
        this.addEventListener('click', this.#clickHandler);
    }

    #clickHandler(e) {
        e.preventDefault();
        if (state.tabIndex == '0') return;
        const form = document.querySelector("[is='form-element']");
        const inputs = form.querySelectorAll('text-input input');
        if (!([].reduce.call(inputs, (bool, el) => bool && el.checkValidity, true))) {
            form.setAttribute('data-tab', 0);
        } else {
            form.setAttribute('data-tab', '5');
        }
    } 
}

export default SubmitButton;