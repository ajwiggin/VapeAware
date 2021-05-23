// import { StyleSheet } from 'react-native';

// export const darkBlue = '#003f87';
// export const blue = '#007ac8';
// export const darkestBlue = '#002f5e';
// export const lightBlue = '#63c2ff';

export const colors = {
    blue: {
        dark: '#003f87',
        light: '#007ac8',
        secondary: {
            dark: '#002f5e',
            light: '#63c2ff'
        }
    },
    shades: {
        black: '#1c2023',
        gray: '#667986',
        lightGray: '#e3e7e9',
        lighterGray: '#f5f6f7',
        white: '#ffffff'
    }
};

const theme = {
    Text: {
        style: {
            fontSize: 20
        }
    },
    Input: {
        containerStyle: {
            paddingHorizontal: 0
        }
    },
    Button: {
        buttonStyle: {
            backgroundColor: colors.blue.light
        }
    },
    ButtonGroup: {
        containerStyle: {
            marginHorizontal: 0
        }
    }
};

/*StyleSheet.create({
    button: {
        backgroundColor: colors.blue.light
    },
    secondaryButton: {
        backgroundColor: colors.blue.secondary.light
    }
});*/

export default theme;