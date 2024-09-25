import { View, Text, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomInputArea from '../../components/CustomInputArea';
import { useTheme } from 'react-native-paper';
import Api from '../../../ApiUrl/Api'
const ProjetScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const theme = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Api.post('/api/projets/CreateProjet', data, {
        withCredentials: true,
      });
      Alert.alert('Succès', 'Projet créé avec succès');
      navigation.navigate('CameraScreen'); // Remplacez 'Home' par l'écran vers lequel vous voulez naviguer après la création du projet
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du projet');
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.bleu }]}>
      <View style={styles.logo}>
        <Text style={styles.title2}>Créer un Projet</Text>
      </View>
      <View style={[styles.formContainer, { backgroundColor: theme.colors.primary }]}>
        <CustomInput
          name="nomProjet"
          placeholder="Nom du Projet"
          control={control}
          icon={{ name: 'th', size: 25 }}
          rules={{ required: 'Le nom du projet est obligatoire' }}
        />
        {errors.nomProjet && <Text style={styles.errorText}>{errors.nomProjet.message}</Text>}
        <CustomInputArea
          name="description"
          placeholder="Description du projet"
          control={control}
          icon={{ name: 'file-text-o', size: 25 }}
          rules={{ required: 'La description du projet est obligatoire' }}
        />

        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
        <CustomInput
          name="nomPiece"
          placeholder="Nom de la Pièce"
          control={control}
          icon={{ name: 'home', size: 25 }}
          rules={{ required: 'Le nom de la pièce est obligatoire' }}
        />
        {errors.nomPiece && <Text style={styles.errorText}>{errors.nomPiece.message}</Text>}
        <CustomInput
          name="nombrePiece"
          placeholder="Nombre de Pièces"
          control={control}
          keyboardType="numeric"
          icon={{ name: 'home', size: 25 }}
          rules={{ required: 'Le nombre de pièces est obligatoire', pattern: { value: /^[0-9]+$/, message: 'Le nombre de pièces doit être un nombre entier' } }}
        />
        {errors.nombrePiece && <Text style={styles.errorText}>{errors.nombrePiece.message}</Text>}
        <CustomButton text="Créer le Projet" onPress={handleSubmit(onSubmit)} type="PRIMARY" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  formContainer: {
    flex: 3.5,
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20, // Arrondir le coin supérieur gauche
    borderTopRightRadius: 20, // Arrondir le coin supérieur droit
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    margin: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProjetScreen;
