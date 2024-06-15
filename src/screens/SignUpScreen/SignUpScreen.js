import {View, Text, StyleSheet ,Image ,useWindowDimensions} from 'react-native';
import React,  {useState} from 'react'
import Logo from '../../../assets/images/logo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import CustomPicker from '../../components/CustomPicker';
import {Picker} from '@react-native-picker/picker';
import Api from '../../../ApiUrl/Api'


const SignUpScreen = () => {
  const {height} = useWindowDimensions();
   const {control ,handleSubmit,watch} = useForm()
   const pwd = watch('password')
   const navigation = useNavigation()
   const theme = useTheme();
   const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [selectedRole, setSelectedRole] = useState('');
  const roles = [
    { label: 'Sélectionner le rôle', value: '' },
    { label: 'Client', value: 'Client' },
    { label: 'Utilisateur', value: 'Utilisateur' },
  ];
    const onRegisterPressed = async(data)=>{
   console.log("data",data.email)
     Api.post("/api/user/client/register",

     {email: data?.email,
      nom: data?.nom,
      password: data?.password,
       prenom: data?.prenom,
       role:selectedRole

      }

      )
    .then(res => console.log(res.data))
    .catch(e=>console.log(e))


     navigation.navigate('ConfirmEmail')
    }
    const onSignInPressed =()=>{
        navigation.navigate('SignIn')
       }
    const onTermsOfUsePressed =()=>{
        console.warn("TermeOfUse")
    }
    const onPrivacyPressed =()=>{
        console.warn("privacy")
    }
  return (

    <View  style={[styles.root,  { backgroundColor: theme.colors.primary } ]}>
      <View style={styles.logo} >
      <Text style={styles.title2}></Text>
      </View>
      <View style={[ styles.formContainer , { backgroundColor: theme.colors.primary} ]} >
    <Text style={styles.title1}>Créer un compte </Text>
    <CustomInput
    name="nom"
    placeholder="nom"
    control={control}
    icon={{ name: 'user', size: 25 }}
    rules={{required:'le nom est obligatoire' ,
    minLength:
    {value: 3 ,
    message: 'le nom doit comporter au moins 3 caractères'},
    maxLength:
    {value: 24 ,
    message: 'le nom doit comporter au maximum 24 caractères'}
  }}
    />
    <CustomInput
    name="prenom"
    placeholder="prenom"
    control={control}
    icon={{ name: 'user', size: 25 }}
    rules={{required:'le prenom est obligatoire' ,
    minLength:
    {value: 3 ,
    message: 'le prenom doit comporter au moins 3 caractères'},
    maxLength:
    {value: 50 ,
    message: 'le prenom doit comporter au maximum 24 caractères'}
  }}
    />
    <CustomInput
    name="email"
    placeholder="Email"
    control={control}
    icon={{ name: 'envelope', size: 22 }}
    rules={{required:'L\'Email est obligatoire' ,pattern: {value: EMAIL_REGEX, message:'Email est invalide'}}}
    />
    <CustomInput
    name="password"
    placeholder="Password"
    control={control}
    secureTextEntry={true}
    icon={{ name: 'lock', size: 25 }}
    rules={{required:'Le mot de passe est obligatoire' ,
    minLength:
    {value: 8 ,
    message: 'Le mot de passe doit comporter au moins 8 caractères'},
  }}
    />
    <CustomInput
    name="passwordRepeat"
    placeholder="PasswordRepeat"
    control={control}
    secureTextEntry={true}
    icon={{ name: 'lock', size: 25 }}

    rules={{ required:'La répétition du mot de passe est obligatoire',
      validate: value =>
      value === pwd || 'Le mot de passe ne correspond pas'
    }}
    />

   <CustomPicker
      name="role"
      options={roles}
      selectedValue={selectedRole}
      onValueChange={itemValue => setSelectedRole(itemValue)}
    />
    <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed) } type="PRIMARY"/>

    <Text style={styles.text}>
        en vous inscrivant, vous confirmez que vous acceptez nos {''}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>conditions d'utilisation</Text> et notre {''}
        <Text style={styles.link} onPress={onPrivacyPressed}> politique de confidentialité</Text></Text>
        <CustomButton text="Avez-vous un compte?connectez-vous" onPress={onSignInPressed } type="TERTIARY"/>
    </View>
    </View>
   )
}
const styles = StyleSheet.create({
     root:{
      flex:1
     },
     formContainer:{
      flex:7,
      alignItems: 'center',
      padding:20,
      borderTopLeftRadius: 20, // Arrondir le coin supérieur gauche
    borderTopRightRadius: 20, // Arrondir le coin supérieur droit
     },

     logo:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     },

     title1:{
        fontSize:24,
        fontWeight:'bold',
        color:'#051C60',
        margin:10
     },
     title2:{
      fontSize:40,
      fontWeight:'bold',
      color:'#FFFFFF',
      margin:10
   },
     text:{
        color:'gray',
        marginVertical:10,
     },
     link:{
       color:'#FDB075'
     },
     dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',

    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
});
export default SignUpScreen;