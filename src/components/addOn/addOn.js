import { addOns } from "../../js/state.js";

class AddOn extends HTMLElement {
    #index;
    #props;
    constructor(a) {
        super();
        this.#index = [].indexOf.call((a = this.parentElement, a.parentElement.children), a);
        this.#props = addOns[this.#index];
    }

    static observedAttributes = ["data-duration"];

    connectedCallback() {
        let { name: n, details: d } = this.#props, { monthly: pm } = this.#props.price;

        const html = `
        <label class='group flex relative mb-4'>
            <input class='peer absolute top-1/2 left-5' type="checkbox" name="" id="" value="" />
            <div class='flex w-full text-sm justify-between items-center gap-4 py-3 ps-12 pe-5 border-2 border-solid border-light-gray rounded-md cursor-pointer transition-all duration-300 peer-checked:border-purplish-blue group-hover:border-purplish-blue'>
                <div>
                    <p class='text-marine-blue font-medium mb-1'>${n}</p>
                    <p class='text-cool-gray'>${d}</p>
                </div>
                <p class='price | text-purplish-blue'>+$${pm}/mo</p>
            </div>
        </label>
        `
        this.innerHTML = html;
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        if (name == 'data-duration') this.#updateDuration(newValue);
    }

    #updateDuration(v) {
        const prefix = { monthly: 'mo', yearly: 'yr'};
        this.querySelector('.price').textContent = `+$${this.#props.price[v]}/${prefix[v]}`;
    }
}

export default AddOn;