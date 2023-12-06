import { formData, plans } from "../../js/state.js";

class PricingPlan extends HTMLElement {
    #name;
    #imgSrc;
    #props;
    constructor() {
        super();
        this.#name = this.querySelector('span').innerText;
        this.#imgSrc = this.querySelector('img').src;
        this.#props = plans.find(v => v.name.toLowerCase() === this.#name.toLowerCase());
    }
    
    connectedCallback() {
        // *Make the input element
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('name', 'pricing-plan');
        inputElement.setAttribute('class', 'peer hidden');
        inputElement.setAttribute('id', this.#name+'-pricing-plan');
        inputElement.addEventListener('input', () => this.updatePlan());
        if (this.hasAttribute('checked')) inputElement.setAttribute('checked', true);

        const text = `
        <label for="${this.#name}-pricing-plan" class="block h-full">
            <div class="peer-checked:border-marine-blue flex items-center gap-3 border-2 border-light-gray border-solid hover:border-marine-blue rounded-md p-5 cursor-pointer transition-all md:flex-col md:items-start md:justify-space-between md:flex-1">
                <img src="${this.#imgSrc}" alt="" />
                <div>
                    <p class="text-marine-blue font-medium capitalize">${this.#name}</p>
                    <p class="price | text-cool-gray my-2">$${this.#props.price.monthly}/mo<p class="discount | text-marine-blue text-sm" hidden>2 months free</p>
        </label>
        `

        //* Add Attributes
        this.setAttribute('class', "basis-1/3 block mb-4 grow rounded-xl");

        //* Add to the DOM
        this.innerHTML = text;
        this.querySelector('label').insertAdjacentElement("afterbegin", inputElement)
    }

    updatePlan() {
        document.querySelector('summary-div').setAttribute('data-plan', this.#name);
        formData.plan = this.#name;
    }

    updateDuration(duration) {
        const discount = this.querySelector('.discount');
        const amount = this.querySelector('.price');
        if (duration === 'yearly') {
            discount.removeAttribute("hidden");
            amount.textContent = `$${this.#props.price[duration]}/yr`;
        } else {
            discount.setAttribute("hidden", true);
            amount.textContent = `$${this.#props.price[duration]}/mo`;
        }
    }
}

export default PricingPlan;