import type { ThemeCollection } from '../types'

export const themeDefinitions: ThemeCollection = {
  mechaCore: {
    name: 'Mecha Core',
    colors: {
      light: {
        '--q-primary': '#90caf9',
        '--q-secondary': '#cfd8dc',
        '--q-accent': '#00e5ff',
        '--q-page-bg': '#eceff1',
        '--q-text-color': '#263238',
        '--my-custom-header-bg': '#455a64',
        '--my-custom-header-text': '#e1f5fe',
      },
      dark: {
        '--q-primary': '#00b0ff',
        '--q-secondary': '#37474f',
        '--q-accent': '#64ffda',
        '--q-dark-page': '#121212',
        '--q-body-text': '#cfd8dc',
        '--my-custom-header-bg': '#263238',
        '--my-custom-header-text': '#a7ffeb',
      },
    },
  },

  yandereLove: {
    name: 'Yandere Love',
    colors: {
      light: {
        '--q-primary': '#e91e63',
        '--q-secondary': '#f8bbd0',
        '--q-accent': '#9c27b0',
        '--q-page-bg': '#fff0f5',
        '--q-text-color': '#880e4f',
        '--my-custom-header-bg': '#c2185b',
        '--my-custom-header-text': '#ffffff',
      },
      dark: {
        '--q-primary': '#f06292',
        '--q-secondary': '#ba68c8',
        '--q-accent': '#ec407a',
        '--q-dark-page': '#2c003e',
        '--q-body-text': '#ffdde1',
        '--my-custom-header-bg': '#6a1b9a',
        '--my-custom-header-text': '#ffffff',
      },
    },
  },

  ghibliDream: {
    name: 'Ghibli Dream',
    colors: {
      light: {
        '--q-primary': '#8bc34a',
        '--q-secondary': '#aed581',
        '--q-accent': '#ffb74d',
        '--q-page-bg': '#f1f8e9',
        '--q-text-color': '#33691e',
        '--my-custom-header-bg': '#689f38',
        '--my-custom-header-text': '#ffffff',
      },
      dark: {
        '--q-primary': '#aed581',
        '--q-secondary': '#7cb342',
        '--q-accent': '#ffa726',
        '--q-dark-page': '#263238',
        '--q-body-text': '#e0f2f1',
        '--my-custom-header-bg': '#1b5e20',
        '--my-custom-header-text': '#c8e6c9',
      },
    },
  },
}
