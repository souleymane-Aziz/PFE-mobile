import { View, Text ,StyleSheet , Pressable} from 'react-native'
import React from 'react'

const CustomButton = ({onPress , text ,type}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container ,styles[`container_${type}`]]}>
      <Text style={[styles.text , styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
};
const styles = StyleSheet.create({
    container:{

     width:'100%',
     padding:15,
     marginVertical:5,
     alignItems:'center',
     borderRadius:20
    },
    container_PRIMARY:{
        backgroundColor:'#2B97EB',

    },
    container_SECONDARY:{
      borderColor:'#3B71F3',
      borderWidth:2,

    },
    container_TERTIARY:{

    },
    text:{
    fontWeight:'bold',
    color:'white'
    },
    text_TERTIARY:{
        color:'gray'
    },
    text_SECONDARY:{
      color:'#3B71F3'
    },
    container_RETOUR:{
      backgroundColor:'#0000FF'
    }
})

export default CustomButton