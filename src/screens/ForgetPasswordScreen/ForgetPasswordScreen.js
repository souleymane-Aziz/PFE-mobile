import {View, Text, StyleSheet} from 'react-native';
import React,  {useState} from 'react'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
const ForgetPasswordScreen= () => {


   const navigation = useNavigation()
   const {control ,handleSubmit} = useForm()

    const onSendPressed =(data)=>{
      console.warn(data)
     navigation.navigate('NewPassword')
    }
    const onsignUpPressed =()=>{
      navigation.navigate('SignIn')
     }


  return (
    <View style={styles.root}>
    <Text style={styles.title}>Réinitialisez votre mot de passe </Text>
    <CustomInput
    name="email"
    placeholder="email"
    control={control}
    rules= {{required: 'Le nom d\'utilisateur est obligatoire'}}
    />

    <CustomButton text="Envoyé" onPress={handleSubmit(onSendPressed )} type="PRIMARY"/>



        <CustomButton text="Retourner au signIn" onPress={onsignUpPressed } type="TERTIARY"/>
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
export default ForgetPasswordScreen;