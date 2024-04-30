import {Image, ScrollView, StyleSheet, Text, View,Dimensions , FlatList} from 'react-native';
import React,{ useRef, useEffect } from 'react';
import COLORS from '../../../constants/color';

const images = [
  { id: 1, source: require('../../../assets/images/plan1.jpg') },
  { id: 2, source: require('../../../assets/images/paln2.jpg') },
  { id: 3, source: require('../../../assets/images/paln4.jpg') },
  { id: 4, source: require('../../../assets/images/paln3.jpg') },
  { id: 5, source: require('../../../assets/images/plan5.jpeg') },
  { id: 6, source: require('../../../assets/images/plan6.jpg') },
];

const Accueil = () => {

  return (
    <View style={styles.container}  >

     <Text style={styles.title}>Bienvenue sur notre application !</Text>
      <Text style={styles.subtitle}>Nous sommes heureux de vous offrir une expérience exceptionnelle.</Text>

      <ScrollView style={styles.imageContainer}>
        {images.map((image) => (
          <View key={image.id}>
            <Image source={image.source} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#696969',
    marginBottom: 8,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    padding:10
  },imagecontainer2: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * images.length, // Largeur totale basée sur le nombre d'images
  },
  image2: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  imageContainer3: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image3: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
  },

});
