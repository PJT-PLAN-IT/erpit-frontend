/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'erp-green' : '#004F48',
        'erp-deep-green' : '#003834',
        'erp-mint' : '#BCE5E1',
        'erp-gray' : '#979797',
        'erp-soft-gray' : '#F3F5F7'
      },
    },
  },
  plugins: [],
}

