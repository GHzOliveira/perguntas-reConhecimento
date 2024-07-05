import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                backgroundColor: 'neutral.100',
            },
        },
    },
    colors: {
        primary: {
            100: '#C5C4D9',
            300: '#8581B2',
            700: '#4F4A86',
            800: '#423B86',
            900: '#3B3486',
        },
    },
})