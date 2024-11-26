// themes.ts
export const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    sidebarBackground: '#f0f0f0',
    inputBackground: '#f0f0f0',
    toggleBackground: '#007bff',
    isLight: true,
    selectedBackground: 'cadetblue',
    cardBackground: '#f0f0f0',
};

export const darkTheme = {
    background: '#333333',
    text: '#ffffff',
    sidebarBackground: '#444444',
    inputBackground: '#555',
    toggleBackground: '#0056b3',
    isLight: false,
    selectedBackground: 'cadetblue',
    cardBackground: '#444444',
};

export type ThemeType = typeof lightTheme;
