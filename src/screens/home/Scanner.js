import { View, Text ,StyleSheet} from 'react-native'
import React,{ useState, useEffect } from 'react'
import { Camera, useCameraDevice, NoCameraErrorView } from 'react-native-vision-camera';


const Scanner = () => {

  const device = useCameraDevice('front')

  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission)
  };


  if (device == null) return <NoCameraDeviceError />
  return (
    <View style={{flex:1}}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      </View>

  )
  };

  export default Scanner;