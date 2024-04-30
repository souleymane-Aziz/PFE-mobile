
import { View, Text , StyleSheet ,Image,ScrollView , Dimensions, TouchableOpacity} from 'react-native'
import React from 'react';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
const MesProjets = () => {
  const navigation = useNavigation();
  const images = [
    { id: 1,name:'Demo Project' , description:"Appuyer pour explorer" , source: require('../../../assets/images/plan1.jpg') },

  ];

  return (
     <View style={styles.container} >
       
       <ScrollView>
        {images.map((image)=>(
          <TouchableOpacity
          key={image.id}
          onPress={()=>navigation.navigate('Retour')}
          style={styles.wrapper}
          >
          <Image  source={image.source} style={styles.image}/>
          <Text style={styles.imageText}>{image.name}</Text>
          <Text style={styles.imageText2}>{image.description}</Text>

          </TouchableOpacity>
        ))}
       </ScrollView>
     </View>
  );

  };

  export default MesProjets;
  const styles = StyleSheet.create({
    container: {
      flex: 1,


    },

    image: {
      width: windowWidth / 2 - 15,
      height: 150,
      borderRadius: 10,

    },
    imageText:{
     fontSize:15,
     marginLeft:50,
     color:'#000000'

    },
    imageText2:{
      fontSize:15,
      marginLeft:30

     },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    }
  });