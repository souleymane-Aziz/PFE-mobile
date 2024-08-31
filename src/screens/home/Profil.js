import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../../constants/color';
import COLOR from '../../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FONTS from '../../../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../src/components/CustomButton';
import img from '../../../assets/images/myprofil.jpg';
import Api from '../../../ApiUrl/Api';
import { useTheme } from 'react-native-paper';

const Profil = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState(null);

  const fetchUserData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        const response = await Api.get('/api/user/currentclient', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        const imageUrl =  `${Api.defaults.domainName}${response.data.picture}`;
        setUserImageUrl(imageUrl);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userImageUrl, user]);

  return (
    <View style={[styles.containerGlobal, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.containerHeader, { backgroundColor: theme.colors.bleu }]}>
        <TouchableOpacity>
          {userImageUrl ? (
            <Image source={{ uri: userImageUrl }} style={styles.image} />
          ) : (
            <Image source={img} style={styles.image} />
          )}
          <View style={styles.cameraIcon}>
            <MaterialIcons name="photo-camera" size={32} color={COLORS.primary2} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.containerData]}>
        {user ? (
          <View style={styles.userInfoContainer}>
            <Text style={styles.profileTitle}>Profil</Text>
            <UserInfoItem icon="account-circle" label="Nom" value={user.nom} />
            <UserInfoItem icon="account-circle" label="Prénom" value={user.prenom} />
            <UserInfoItem icon="email" label="Email" value={user.email} />
            <UserInfoItem icon="work" label="Rôle" value={user.role} />
          </View>
        ) : (
          <Text>Chargement des informations utilisateur...</Text>
        )}
        <View style={styles.button}>
        <CustomButton
          text="Modifier vos données"
          onPress={() => navigation.navigate('EditProfil', { state: user })}
          type="PRIMARY"
        />
        </View>
      </View>
    </View>
  );
};

const UserInfoItem = ({ icon, label, value }) => (
  <View style={styles.userInfoItemContainer}>
  <View style={styles.userInfoItem}>
    <MaterialIcons name={icon} size={45} color={COLORS.bgColor} />
    <View style={styles.userInfoText}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%",
    paddingVertical: 20,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderWidth: 4, // Épaisseur de la bordure
    borderColor: 'black', // Couleur de la bordure
    marginTop:-70,
    height:60,


  },
  userInfoItemContainer: {
    marginBottom: 10, // Espacement entre chaque userInfoItem
    backgroundColor: 'white', // Couleur de fond pour les userInfoItem
    borderRadius: 10, // Bord arrondi
    shadowColor: 'black', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Offset de l'ombre (horizontal, vertical)
    shadowOpacity: 0.3, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 5, // Nécessaire pour Android pour que l'ombre soit visible
  },
  containerData: {
    flex: 2.5,
    padding: 20,
   // borderTopLeftRadius: 20,
   // borderTopRightRadius: 20,
    marginTop: -20,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginTop: 280,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,

  },
  userInfoContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop:50
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userInfoText: {
    marginLeft: 10,
  },
  label: {
    ...FONTS.FONTS.h4,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  value: {
    color: COLORS.black,
  },
  button:{
    padding:20,
    marginHorizontal:95
  }
});

export default Profil;
