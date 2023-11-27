class Summary extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        //* Add HTML
        const html = `
        <div class='p-4 bg-magnolia'>
            <div class='flex justify-between items-center'>
                <div>
                    <h4 class='capitalize text-base text-marine-blue'>Arcade (<span>Monthly</span>)</h4>
                    <button class='text-sm underline text-cool-gray transition-all duration-300 hover:text-purplish-blue cursor-pointer' type='button'>Change</button>
                </div>
                <p class='text-marine-blue font-medium'>$9/mo</p>
            </div>
            <hr class='my-8' />
            <ul></ul>
        </div>
        <div class='flex justify-between px-4 py-8'>
            <p class='text-cool-gray text-sm'>Total (per <span>Month</span>) </p>
            <p class='text-purplish-blue font-medium'>+$12/mo</p>
        </div>
        `
        this.innerHTML = html;

        // * Add Attributes
        this.setAttribute('class', 'block');
    }
}

export default Summary;