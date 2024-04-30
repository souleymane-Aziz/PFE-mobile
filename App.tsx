import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView ,StyleSheet ,Text} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme'
import Navigation from './src/navigation';
export default function App() {
  return (
    <PaperProvider theme={theme}>
   <SafeAreaView style={styles.root}>

    <Navigation/>
   </SafeAreaView>
   </PaperProvider>

  );
}
const styles = StyleSheet.create({
  root:{
    flex :1,
    backgroundColor : theme.colors.background,

  }
})