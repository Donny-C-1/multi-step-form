import { formData } from "../../js/state.js";

class Switch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const html = `
        <div class="flex gap-3 justify-center items-center p-0 text-cool-gray">
            <span class="">Monthly</span>
            <div class="">
                <input class="peer/i1" type="radio" name="subscription-plan-duration" id="radio-switch-1" value="monthly" checked />
                <input class="peer/i2" type="radio" name="subscription-plan-duration" id="radio-switch-2" value="yearly" />
                <div class="flex relative items-center rounded-3xl overflow-hidden bg-marine-blue w-10 h-6 peer-checked/i1:[--left:9%] peer-checked/i1:[--l1-zIndex:1] peer-checked/i1:[--l2-zIndex:2] peer-checked/i2:[--left:46%] peer-checked/i2:[--l1-zIndex:2] peer-checked/i2:[--l2-zIndex:1]">
                    <label for="radio-switch-1" class="absolute inset-0 p-0 m-0 bg-transparent cursor-pointer z-[--l1-zIndex]"></label>
                    <label for="radio-switch-2" class="absolute inset-0 p-0 m-0 bg-transparent cursor-pointer z-[--l2-zIndex]"></label>
                    <div class="absolute w-5/12 aspect-square rounded-full bg-white transition-all duration-300 left-[--left]"></div>
                </div>
            </div>
            <span class="">Yearly</span>
        </div>
        `
        this.innerHTML = html;

        //* Add Event Listener
        this.querySelectorAll('input').forEach(el => el.addEventListener('input', (e) => {
            formData.duration = e.target.value;
            [].forEach.call(document.getElementsByTagName("pricing-plan"), (pEl) => pEl.updateDuration(e.target.value));
        }));
    }
}

export default Switch;