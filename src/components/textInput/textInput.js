class textInput extends HTMLElement {
    #props;
    constructor() {
        self = super();
        this.#props = {
            validationMessage: 'This field is required'
        }
    }

    static observedAttributes = [ 'data-validate' ];

    connectedCallback() {
        Object.assign(this.#props, ...Array.from(this.querySelector('props').attributes, ({name, value}) => ({[name]: value})));

        this.#render();

        // * Add class
        this.className = 'group validate block mb-3';

        // * Add Events
        this.querySelector('input').addEventListener('focus', e => {
            const { currentTarget: t } = e;
            e.classList.add('peer');
            e.classList.add('invalid:border-strawberry-red');
        }, { once: true });
        this.querySelector('input').addEventListener('input', e => this.#inputHandler(e))
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        if (name === 'data-validate' && newValue == 'true') {
            this.querySelector('input').classList.add('peer');
            this.querySelector('input').classList.add('invalid:border-strawberry-red');
        }
    }

    #render() {
        this.innerHTML = `
        <label for='user-${this.#props.name}' class='block relative'>
            <span class='text-sm'>${this.#props.name}</span><span class='text-strawberry-red'>*</span>
            <input class='block w-full px-4 py-3 mt-1 rounded-md text-marine-blue border-2 border-solid border-light-gray cursor-pointer transition-all duration-300 text-sm hover:border-marine-blue outline-none group-[.validate]>&:invalid:border-strawberry-red' type='${this.#props.type}' placeholder='${this.#props.placeholder}' name='${this.#props.name}' id='user-${this.#props.name}' required class='text-3' />
            <span class='validation | hidden peer-invalid:block text-strawberry-red absolute top-0 right-0 font-medium w-max'>${this.#props.validationMessage}</span>
        </label>
        `;
    }

    #inputHandler(e) {
        const { currentTarget: t } = e;
        if (t.checkValidity()) {
            t.classList.remove('peer');
        } else {
            t.classList.add('peer');

            let errorType, errorMessage = 'Invalid input';
            for (let x in t.validity) {
                if (t.validity[x] == true) errorType = x;
            }
            if (errorType  === 'typeMismatch') {
                errorMessage = 'Invalid input format';
            }
            if (errorType === 'valueMissing') {
                errorMessage = 'This field is required';
            }
            this.#props.validationMessage = errorMessage;
            this.querySelector('.validation').innerHTML = errorMessage;
        }
    }
}

export default textInput;