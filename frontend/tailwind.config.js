module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          //This must be deleted
          neutral: '#d1d5db',
          info: '#bae6fd',
          success: '#86efac',
          warning: '#fde68a',
          error: '#Fecaca',
          'base-100': '#FFFFFF',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bgWhite: '#ffffff',
        bgLightBlue: '#eff6ff', //blue-50
        bgFooter: '#bfdbfe', //blue-200
        bgTableHeader: '#bfdbfe', //blue-200
        bgNavBar: '#224778', //blue custom
        // Text
        textLightBlue: '#eff6ff', //blue-50
        textBlue: '#224778', //blue custom
        textDarkBlue: '#0b1b42', //blue custom dark
        textGray: '#64748b', //slate-500
        textPlaceholder: '#94a3b8',
        textError: '#dc2626', //red-900
        // Button
        buttonPrimary: '#224778', //blue custom
        buttonPrimaryHover: '#1e40af', //blue-800
        buttonPrimaryActive: '#1d4ed8', //blue-700
        buttonSecondary: '#eff6ff', //blue-50
        buttonSecondaryHover: '#dbeafe', //blue-100
        buttonSecondaryActive: '#bfdbfe', //blue-200
        buttonGreen: '#14532d', //green-900
        buttonGreenHover: '#166534', //green-800
        buttonGreenActive: '#15803d', //green-700
        buttonRed: '#fecaca', //red-200
        buttonRedHover: '#fca5a5', //red-300
        buttonRedActive: '#f87171', //red-400
        // Inputs
        inputError: '#fecaca',
        inputErrorFocus: '#fca5a5',
        input: '#bfdbfe', //blue-200
        inputFocus: '#3b82f6', //blue-500
        inputDisabled: '#ededed', //gray
        // Misc
        pageDivisor: '#bfdbfe', //blue-200
      },
    },
  },
  plugins: [require('daisyui')],
};
