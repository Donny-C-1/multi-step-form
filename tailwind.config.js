/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js}", "*.{html, js}", "./src/components/*/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        sideNavDesktop: "url('../assets/images/bg-sidebar-desktop.svg')",
        sideNavMobile: "url('../assets/images/bg-sidebar-mobile.svg')"
      },
      colors: {
        "marine-blue": "hsl(213, 96%, 18%)",
        "purplish-blue": "hsl(243, 100%, 62%)",
        "pastel-blue": "hsl(228, 100%, 84%)",
        "light-blue": "hsl(206, 94%, 87%)",
        "cool-gray": "hsl(231, 11%, 63%)",
        "light-gray": "hsl(229, 24%, 87%)",
        "magnolia": "hsl(217, 100%, 97%)",
        "alabaster": "hsl(231, 100%, 99%)",
      }
    },
  },
  plugins: [],
}

