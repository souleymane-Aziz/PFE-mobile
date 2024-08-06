import React,{useState} from 'react';
import { View,Text } from 'react-native-animatable';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useForm, Controller } from "react-hook-form";
import CustomPicker from '../../components/CustomPicker';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Api from '../../../ApiUrl/Api'
const Projet = ({}) => {
  const [selectedtype, setSelectedtype] = useState('');
  const navigation = useNavigation()
  const types = [
    { label: "Sélectionner Etage", value: '' },
    { label: 'chambre principale', value: 'chambre principale' },
    { label: 'chambre enfant', value: 'chambre enfant' },

  ];
  const [selectedEtage, setSelectedEtage] = useState('');
  const etages = [
    { label: "Sélectionner Etage", value: '' },
    { label: '1er Etage', value: '1er Etage' },
    { label: '2eme Etage', value: '2eme Etage' },
    { label: '3eme Etage', value: '3eme Etage' },
    { label: '4eme Etage', value: '4eme Etage' },
    { label: '5eme Etage', value: '5eme Etage' },
    { label: '7eme Etage', value: '6eme Etage' },
    { label: '8eme Etage', value: '7eme Etage' },
    { label: '9eme Etage', value: '8eme Etage' },
    { label: '10eme Etage', value: '9eme Etage' },
  ];
  const {control , handleSubmit} = useForm();
  const projetPressed = async(data)=>{
  Api.post('/api/projets/CreateProjet',data)
  .then(res => console.log(res.data))
    .catch(e=>console.log(e))
    navigation.navigate('CameraScreen')
  }
    return (
      <View  style={Styles.container}>
          <CustomInput
          name="nomProjet"
          placeholder="nomProjet"
          control={control}
          icon={{ name: 'user', size: 25 }}
          rules={{required:'le nomProjet est obligatoire' ,
          minLength:
          {value: 3 ,
          message: 'le nomProjet doit comporter au moins 3 caractères'},
          maxLength:
          {value: 24 ,
          message: 'le nomProjet doit comporter au maximum 24 caractères'}
          }}
          />
          <CustomInput
          name="createur"
          placeholder="createur"
          control={control}
          icon={{ name: 'th', size: 25 }}
          rules={{required:'le createur est obligatoire' ,
          minLength:
          {value: 3 ,
          message: 'le createur doit comporter au moins 3 caractères'},
          maxLength:
          {value: 24 ,
          message: 'le createur doit comporter au maximum 24 caractères'}
          }}
          />
          <CustomInput
          name="nomPiece"
          placeholder="nomPiece"
          control={control}
          icon={{ name: 'th', size: 25 }}
          rules={{required:'le nomPiece est obligatoire' ,
          minLength:
          {value: 3 ,
          message: 'le nomPiece doit comporter au moins 3 caractères'},
          maxLength:
          {value: 24 ,
          message: 'le nomPiece doit comporter au maximum 24 caractères'}
          }}
          />
          <CustomInput
          name="nombrePiece"
          placeholder="nombrePiece"
          control={control}
          icon={{ name: 'th', size: 25 }}

          />

          {/* <CustomPicker
          name="etage"
          options={etages}
          selectedValue={selectedEtage}
          onValueChange={itemValue => setSelectedEtage(itemValue)}
        /> */}
        {/* <CustomPicker
          name="type"
          options={types}
          selectedValue={selectedtype}
          onValueChange={itemValue => setSelectedtype(itemValue)}
        /> */}
      <View  style={Styles.custombutton}>

          <CustomButton text="Enregistrer" onPress={handleSubmit(projetPressed) } type="PRIMARY"/>
     </View>
      </View>
    );
  };
  const Styles = StyleSheet.create({
   container:{
    flex:1,
    padding:20
   },
   custombutton:{
    padding:20,
    marginHorizontal:140
   }
  })
export default  Projet
