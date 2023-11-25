class wordCount extends HTMLParagraphElement {
    constructor() {
        super();
    }
}

class popUpInfo extends HTMLElement {
    static observedAttributes = ["color", "size"];
    constructor() {
        super();
    }
    
    connectedCallback() {
        console.log("popUpInfo added to the page");
    }

    disconnectedCallback() {
        console.log("popUpInfo removed from the page");
    }
    
    adoptedCallback() {
        console.log("popUnInfo moved to a new document");
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        console.log("An attribute has been changed");
    }
}

customElements.define("popup-info", popUpInfo)