import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../src/screens/home/MyHeader';
import Animated, { FadeIn, useAnimatedRef } from 'react-native-reanimated';

export default function ColorScreen({ route, navigation }) {
  const viewRef = useAnimatedRef(null);
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    switch (route.name) {
      case 'Accueil': { setBgColor(Colors.gray1); break; }
      case 'MesProjets': { setBgColor(Colors.gray1); break; }
      case 'Scanner': { setBgColor(Colors.gray1); break; }
      case 'Profil': { setBgColor(Colors.gray1); break; }
      case 'Apropos': { setBgColor(Colors.gray1); break; }
      default: setBgColor(Colors.white);
    }
  }, [])
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
  //   })
  //   return () => unsubscribe;
  // }, [navigation])
  return (
    <Animated.View ref={viewRef} entering={FadeIn.duration(800)}
      style={[Styles.container, { backgroundColor: bgColor }]}>
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
      />
      <View style={[Styles.container, { backgroundColor: bgColor }]}>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({})
