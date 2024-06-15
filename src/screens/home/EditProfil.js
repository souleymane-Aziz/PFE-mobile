import {StyleSheet, Text, View ,Image, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../constants/color';
import COLOR from '../../../constants/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React,  {useState,useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import imagesDataURL from '../../../constants/data';
import FONTS from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../../../src/components/CustomButton';
const Profil = ({navigation,route}) => {
  let {state}=route.params

  //const [selectedImage , setSelectedImage] = useState(imagesDataURL)
  const [nom , setNom] =  useState("")
  const [prenom , setPrenom] = useState("")
  const [email , setEmail] = useState("")

  const [selectedImage, setSelectedImage] = useState(null);

  const [user, setUser] = useState({
    _id:state?._id,
    picture:state?.picture,
    nom:state?.nom,
    prenom:state?.prenom,
    email:state?.email

  });
  const [userImageUrl, setUserImageUrl] = useState(null);
  const domainName = 'http://192.168.1.13:5000/';
  const handleImageSelection = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (!result.didCancel) {
        setSelectedImage(result.assets[0]);
        console.log("Selected image:", result.assets[0]);
        // Envoyer l'image au backend
        await uploadImageToServer(result.assets[0]);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image :", error);
    }
  };
  const uploadImageToServer = async (image) => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log("profil",storedToken)
      if (storedToken) {
        const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      formData.append('userId', user._id);

        const response = await axios.post(`http://192.168.1.13:5000/api/user/client/fileupload`, formData, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('............',formData)
        console.log('Photo de profil mise à jour avec succès :', response.data);

       // Mettre à jour l'URL de l'image dans l'état local
      setUserImageUrl(`http://192.168.1.13:5000/${response.data.user.picture}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo de profil :', error);
    }
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('token');
  //       if (storedToken) {
  //         const response = await axios.get('http://192.168.1.7:5000/client/jwtid', {
  //           headers: { Authorization: `Bearer ${storedToken}` }
  //         });
  //         const userData = response.data;
  //         console.log('............',response)
  //         const userId = userData;

  //         setUser(userData);

  //         // Récupérer les données de l'utilisateur, y compris l'URL de l'image
  //         const response2 = await axios.get(`http://192.168.1.7:5000/api/user/client/${userId}`, {
  //           headers: {
  //             'Authorization': `Bearer ${storedToken}`
  //           }
  //         });
  //         console.log(response2)
  //         const userData2 = response2.data;
  //         setUser(userData2);
  //         const imageUrl =  `${domainName}${userData2.picture}`;
  //         setUserImageUrl(imageUrl);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des données utilisateur :', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);



  const handleSaveChanges = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log("donnee",storedToken)
      if (storedToken) {


        const response = await axios.put(`http://192.168.1.13:5000/api/user/client/update/${user._id}`, user, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Données utilisateur mises à jour avec succès :', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur :', error);
    }
  };
const handleInputChange  = (field , value)=>{
  setUser({...user,[field]:value });
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>

      </View>

        <View style={styles.containerTou2}>
          <TouchableOpacity
          onPress={handleImageSelection}
          >


          {userImageUrl ? (
              <Image source={{ uri: userImageUrl }} style={styles.image} />
            ) : (
              <Image source={{ uri:domainName+ user?.picture }} style={styles.image} />
            )}
            {/* {userImageUrl ? (
          <Image source={{ uri: userImageUrl }} style={styles.image} />
        ) : (
          <Image source={require('../../../assets/images/myprofil.jpg')} style={styles.image} />
        )} */}
            {/* <Image source={require('../../../assets/images/myprofil.jpg')}
             style={styles.image}
            /> */}
            <View style={styles.View2}>
              <MaterialIcons
              name="photo-camera"
              size={32}
              color={COLORS.primary2}/>
            </View>
          </TouchableOpacity>
          {user ? (
            <>

        <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:500
        }}>

          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Nom:</Text>
        </View>
         <View style={{
          height:44,
          width:'100%',
          borderColor: COLOR.COLORS.secondaryGray,
          borderWidth:1,
          borderRadius:4,
          marginVertical:6,
          justifyContent:'center',
          paddingLeft:8,
         }}>

            <TextInput
           value={user?.nom}
           editable={true}
           onChangeText={(text)=>handleInputChange('nom',text)}
          />
         </View>
         <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:490
        }}>
          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Prenom: </Text>
        </View>
         <View style={{
          height:44,
          width:'100%',
          borderColor: COLOR.COLORS.secondaryGray,
          borderWidth:1,
          borderRadius:4,
          marginVertical:6,
          justifyContent:'center',
          paddingLeft:8,
         }}>

         <TextInput
           value={ user?.prenom}
           onChangeText={(text)=>handleInputChange('prenom',text)}
           editable={true}
          />
         </View>
         <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:498
        }}>
          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Email: </Text>
        </View>
         <View style={{
          height:44,
          width:'100%',
          borderColor: COLOR.COLORS.secondaryGray,
          borderWidth:1,
          borderRadius:4,
          marginVertical:6,
          justifyContent:'center',
          paddingLeft:8,
         }}>

           <TextInput
           value={user?.email}
           onChangeText={(text)=>handleInputChange('email',text)}
           editable={true}
          />
         </View>
         </>
          ) : (
            <Text>Chargement des informations utilisateur...</Text>
          )}
        </View>
{/*
        <TouchableOpacity
        style={{
          backgroundColor: COLOR.COLORS.primary,
          height:44,
          borderRadius:6,
          alignItems:'center',
          justifyContent:'center'
        }}
        >


        <Text style={{...FONTS.FONTS.body3,color:COLORS.white}}>sauvegarder les modifications</Text>
        </TouchableOpacity> */}

        <CustomButton text="sauvegarder les modifications" onPress={handleSaveChanges} type="PRIMARY"/>


    </SafeAreaView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.white,
    paddingHorizontal:22,

  },
  containerView:{
    marginHorizontal:12,
    flexDirection:'row',
    justifyContent:'center'
  },
  containerTou:{
    flexDirection: 'row',
    position:'absolute',
    alignItems: 'center',
    left:0
  },
  text:{
    fontWeight:'bold',
    color: '#000000',
    marginLeft: 8,
    fontSize: 18,
    marginLeft:20
  },
  containerTou2:{
    alignItems:'center',
    marginVertical:22
  },
  image:{
    width: 170,
    height: 170,
    borderRadius:85,
    borderColor: COLORS.primary2

  },
  View2:{
    position:'absolute',
    bottom:0,
    right:10,
    zIndex:9999
  }
});