class textInput extends HTMLElement {
    constructor() {
        self = super();
    }

    connectedCallback() {
        const { placeholder: ph, type: ty, name: n } = Object.assign({},
            ...Array.from(this.querySelector('props').attributes, ({name, value}) => ({[name]: value}))
            );

        const html = `
        <label for='user-${n}' class='block relative'>
            <span class='text-sm'>${n}</span>
            <input class='block w-full px-4 py-3 mt-1 rounded-md text-marine-blue border-2 border-solid border-light-gray cursor-pointer transition-all duration-300 text-sm hover:border-marine-blue' type='${ty}' placeholder='${ph}' name='${n}' id='user-${n}' required class='text-3' />
            <span class='validation | hidden peer-invalid:block text-strawberry-red absolute top-0 right-0 font-medium w-max'>This field is required</span>
        </label>
        `;

        this.innerHTML = html;

        // * Add class
        this.setAttribute('class', 'block mb-3')

        // * Add Events
        this.querySelector('input').addEventListener('blur', (e) => {
            e.target.className += ' peer invalid:border-strawberry-red';
        }, { once: true })
    }
}

export default textInput;