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
    secondaryInputColor: '#eaeaea',

    primaryButtonColor: '#f9cdad',
    secondaryButtonColor: '#fc9d9a',

    buttonDisabled: '#d3d3d3',

    text: '#000000',
    dashedBorder: '#808080',

    learnVeryHard: '#dd0000',
    learnHard: '#ee6600',
    learnGood: '#dddd00',
    learnVeryGood: '#66dd00',
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
    secondaryInputColor: '#464545',

    primaryButtonColor: '#00dffc',
    secondaryButtonColor: '#00b4cc',

    buttonDisabled: '#555555',

    text: '#ffffff',
    dashedBorder: '#808080',

    learnVeryHard: '#dd0000',
    learnHard: '#dd6600',
    learnGood: '#dddd00',
    learnVeryGood: '#66dd00',
};

