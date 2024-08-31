import React,{useState} from 'react';
import { View,Text } from 'react-native-animatable';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomInputArea from '../../components/CustomInputArea';
import { useForm, Controller } from "react-hook-form";
import CustomPicker from '../../components/CustomPicker';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Api from '../../../ApiUrl/Api';
import { useTheme } from 'react-native-paper';

const Projet = ({}) => {
  const [selectedtype, setSelectedtype] = useState('');
  const navigation = useNavigation()
  const theme = useTheme();
  const {control , handleSubmit , formState: { errors }} = useForm();
  const projetPressed = async(data)=>{
  Api.post('/api/projets/CreateProjet',data)
  .then(res => console.log(res.data))
    .catch(e=>console.log(e))
    navigation.navigate('CameraScreen')
  }
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
       <CustomButton  text="Créer le Projet" onPress={handleSubmit(projetPressed)} type="PRIMARY" />
      </View>
    </View>

    );
  };
  const styles = StyleSheet.create({
   container:{
    flex:1,
    padding:20
   },
   custombutton:{
    padding:20,
    marginHorizontal:140
   },
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
  button:{
    padding:30,
    marginHorizontal:120
  }
  })
export default  Projet
