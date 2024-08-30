import {View, Text, StyleSheet} from 'react-native';
import React,  {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
import Api from '../../../ApiUrl/Api'

const ConfirmerEmailScreen= () => {
  const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   const navigation = useNavigation()
   const {control, handleSubmit} = useForm()

    const onConfirmPressed =(data)=>{
    console.log(".........donnée.........",data)
    Api.post('/api/user/client/confirm', data)
    .then(res => {
      console.log(res.data);
      // Si la réponse est réussie, naviguez
      if (res.status === 200) {
        navigation.navigate('SignIn');
      } else {
        // Gérez le cas où la confirmation échoue
        console.log('Confirmation failed');
      }
    })
    .catch(e => {
      console.log(e);
      // Gérez les erreurs ici
    });

    }
    const onResendPressed =()=>{
      console.warn("onResendPressed")
     }
    const onsignUpPressed =()=>{
      navigation.navigate('SignIn')
     }


  return (
    <View style={styles.root}>
    <Text style={styles.title}> Confirmez votre Email </Text>
    <CustomInput
    name="email"
    placeholder="Email"
    control={control}
    icon={{ name: 'envelope', size: 22 }}
    rules={{required:'L\'Email est obligatoire' ,pattern: {value: EMAIL_REGEX, message:'Email est invalide'}}}
    />
    <CustomInput
    name="confirmationCode"
    placeholder="Entrez votre code de confirmation"
    control={control}
    rules={{required:'confirmation code est obligatoire' }}
    icon={{ name: 'lock', size: 25 }}
    secureTextEntry
    />

    <CustomButton text="Confirmer" onPress={handleSubmit(onConfirmPressed) } type="PRIMARY"/>

    <CustomButton text="Renvoyer le code" onPress={onResendPressed } type="SECONDARY"/>

        <CustomButton text="Retour pour vous connecter" onPress={onsignUpPressed } type="TERTIARY"/>
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