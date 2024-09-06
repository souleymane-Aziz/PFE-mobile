import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking, Dimensions, Platform } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SERVER_URL = 'http://192.168.1.2:5000/api/detection/detect'; // Replace with your server address
const SERVER_URL_PHOTO = 'http://192.168.1.2:5000/api/projets/upload-photo-model';
const GET_USER = 'http://192.168.1.2:5000/api/user/currentclient';



const CameraScreen = () => {
  const cameraRef = useRef(null);
  const viewShotRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const [torch, setTorch] = useState('off');
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [loading, setLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [drawing, setDrawing] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [user, setUser] = useState({});
  const [projet, setProjet] = useState({});

  //recuperer le nom de l'utilisateur connecté
  const fetchUserData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        console.log('storedToken :', storedToken)
        const response = await axios.get(GET_USER, {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [user]);


  //code camera
  useEffect(() => {
    const requestPermissions = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    };

    requestPermissions();
  }, []);

  const detectObjects = useCallback(async (photoPath, photoWidth, photoHeight) => {
    try {
      const formData = new FormData();
      formData.append('image_file', {
        uri: `file://${photoPath}`,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post(SERVER_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const screen = Dimensions.get('window');
      const screenRatio = screen.width / screen.height;
      const photoRatio = photoWidth / photoHeight;

      const updatedBoxes = response.data.map(box => {
        const [x1, y1, x2, y2, label, probability] = box;
        const x = x1 * screen.width;
        const y = y1 * screen.height;
        const width = (x2 - x1) * screen.width;
        const height = (y2 - y1) * screen.height;

        if (photoRatio > screenRatio) {
          const scaleFactor = screen.width / photoWidth;
          return {
            x: x * scaleFactor,
            y: y * scaleFactor,
            width: width * scaleFactor,
            height: height * scaleFactor,
            class: label,
            probability,
          };
        } else {
          const scaleFactor = screen.height / photoHeight;
          return {
            x: x * scaleFactor,
            y: y * scaleFactor,
            width: width * scaleFactor,
            height: height * scaleFactor,
            class: label,
            probability,
          };
        }
      });

      setBoxes(updatedBoxes);
    } catch (error) {
      console.log('Error sending photo to server:', error);
    }
  }, []);

  const captureFrame = useCallback(async () => {
    if (!cameraRef.current || isDetecting) return;
    setIsDetecting(true);

    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
        flash: torch,
        skipMetadata: true,
      });

      const photoWidth = photo.width || Dimensions.get('window').width;
      const photoHeight = photo.height || Dimensions.get('window').height;

      await detectObjects(photo.path, photoWidth, photoHeight);
    } catch (error) {
      console.log('Error capturing frame:', error);
    }
    setIsDetecting(false);
  }, [detectObjects, torch, isDetecting]);

  useEffect(() => {
    const interval = setInterval(captureFrame, 1000 / 1); // Capture frames at 1 FPS
    return () => clearInterval(interval);
  }, [captureFrame]);

  const handleTouchStart = useCallback((event) => {
    setIsDrawing(true);
    const { locationX, locationY } = event.nativeEvent;
    setDrawing([{ x: locationX, y: locationY }]);
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (!isDrawing) return;
    const { locationX, locationY } = event.nativeEvent;
    setDrawing((prev) => [...prev, { x: locationX, y: locationY }]);
  }, [isDrawing]);

  const handleTouchEnd = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const renderShapes = () => {
    if (drawing.length < 2) return null;

    const shapes = [];
    for (let i = 1; i < drawing.length; i++) {
      const { x: x1, y: y1 } = drawing[i - 1];
      const { x: x2, y: y2 } = drawing[i];
      shapes.push(<Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="blue" strokeWidth="5" />);
    }
    return shapes;
  };

  const saveAndUploadPhoto = async () => {
    setLoading(true);
    try {
      if (!cameraRef.current) {
        throw new Error('Camera Ref is Null');
      }

      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
      });

      await detectObjects(photo.path, photo.width, photo.height);

      viewShotRef.current.capture().then(async (uri) => {
        // Save the combined photo to the gallery
        await CameraRoll.save(uri, { type: 'photo' });
        console.log('Combined photo saved to gallery:', uri);

        // Send the combined photo to the server
        const createur = user.nom;
        const formData = new FormData();
        formData.append('createur', createur);
        formData.append('photo', {
          uri: Platform.OS === 'android' ? `file://${uri}` : uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await axios.post(SERVER_URL_PHOTO, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Photo uploaded to server:', response.data);
      });
    } catch (error) {
      console.log('Error saving or uploading combined photo:', error);
    }
    setLoading(false);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera Not Available</Text>
      </View>
    );
  }

  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          photo={true}
          isActive={true}
          ref={cameraRef}
          enableZoomGesture={true}
          frameProcessorFps={1}
        />
        <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill} options={{ format: 'jpg', quality: 0.9 }}>
          <View
            style={StyleSheet.absoluteFill}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Svg style={StyleSheet.absoluteFill}>
              {boxes.map((box, index) => (
                <React.Fragment key={index}>
                  <Rect
                    x={box.x}
                    y={box.y}
                    width={box.width}
                    height={box.height}
                    stroke="red"
                    strokeWidth="3"
                    fill="none"
                  />
                  <SvgText
                    x={box.x}
                    y={box.y - 10}
                    fill="red"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="start"
                  >
                    {`${box.class} (${(box.probability * 100).toFixed(1)}%)`}
                  </SvgText>
                </React.Fragment>
              ))}
              {renderShapes()}
            </Svg>
          </View>
        </ViewShot>
      </View>
      <View style={styles.shutterContainer}>
        <TouchableOpacity onPress={saveAndUploadPhoto}>
          <View style={styles.shutter}>
            <View style={styles.shutterBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraFlashBtn} onPress={() => setTorch(torch === 'on' ? 'off' : 'on')}>
          <Text style={styles.flashText}>{torch === 'on' ? 'Torch On' : 'Torch Off'}</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loading}>
          <Text>Saving and uploading photo...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cameraFlashBtn: {
    padding: 10,
  },
  flashText: {
    color: 'white',
    fontSize: 18,
  },
  shutter: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: 'white',
  },
  shutterBtn: {
    top: 1,
    left: 0.75,
    backgroundColor: 'white',
    height: 54,
    width: 54,
    borderRadius: 55,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
  },
});


export default CameraScreen;