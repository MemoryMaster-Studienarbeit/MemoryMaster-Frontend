//@ts-ignore
import backgroundLight from './images/background_light.svg';
//@ts-ignore
import backgroundDark from './images/background_dark.svg';

export const lightTheme = {
    isLight: true,
    backgroundImage: `url(${backgroundLight})`,
    backgroundColor: '#f0f0f0',

    primaryColor: '#f9cdad',
    secondaryColor: '#fc9d9a',
    tertiaryColor: '#fe4365',
    quaternaryColor: '#c8c8a9',
    quinaryColor: '#83af9b',

    alternativePrimaryColor: '#0056b3',
    alternativeSecondaryColor: '#6cb2ff',

    primaryInputColor: '#eaeaea',

    primaryButtonColor: '#f9cdad',
    secondaryButtonColor: '#fc9d9a',

    text: '#000000',
    dashedBorder: '#808080',
}

export const darkTheme = {
    isLight: false,
    backgroundImage: `url(${backgroundDark})`,
    backgroundColor: '#333333',

    primaryColor: '#00dffc',
    secondaryColor: '#00b4cc',
    tertiaryColor: '#008c9e',
    quaternaryColor: '#005f6b',
    quinaryColor: '#000000',

    alternativePrimaryColor: '#0056b3',
    alternativeSecondaryColor: '#6cb2ff',

    primaryInputColor: '#333333',

    primaryButtonColor: '#00dffc',
    secondaryButtonColor: '#00b4cc',

    text: '#ffffff',
    dashedBorder: '#808080',
};

