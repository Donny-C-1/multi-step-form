class textInput extends HTMLInputElement {
    constructor() {
        self = super();
    }

    connectedCallback() {
        console.log(this);
    }
}

export default textInput;