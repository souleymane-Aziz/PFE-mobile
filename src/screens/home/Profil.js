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



const Profil = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        console.log("utilisateur .....", storedToken);
        if (storedToken) {


          const response = await axios.get('http://192.168.1.11:5000/jwtid', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });

          const userData = response.data;
          const userId = userData;
          setUser(userData);

          console.log("ID de l'utilisateur :", userId);
          const url = `http://192.168.1.11:5000/api/user/${userId}`;
          const response2 = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          const userData2 = response2.data;
          setUser(userData2);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <View style={styles.containerTou2}>
      <TouchableOpacity  >

      <Image source={require('../../../assets/images/myprofil.jpg')} style={styles.image}/>
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
          marginRight:220,
          marginVertical:45,
        }}>
          <Text style={{
            fontWeight:'bold',
            color:COLORS.black,
            fontSize:20,

          }}>Profil</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
             left:0}}>
          <MaterialIcons
            name="feed"
            size={24}
            color={COLORS.bgColor}

          />

          <Text style={{
           ...FONTS.FONTS.h4,
           fontWeight:25,
           color:COLORS.black
          }}>Nom: </Text>
          <Text style={{color:COLORS.black}}>{user.pseudo} </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
             left:0}}>
          <MaterialIcons
            name="email"
            size={24}
            color={COLORS.bgColor}

          />
          <Text style={{
            ...FONTS.FONTS.h4,
            fontWeight:25,
            color:COLORS.black

          }}>Email: </Text>
          <Text style={{color:COLORS.black }}>{user.email}</Text>

        </View>
        </View>
      ) : (
        <Text>Chargement des informations utilisateur...</Text>
      )}
    </View>
      <TouchableOpacity
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
        </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
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
})
export default Profil