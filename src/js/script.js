import Form from "../components/form-element/formElement.js";
import TabButton from "../components/tabButton/tabButton.js";
import textInput from "../components/textInput/textInput.js";
import PricingPlan from "../components/pricing-plan/pricing-plan.js";
import AddOn from "../components/addOn/addOn.js";
import Switch from "../components/switch/switch.js";
import NextButton from "../components/nextButton/nextButton.js";
import PrevButton from "../components/prevButton/prevButton.js"
import Summary from "../components/summary/summary.js";
import { formData } from "./state.js";

customElements.define('form-element', Form, { extends: 'form' });
customElements.define("tab-button", TabButton);
customElements.define("text-input", textInput);
customElements.define("pricing-plan", PricingPlan);
customElements.define("switch-button", Switch);
customElements.define('add-on', AddOn);
customElements.define("next-button", NextButton, { extends: 'button' });
customElements.define("prev-button", PrevButton, { extends: 'button' });
customElements.define("summary-div", Summary);

document.querySelector('tab-button button').click();
