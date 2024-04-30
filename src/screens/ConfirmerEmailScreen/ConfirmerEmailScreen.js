import {View, Text, StyleSheet} from 'react-native';
import React,  {useState} from 'react'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'


const ConfirmerEmailScreen= () => {


   const navigation = useNavigation()
   const {control, handleSubmit} = useForm()

    const onConfirmPressed =(data)=>{
     console.warn(data)
     navigation.navigate('Homescreen')
    }
    const onResendPressed =()=>{
      console.warn("onResendPressed")
     }
    const onsignUpPressed =()=>{
      navigation.navigate('SignIn')
     }


  return (
    <View style={styles.root}>
    <Text style={styles.title}>Confirmer your Email </Text>
    <CustomInput
    name="Code"
    placeholder="Enter your confirmation code"
    control={control}
    rules={{required:'confirmation code is required' }}
    secureTextEntry
    />

    <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed) } type="PRIMARY"/>

    <CustomButton text="Resent code" onPress={onResendPressed } type="SECONDARY"/>

        <CustomButton text="Back to sign in" onPress={onsignUpPressed } type="TERTIARY"/>
    </View>
  )
}
const styles = StyleSheet.create({
     root:{
      alignItems: 'center',
      padding:20
     },

     title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#051C60',
        margin:10
     },
     text:{
        color:'gray',
        marginVertical:10,
     },
     link:{
       color:'#FDB075'
     }
});
export default ConfirmerEmailScreen;