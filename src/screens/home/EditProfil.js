import {StyleSheet, Text, View ,Image, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../constants/color';
import COLOR from '../../../constants/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React,  {useState,useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import imagesDataURL from '../../../constants/data';
import FONTS from '../../../constants/theme'
const Profil = ({navigation}) => {
  const [selectedImage , setSelectedImage] = useState(imagesDataURL)
  const [name , setName] =  useState("Souleymane Aziz Maiga")
  const [email , setEmail] = useState("solo@gmail.com")
  const [password , setPassword] = useState("solopassword")
  const handleImageSelection =async()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>

      </View>
      <TouchableOpacity >
        <View style={styles.containerTou2}>
          <TouchableOpacity
          onPress={handleImageSelection}
          >
            <Image source={require('../../../assets/images/myprofil.jpg')}
             style={styles.image}
            />
            <View style={styles.View2}>
              <MaterialIcons
              name="photo-camera"
              size={32}
              color={COLORS.primary2}/>
            </View>
          </TouchableOpacity>
        <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:315
        }}>
          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Nom</Text>
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
           value={name}
           onChangeText={value=>setName(value)}
           editable={true}
          />
         </View>
         <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:315
        }}>
          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Email</Text>
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
           value={email}
           onChangeText={value=>setEmail(value)}
           editable={true}
          />
         </View>
         <View style={{
          flexDirection:"column",
          marginBottom:6,
          marginRight:249
        }}>
          <Text style={{...FONTS.FONTS.h4,fontWeight:'bold' }}>Mot de passe</Text>
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
           value={password}
           onChangeText={value=>setPassword(value)}
           editable={true}
           secureTextEntry
          />
         </View>
        </View>
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
        </TouchableOpacity>
      </TouchableOpacity>
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