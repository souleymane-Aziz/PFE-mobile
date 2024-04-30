import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9FBFC',
    accent: 'red',
    background: '#FF0000'
  },

  images: {
    logo: require('../assets/images/future.jpg'), // Chemin de votre image
  },
};

export default theme;