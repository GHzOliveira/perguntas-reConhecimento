import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/theme'

export const theme = extendTheme(
  {
    colors: {
      primary: {
        50: '#E6F6FF',
        100: '#BAE3FF',
        500: '#1F7CBF',
        600: '#1A6AA6',
        700: '#145785',
      },
    },
    components: {
      // Personalizações específicas de componentes
    },
  },
  baseTheme
)