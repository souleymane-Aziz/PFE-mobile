import {ImageBackground,View, Text , Image , StyleSheet, useWindowDimensions, TextInput} from 'react-native';
import React,  {useState,useEffect} from 'react'
import Logo from '../../../assets/images/logo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../ApiUrl/Api'


const SignInScreen = () => {
   const [token,setToken] = useState(null)
   const navigation = useNavigation();
   const {height} = useWindowDimensions();
   const {control , handleSubmit , formState:{errors}} = useForm();
   const theme = useTheme();
   const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   console.log(errors)


    useEffect(() => {
     const getToken = async () => {
      try {
        // Récupérer le token stocké dans le AsyncStorage
         const storedToken = await AsyncStorage.getItem('token');
         if (storedToken) {
           setToken(storedToken);
         }
       } catch (error) {
         console.error('Erreur lors de la récupération du token :', error);
       }
     };

     getToken();
   }, []);


    const onsignInPressed = async(data)=>{
      try{
        const res= await Api.post("/api/user/client/login", data)
        if(res.data){

           await AsyncStorage.setItem('token', JSON.stringify(res.data));
           setToken(res.data)
          navigation.navigate('BottomTabNavigator')
        }else{
          console.log("err" , res.data.errors)
        }

      }catch(err){
       console.log(err)
      }
     //validate user

    }
    const onForgetPasswordPressed =()=>{
      navigation.navigate('ForgetPassword')
    }
    const onSignInPressed =()=>{
      navigation.navigate('SignUp')
    }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.primary } ]}>
    <View style={[styles.logoContainer ]}>
       <Text style={styles.title}></Text>
    </View>
    <View  style={[styles.formContainer , { backgroundColor: theme.colors.primary }]}>
    <CustomInput
    name="email"
    placeholder="email"
    control={control}
    icon={{ name: 'user', size: 25 }}
    rules={{required:'L\'Email est obligatoire', pattern: {value: EMAIL_REGEX, message:'Email est invalide'}}}

    />

    <CustomInput
     name="password"
    placeholder="password"
    control={control}
    secureTextEntry
    icon={{ name: 'lock', size: 25 }}
    rules={{required:'Le Mot de passe est obligatoire' ,
     minLength :
     {value:3 ,
       message:'Le mot de passe doit comporter au moins 3 caractères'}}}
  />



    <CustomButton text="Se connecter" onPress={handleSubmit(onsignInPressed) } type="PRIMARY"/>
    <CustomButton text="Mot de passe oublié" onPress={onForgetPasswordPressed } type="TERTIARY"/>
    <CustomButton text="Vous n'avez pas un compte?créer une" onPress={onSignInPressed } type="TERTIARY"/>
    </View>
    </View>
 )
}
const styles = StyleSheet.create({
     root:{
      flex:1,

     },
     title:{
      fontSize:40,
      fontWeight:'bold',
      color:'#FFFFFF',
      margin:10
   },
     logo:{
      width: '100%',
      height: '100%',
     },
     formContainer:{
      flex: 3.5,
      padding: 20,
      borderTopLeftRadius: 20, // Arrondir le coin supérieur gauche
    borderTopRightRadius: 20, // Arrondir le coin supérieur droit

     },
     logoContainer:{
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

     },
     logincolor:{
      backgroundColor: '#F9FBFC',

     }
});
export default SignInScreen;