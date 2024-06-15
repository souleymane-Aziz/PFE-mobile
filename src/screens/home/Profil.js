import { View, Text ,TouchableOpacity, StyleSheet,Image} from 'react-native'
import React , {useState,useEffect} from 'react';
import COLORS from '../../../constants/color';
import COLOR from '../../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FONTS from '../../../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../../src/components/CustomButton';
import img from '../../../assets/images/myprofil.jpg';
import Api from '../../../ApiUrl/Api'
const Profil = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState(null);
  const domainName = 'http://192.168.1.13:5000/';


  const fetchUserData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {


        const response = await Api.get('/currentclient/jwtid', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });


        const imageUrl = `${domainName}${response.data?.picture}`;

        setUserImageUrl(imageUrl);
        setUser(response.data)




      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };

  useEffect(() => {


    fetchUserData();
  }, [userImageUrl,user]);



  return (
    <View style={styles.containerTou2}>
      <TouchableOpacity  >
      {  userImageUrl   ? (
        <Image source={{uri: userImageUrl}} style={styles.image} />
      ) : (
        <Image source={img} style={styles.image} />
      )}
      {/* <Image source={{uri:'http://192.168.1.13:5000/api/user/client/fileupload'}}  style={styles.image}/> */}
      <View style={styles.View2}>
              <MaterialIcons
              name="photo-camera"
              size={32}
              color={COLORS.primary2}/>
      </View>
      </TouchableOpacity>
      <View>
      {user ? (
        <View style={{
          marginRight:360,
          marginVertical:70,
          paddingHorizontal: 50


        }}>
          <Text style={{
            fontWeight:'bold',
            color:COLORS.black,
            fontSize:20,

          }}>Profil</Text>

          <View style={{
           flexDirection: 'row',
            //alignItems: 'center',
            // left:0 ,
             //flexWrap: 'wrap'

             }}>

          <MaterialIcons
            name="feed"
            size={45}
            color={COLORS.bgColor}

          />

        <View >
        <Text style={{
           ...FONTS.FONTS.h4,
           fontWeight:25,
           color:COLORS.black,

          }}>Nom: </Text>
            <View style={{}} >
           <Text style={{color:COLORS.black }}>{user.nom} </Text>
           </View>
           </View>
          </View>



          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
             left:0,
             marginVertical:10}}>
          <MaterialIcons
            name="feed"
            size={45}
            color={COLORS.bgColor}

          />
          <View>
          <Text style={{
           ...FONTS.FONTS.h4,
           fontWeight:25,
           color:COLORS.black,
          }}>Prenom: </Text>
          <View>
          <Text style={{color:COLORS.black}}>{user.prenom} </Text>
          </View>
          </View>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
             left:0 }}>
          <MaterialIcons
            name="email"
            size={45}
            color={COLORS.bgColor}

          />
          <View>
          <Text style={{
            ...FONTS.FONTS.h4,
            fontWeight:25,
            color:COLORS.black

          }}>Email: </Text>
          <View>
          <Text style={{color:COLORS.black }}>{user.email}</Text>
          </View>
          </View>
        </View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
             left:0 ,marginVertical:10 }}>
          <MaterialIcons
            name="feed"
            size={45}
            color={COLORS.bgColor}

          />
          <View>
          <Text style={{
           ...FONTS.FONTS.h4,
           fontWeight:25,
           color:COLORS.black
          }}>Rôle: </Text>
          <View>
          <Text style={{color:COLORS.black}}>{user.role} </Text>
          </View>
          </View>
          </View>
        </View>
      ) : (
        <Text>Chargement des informations utilisateur...</Text>
      )}

    </View>
      {/* <TouchableOpacity
        style={{
          backgroundColor: COLOR.COLORS.primary,
          height:45,
          borderRadius:6,
          alignItems:'center',
          justifyContent:'center'
        }}
        >
        <Text style={{...FONTS.FONTS.body3,color:COLORS.white}}
        onPress={()=>navigation.navigate('EditProfil')}>modifier vos données</Text>
        </TouchableOpacity> */}
        <CustomButton text="modifier vos données"  onPress={()=>navigation.navigate('EditProfil',{state:user})} type="PRIMARY"/>

    </View>
  )
}
const styles = StyleSheet.create({
  containerTou2:{
    alignItems:'center',
    marginVertical:22,

  },
  image:{
    width: 170,
    height: 170,
    borderRadius:85,


  },
  View2:{
    position:'absolute',
    bottom:0,
    right:10,
    zIndex:9999
  }
})
export default Profil