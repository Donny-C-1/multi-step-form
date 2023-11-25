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
]

export { formData, plans };