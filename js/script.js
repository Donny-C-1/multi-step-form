"use strict"

const addOns = [
    {
        id: '001',
        name: 'Online Service',
        info: 'Access to multiplayer games',
        price: {
            monthly: 1,
            yearly: 3
        }
    },
    {
        id: '002',
        name: 'Larger Storage',
        info: 'Extra 1TB of cloud storage',
        price: {
            monthly: 2,
            yearly: 4
        }
    },
    {
        id: '003',
        name: 'Customizable Profile',
        info: 'Custom theme on your profile',
        price: {
            monthly: 2,
            yearly: 4
        }
    }
]

class FormTab {
    #form;
    #container;
    #tabs;
    #currentTab;
    #prevButton;
    #nextButton;
    #submitButton;
    #toggleButtons;
    #formData;
    #stillValidating;
    
    constructor(containerSelector, formName) {
        this.#container = document.querySelector(containerSelector);
        this.#form = document.forms[formName];
        this.tabIndex = 0;
        this.#tabs = this.#container.querySelectorAll("[data-name='tab']");
        this.#currentTab = null;
        this.#prevButton = this.#container.querySelector("[data-toggle='prev']");
        this.#nextButton = this.#container.querySelector("[data-toggle='next']");
        this.#submitButton = this.#container.querySelector("button[type='submit']");
        this.#toggleButtons = this.#container.querySelectorAll("[data-toggle='tab']");
        this.#stillValidating = true;
        this.#formData = {
            name: '',
            mail: '',
            number: '',
            plan: 'arcade',
            duration: 'monthly',
            addOns: [],
        };
    }

    #dispTab(tabIndex) {
        if (tabIndex < 0 || tabIndex >= this.#tabs.length) return 'invalid tabIndex';
        if (this.#nextButton.hasAttribute('hidden')) {
            this.#nextButton.removeAttribute('hidden');
            this.#submitButton.setAttribute('hidden', true);
        }
        if (tabIndex === this.#tabs.length - 1) {
            this.#nextButton.setAttribute('hidden', true);
            this.#submitButton.removeAttribute('hidden');
            this.#loadSummary();
        }
        if (tabIndex == 2) {
            this.#loadAddOns();
        }
        this.#toggleButtons.forEach(el => el.classList.remove('active'));
        this.#toggleButtons[tabIndex].classList.add('active');
        tabIndex === 0 ? this.#prevButton.setAttribute('hidden', true) : this.#prevButton.removeAttribute('hidden');
        this.#currentTab?.setAttribute('hidden', true);
        this.#tabs[tabIndex].removeAttribute('hidden');
        this.#currentTab = this.#tabs[tabIndex];
        this.tabIndex = tabIndex;
        return true;
    }

    #loadPlan() {
        //
    }

    #loadAddOns() {
        console.log(this.#formData);
        this.#container.querySelector('.add-ons').setAttribute("data-duration", this.#formData.duration);
    }
    
    #loadSummary() {
        const summaryPage = this.#container.querySelector('.summary');
        const { plan: p, duration: d } = this.#formData;

        summaryPage.querySelector("[data-placeholder='subscription']").textContent = `${this.#formData.plan} (${this.#formData.duration})`;
        summaryPage.querySelector('.sub-price').textContent = this.#getSubPrice();

        if (this.#formData.addOns.length > 0) {
            const docFrag = document.createDocumentFragment();
            const addOnTemplate = summaryPage.querySelector('.addOn-template');
            
            docFrag.appendChild(addOnTemplate);
            for (let idString of this.#formData.addOns) {
                const addOnElement = addOnTemplate.content.children[0].cloneNode(true);
                const addOn = addOns.find(item => item.id === idString);

                addOnElement.getElementsByClassName('name')[0].textContent = addOn.name;
                addOnElement.getElementsByClassName('price')[0].textContent = this.#formData.duration == 'monthly' ? `+$${addOn.price.monthly}/mo` : `+$${addOn.price.yearly}/yr`;
                docFrag.appendChild(addOnElement);
            }
            document.querySelector(".total .price").textContent = `+$${this.#getTotalPrice()}/${this.#formData.duration == 'monthly' ? '/mo' : 'yr'}`;
            const container = summaryPage.getElementsByClassName('addOns')[0];
            container.innerHTML = "";
            container.appendChild(docFrag);
        }
    }

    #setupInfo() {
        const infoSection = this.#container.querySelector('.personal-info');
        const inputs = infoSection.querySelectorAll('input');
        inputs.forEach(el => el.addEventListener('blur', e => {
            el.setAttribute('data-validate', true);
        }, { once: true }))
    }

    #setupPlan() {
        const planSection = this.#container.querySelector('.pricing');
        const planInputs = planSection.querySelectorAll("[name='pricing-plan']");
        const switchRadios = planSection.querySelectorAll('.switch');
        switchRadios.forEach(el => el.onclick = e => {
            this.#formData.duration = e.target.value;
            planSection.setAttribute("data-duration", e.target.value);
        });
        planInputs.forEach(el => el.onclick = e => {
            this.#formData.plan = e.target.value;
        });
    }

    #setupAddOns() {
        const aoSection = this.#container.querySelector('.add-ons');
        const addOns = aoSection.querySelectorAll('input');

        addOns.forEach(el => {
            if (el.checked) this.#formData.addOns.push(el.dataset.id);
            el.oninput = e => {
                const { currentTarget: t } = e;
                if (t.checked == true) {
                    this.#formData.addOns.push(t.dataset.id);
                } else {
                    this.#formData.addOns = this.#formData.addOns.filter(v => v !== t.dataset.id);
                }
            }
        })
    }

    #setupSummary() {
        const summaryPage = this.#container.querySelector('.summary');
        const change = summaryPage.querySelector('button.change');
        change.onclick = e => this.#dispTab(1);
    }


    #getSubPrice() {
        const { plan: p, duration: d } = this.#formData;
        let price = p === 'pro' ? 15 : p === 'advanced' ? 12 : 9;
        return d === 'yearly' ? `+$${price*10}/yr` : `+$${price}/mo`
    }

    #getTotalPrice() {
        const { plan: p, duration: d } = this.#formData;
        const subscriptionPrice = p === 'pro' ? 15 : p === 'advanced' ? 12 : 9;
        return this.#formData.addOns.reduce((t, v) => t + addOns.find(a => a.id == v).price[d], 0) + subscriptionPrice;
    }

    init() {
        this.#toggleButtons.forEach((btn, i) => btn.onclick = e => this.#stillValidating && this.#dispTab(i));
        this.#nextButton.onclick = e => this.#stillValidating && this.#validateSection() && this.#dispTab(this.tabIndex + 1);
        this.#prevButton.onclick = e => this.#stillValidating && this.#dispTab(this.tabIndex - 1);
        this.#form.onsubmit = e => this.#stillValidating && this.#submit(e);

        this.#setupInfo();
        this.#setupPlan();
        this.#setupAddOns();
        this.#setupSummary();

        this.#toggleButtons[0].click();
    }

    #submit(e) {
        e.preventDefault();

        this.#stillValidating = false;
        this.#submitButton.setAttribute('hidden', true);
        this.#prevButton.setAttribute('hidden', true);
        const a = new FormData(e.target);
        const conclusion = this.#container.querySelector('.conclusion');
        this.#currentTab.setAttribute('hidden', true);
        conclusion.removeAttribute('hidden');
        console.log(a);
    }

    #validateSection() {
        const section = this.#container.querySelectorAll('.tab')[this.tabIndex];
        const inputs = section.querySelectorAll('input');
        let isValid = true;
        inputs.forEach(el => {
            if (!el.checkValidity()) {
                el.setAttribute('data-validate', true);
                isValid = false;
            }
        })
        return isValid;
    }
}

const gameForm = new FormTab('main', 'gaming-subscription');
gameForm.init();

// https://youtu.be/bOdJA1mVuCE?si=aEljwS1eaC3AJoZJ