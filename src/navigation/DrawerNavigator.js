import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import  Accueil from '../screens/home/Accueil';
import MesProjets from '../screens/home/MesProjets';
import Scanner from '../screens/home/Scanner';
import Profil from '../screens/home/Profil';
import Apropos from '../screens/home/Apropos';
import ROUTES from '../../constants/routes';
import BottomTabNavigator from '../screens/BottomTabNavigator/BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../constants/color';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator

     screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor:COLOR.primary,
        drawerActiveTintColor:COLOR.white,
        drawerLabelStyle: {
            marginLeft: -20,
          },
     }}
    >
      <Drawer.Screen name={ROUTES.ACCUEIL}
       component={BottomTabNavigator}
       options={{
        title: 'index',
        headerShown:false,
        drawerIcon: ({focused, color, size}) => (
          <Icon name="storefront-sharp" size={18} color={color} />
        ),
      }}
       />
      <Drawer.Screen name={ROUTES.MESPROJETS}
       component={MesProjets}
       options={{
        title: 'MesProjets',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="folder" size={18} color={color} />
        ),
      }}
       />
      <Drawer.Screen name={ROUTES.SCANNER}
      component={Scanner}
      options={{
        title: 'Scanner',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="camera" size={18} color={color} />
        ),
      }}
      />
      <Drawer.Screen
      name={ROUTES.PROFILE}
      component={Profil}
      options={{
        title: 'Profil',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="person-circle-sharp" size={18} color={color} />
        ),
      }}
      />
      <Drawer.Screen
      name={ROUTES.APROPOS}
      component={Apropos}
      options={{
        title: 'Apropos',
        drawerIcon: ({focused, color, size}) => (
          <Icon name="bookmark-sharp" size={18} color={color} />
        ),
      }}
       />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator ;