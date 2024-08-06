import React, { useRef, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import COLORS from '../../../constants/color';

const images = [
  { id: 1, source: require('../../../assets/images/plan1.jpg') },
  { id: 2, source: require('../../../assets/images/paln2.jpg') },
  { id: 3, source: require('../../../assets/images/paln4.jpg') },
  { id: 4, source: require('../../../assets/images/paln3.jpg') },
  { id: 5, source: require('../../../assets/images/plan5.jpeg') },
  { id: 6, source: require('../../../assets/images/plan6.jpg') },
];

const horizontalImages = [
  { id: 1, source: require('../../../assets/images/plan1.jpg') },
  { id: 2, source: require('../../../assets/images/paln2.jpg') },
  { id: 3, source: require('../../../assets/images/paln4.jpg') },
];

const Accueil = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % horizontalImages.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 1000); // 1000 ms = 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur notre application !</Text>
      <Text style={styles.subtitle}>Nous sommes heureux de vous offrir une expérience exceptionnelle.</Text>

      <FlatList
        ref={flatListRef}
        data={horizontalImages}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainerHorizontal}>
            <Image source={item.source} style={styles.imageHorizontal} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />

      <ScrollView style={styles.imageContainer} contentContainerStyle={styles.scrollViewContent}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageWrapper}>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#696969',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 20, // Adjust width to fill screen with some margin
    height: Dimensions.get('window').height / 3, // Adjust height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer: {
    padding: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainerHorizontal: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHorizontal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5, // Adjust height to be larger
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
