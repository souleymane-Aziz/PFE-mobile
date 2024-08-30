import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import COLORS from '../../../constants/color';
import COLOR from '../../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../src/components/CustomButton';
import Api from '../../../ApiUrl/Api';
import { useTheme } from 'react-native-paper';
import FONTS from '../../../constants/theme';
import { launchImageLibrary } from 'react-native-image-picker';

const Profil = ({ navigation, route }) => {
  const theme = useTheme();
  let { state } = route.params;

  const [user, setUser] = useState({
    _id: state?._id,
    picture: state?.picture,
    nom: state?.nom,
    prenom: state?.prenom,
    email: state?.email,
  });

  const [userImageUrl, setUserImageUrl] = useState(null);

  const handleImageSelection = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (!result.didCancel) {
        // setSelectedImage(result.assets[0]);
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
      console.log("profil", storedToken);
      if (storedToken) {
        const formData = new FormData();
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
        formData.append('userId', user._id);

        const response = await Api.post(`/api/user/client/fileupload`, formData, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Photo de profil mise à jour avec succès :', response.data);

        // Mettre à jour l'URL de l'image dans l'état local
        setUserImageUrl(`${Api.defaults.domainName}${response.data.user.picture}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo de profil :', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log("donnee", storedToken);
      if (storedToken) {
        const response = await Api.put(`/api/user/client/update/${user._id}`, user, {
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

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.topContainer, { backgroundColor: theme.colors.bleu }]}>
        <TouchableOpacity onPress={handleImageSelection}>
          {userImageUrl ? (
            <Image source={{ uri: userImageUrl }} style={styles.image} />
          ) : (
            <Image source={{ uri: Api.defaults.domainName + user?.picture }} style={styles.image} />
          )}

          <View style={styles.cameraIcon}>
            <MaterialIcons name="photo-camera" size={32} color={COLORS.primary2} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        {user ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom:</Text>
              <TextInput
                style={styles.input}
                value={user?.nom}
                onChangeText={(text) => handleInputChange('nom', text)}
                editable={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom:</Text>
              <TextInput
                style={styles.input}
                value={user?.prenom}
                onChangeText={(text) => handleInputChange('prenom', text)}
                editable={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={user?.email}
                onChangeText={(text) => handleInputChange('email', text)}
                editable={true}
              />
            </View>
          </>
        ) : (
          <Text>Chargement des informations utilisateur...</Text>
        )}

        <CustomButton text="Sauvegarder les modifications" onPress={handleSaveChanges} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topContainer: {
    height: 300, // Hauteur fixe pour empêcher le repli
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: 'center',
    paddingTop: 50,
    borderWidth: 4, // Épaisseur de la bordure
    borderColor: 'black', // Couleur de la bordure
    marginTop:-80
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop:50
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderColor: COLORS.primary2,
    marginTop:220
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  inputContainer: {
    marginBottom: 12,
    width: '100%',
  },
  label: {
    ...FONTS.FONTS.h4,
    fontWeight: 'bold',
    marginRight: 12,
    width: '20%',
  },
  input: {
    height: 44,
    flex: 1,
    borderColor: COLOR.COLORS.secondaryGray,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
});
