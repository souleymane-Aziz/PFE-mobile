import React, { useEffect, useState, useRef } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Dimensions, PanResponder } from 'react-native';
import axios from 'axios';
import Api from '../../../ApiUrl/Api'
const { width, height } = Dimensions.get('window');

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const panResponder = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await Api.get('/api/projets/ClientPhotos');
        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedPhotoIndex(null);
  };

  // Initialize PanResponder for swipe gestures
  useEffect(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) { // Detect swipe gestures
          if (gestureState.dx > 50) { // Swipe right
            setSelectedPhotoIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
          } else if (gestureState.dx < -50) { // Swipe left
            setSelectedPhotoIndex(prevIndex => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
          }
        }
      },
      onMoveShouldSetPanResponder: () => true,
    });
  }, [photos]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <TouchableOpacity key={index} onPress={() => handlePhotoClick(index)}>
              <Image
                source={{ uri: `http://192.168.1.2:5000/${photo}` }}
                style={styles.photo}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noPhotosText}>Aucune photo disponible</Text>
        )}
      </ScrollView>

      {/* Modal for displaying the full-screen image */}
      {selectedPhotoIndex !== null && (
        <Modal
          visible={true}
          transparent={true}
          onRequestClose={handleCloseModal}
          animationType="fade"
        >
          <View style={styles.modalContainer} {...panResponder.current.panHandlers}>
            <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal} activeOpacity={1}>
              <Image
                source={{ uri: `http://192.168.1.2:5000/${photos[selectedPhotoIndex]}` }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  photo: {
    width: (width / 2) - 20,
    height: (width / 2) - 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  noPhotosText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width - 40,
    height: height - 80,
    borderRadius: 15,
  },
});

export default Photos;