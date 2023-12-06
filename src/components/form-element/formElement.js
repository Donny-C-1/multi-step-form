import { state } from "../../js/state.js";

class Form extends HTMLFormElement {
    constructor() {
        super();
    }

    static observedAttributes = [ 'data-tab' ];

    connectedCallback() {
    }

    attributeChangedCallback(name, oldvalue, newValue) {
        if (name == 'data-tab') {
            if (oldvalue && state.tabIndex == '0' && this.#validate() == false) {
                this.querySelectorAll('text-input').forEach(el => el.setAttribute('data-validate', true));
                return;
            }
            this.#displayTab(newValue);
        }
    }

    #displayTab(index) {
        const tabs = this.querySelectorAll('.tab');
        const prevBtn = this.querySelector("[is='prev-button']");
        const nextBtn = this.querySelector("[is='next-button']");
        const submitBtn = this.querySelector("button[type='submit']");
        const tabBtns = document.querySelectorAll('tab-button');

        state.tabIndex = index;

        if (index === '5') {
            tabs.forEach(el => el.setAttribute('hidden', true));
            this.querySelector('.conclusion').removeAttribute('hidden');
            this.querySelector('.controls').setAttribute('hidden', true);
            this.querySelector('.controls').classList.add('hidden');
            tabBtns.forEach(el => el.setAttribute('disabled', true));
            return;
        }
        console.log(tabs);
        console.log(index);
        tabs.forEach(el => el.setAttribute('hidden', true));
        tabs[index].removeAttribute('hidden');

        tabBtns.forEach(el => el.setAttribute('data-active', false));
        tabBtns[index].setAttribute('data-active', true);

        if (index === '0') {
            prevBtn.setAttribute('hidden', true);
        } else {
            prevBtn.removeAttribute('hidden');
        }
        if (index === '3') {
            nextBtn.setAttribute('hidden', true);
            submitBtn.removeAttribute('hidden');
        } else {
            nextBtn.removeAttribute('hidden');
            submitBtn.setAttribute('hidden', true);
        }
    }

    #validate() {
        return [].reduce.call(this.querySelectorAll('text-input input'), (bool, el) => bool && el.checkValidity(), true);
    }
}

export default Form;