module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,ts/x}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: true, 
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true, 
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};


