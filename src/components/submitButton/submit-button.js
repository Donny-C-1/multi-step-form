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
        const form = document.querySelector("[is='form-element']");
        const inputs = form.querySelectorAll('text-input input');
        let bool = true;

        inputs.forEach(el => bool = bool && el.checkValidity());
        if (bool == false) {
            form.setAttribute('data-tab', 0);
        } else {
            form.submit();
        }
    }
}

export default SubmitButton;