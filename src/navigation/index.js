import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmerEmailScreen from '../screens/ConfirmerEmailScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import BottomTabNavigator from '../screens/BottomTabNavigator/BottomTabNavigator';
import DrawerNavigator from '../navigation/DrawerNavigator';
import Accueil from '../../src/screens/home/Accueil'
import Retour from '../../src/screens/home/Retour';
import EditProfil from '../../src/screens/home/EditProfil';
import Profil from '../screens/home/Profil';
import Projet from '../../src/screens/home/Projet';
import CameraScreen from '../../src/screens/home/CameraScreen'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown: false}} >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="BottomTabNavigator" component={DrawerNavigator} />
        <Stack.Screen name="index" component={Accueil} />
         <Stack.Screen name="Retour" component={Retour} options={{headerShown: true}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Projet" component={Projet}options={{headerShown: true}} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmerEmailScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="EditProfil" component={EditProfil} options={{headerShown: true}} />
        <Stack.Screen name="Profil" component={Profil} options={{headerShown: true}}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
