import { plans } from "../../js/state.js";

const props = {
    duration: 'monthly',
    prefix: 'mo',
    plan: 'arcade',
    planPrice: '9',
    addOns: []
}

class Summary extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ['data-duration', 'data-plan'];

    connectedCallback() {
        //* Add HTML
        this.#updateHTML();

        // * Add Attributes
        this.className = 'block';
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === 'data-duration') {
            props.duration = newValue;
            props.prefix = newValue === 'monthly' ? 'mo' : 'yr';
        }
        if (name === 'data-plan') {
            props.plan = newValue;
        }
        const plan = plans.find(obj => obj.name.toLowerCase() === props.plan.toLowerCase());
        props.planPrice = plan.price[props.duration];
        this.#updateHTML();
    }

    updateState(name, value, bool) {
        if (name == 'add-on') {
            if (bool == true) {
                props.addOns.push(value);
            } else {
                props.addOns = props.addOns.filter(obj => obj.name.toLowerCase() !== value.name.toLowerCase());
            }
        }
        this.#updateHTML();
    }

    #updateHTML() {
        this.innerHTML = `
        <div class='p-4 bg-alabaster'>
            <div class='flex justify-between items-center'>
                <div>
                    <h4 class='capitalize text-base text-marine-blue'>${props.plan} (<span>${props.duration}</span>)</h4>
                    <button class='text-sm underline text-cool-gray transition-all duration-300 hover:text-purplish-blue cursor-pointer' type='button'>Change</button>
                </div>
                <p class='text-marine-blue font-medium'>$${props.planPrice}/${props.prefix}</p>
            </div>
            <hr class='mt-8 mb-4' />
            <ul>
            ${props.addOns.reduce((text, obj) => text + this.#genAddOnLi(obj), '')}
            </ul>
        </div>
        <div class='flex justify-between px-4 py-8'>
            <p class='text-cool-gray text-sm'>Total (per <span class='capitalize'>${props.duration.slice(0, -2)}</span>) </p>
            <p class='text-purplish-blue font-medium'>+$${Number(props.planPrice) + props.addOns.reduce((total, obj) => total + Number(obj.price[props.duration]), 0)}/${props.prefix}</p>
        </div>
        `;
    }

    #genAddOnLi(obj) {
        return `
        <li class='flex justify-between mb-4'>
            <p class='text-cool-gray'>${obj.name}</p>
            <p class='text-marine-blue text-sm'>+$${obj.price[props.duration]}/${props.prefix}</p>
        </li>
        `
    }
}

export default Summary;