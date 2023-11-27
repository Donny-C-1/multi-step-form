const formData = {
    name: '',
    mail: '',
    number: '',
    plan: 'arcade',
    duration: 'monthly',
    addOns: []
}

const plans = [
    {
        name: 'Arcade',
        price: {
            monthly: 9,
            yearly: 90
        }
    },
    {
        name: 'Advanced',
        price: {
            monthly: 12,
            yearly: 120
        }
    },
    {
        name: 'Pro',
        price: {
            monthly: 15,
            yearly: 150
        }
    }
];

const addOns = [
    {
        name: 'Online Service',
        details: 'Access to multiplayer games',
        price: {
            monthly: 1,
            yearly: 12
        }
    },
    {
        name: 'Larger Storage',
        details: 'Extra 1TB of cloud storage',
        price: {
            monthly: 2,
            yearly: 24
        }
    },
    {
        name: 'Customizable Profile',
        details: 'Custom theme on your profile',
        price: {
            monthly: 2,
            yearly: 24
        }
    }
]

const state = {
    tabIndex: 0
}

export { formData, plans, addOns, state };