import {View, Text, StyleSheet} from 'react-native';
import React,  {useState} from 'react'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'

const NewPasswordScreen= () => {

   const {code, setCode} = useState('')
   const {newPassword, setnewPassword} = useState('')
   const navigation = useNavigation()
   const {control ,handleSubmit} = useForm()

    const onSubmitPressed =(data)=>{
      console.warn(data)
     navigation.navigate('Homescreen')
    }
    const onsignUpPressed =()=>{
      navigation.navigate('SignIn')
     }


  return (
    <View style={styles.root}>
    <Text style={styles.title}>Réinitialisez votre mot de passe </Text>
    <CustomInput
    name="code"
    placeholder="code"
    control={control}
    rules={{required : "le code est obligatoire"}}/>
     <CustomInput
     name="newPassword"
    placeholder="Entrez votre nouveau mot de passe"
    control={control}
    secureTextEntry={true}
    rules={{required:'Le nouveau mot de passe est obligatoire' ,
    minLength:
    {value: 8 ,
    message: 'Le nouveau mot de passe doit comporter au moins 8 caractères.'},
  }}/>

    <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed) } type="PRIMARY"/>



        <CustomButton text="Retourner au sign in" onPress={onsignUpPressed } type="TERTIARY"/>
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
export default NewPasswordScreen;