import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import COLORS from '../../../constants/Colors';
import CustomButton from '../../components/CustomButton';

const Retour = ({ navigation }) => {
  const images = [
    { id: 3, source: require('../../../assets/images/paln4.jpg') },
  ];

  const { width: screenWidth } = Dimensions.get('window');

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        {images.map((image) => (
          <View key={image.id} style={{ width: screenWidth }}>
            <Image source={image.source} style={styles.image} />
          </View>
        ))}
      </View>
      <View style={styles.containerCustomButton}>
        <CustomButton text="Ajouter Une pièce" onPress={() => navigation.navigate('Projet')} type="PRIMARY" />
      </View>
      <View>
        <Text style={styles.title}>Demo Project</Text>
        <Text style={styles.subtitle}>78585 rue de la Bourse du travail Monastir</Text>
      </View>
      <View>
        <Text style={styles.title2}>Photo et Notes</Text>
      </View>
      <View>
        <Text style={styles.subtitle2}>Commencez le devis pour ce projet !</Text>
      </View>
      <View>
        <Text style={styles.title2}>Fichiers et partager !</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginVertical: 8,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginVertical: 10,
  },
  subtitle2: {
    fontSize: 18,
    color: '#666',
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  containerCustomButton: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Retour;
