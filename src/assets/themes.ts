const common = {
    white: '#fff',
    transparent: 'transparent',
    black: '#000',
    blue: 'blue',
    placeHolderGray: 'rgba(216, 216, 216, 0.6)',
    borderInputError: '#ff0000',
    green: 'green',
    grey: 'grey',
    gray: 'gray',
    backGroundInput: '#FBFBFB',
    lightGray: '#F4F4F4',
    mercury: '#E5E5E5',
    silver: '#B8B8B8',
    headerBackground: '#FEECD2',
    viking: '#55DFBE',
    defaultLinear: ['#DF2115', '#A61F17'],
    mineShaft: '#222222',
    seaGreen: '#34835E',
    backgroundButton: 'rgba(34, 34, 34, 0.5)',
};

const Light = {
    COLORS: {
        ...common,
        primary: '#A61F17',
        secondary: '#1D0157',
        textPrimary: '#1D0157',
        textSecondary: 'white',
        opacityPrimary: (opacity: number) => `rgba(166, 31, 23, ${opacity})`,
        backgroundPrimary: '#F4F4F4',
        backgroundModalUpdate: '#323232',
        backdropModalUpdate: '#00000071',
        progressUpdateColor: '#28A696',
        red: 'red',
        stampExchange: 'rgba(88, 59, 150, 0.25)',
        stampOther: 'rgba(189, 76, 69, 0.25)',
        overlayModalize: 'rgba(0,0,0,0.8)',
        thunderbird: '#DE1E13',
        opacityThunderbird: (opacity: number) => `rgba(222, 30, 19, ${opacity})`,
        disabled: '#DEDEDE',
    },
    FONTS: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

const Dark = {
    colors: {
        ...common,
        primary: '#607d8b',
        secondary: '#607d8b',
        textPrimary: '#607d8b',
        textSecondary: '#607d8b',
    },
    fonts: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

export const Themes = Light;

export const ThemesDark = Dark;
