import { View, Text ,TextInput ,StyleSheet} from 'react-native'
import React from 'react'
import {  Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/FontAwesome';
const CustomInput = ({control , name ,rules = {}, placeholder ,secureTextEntry,icon}) => {

  return (


      <Controller
      control={control}
      name={name}
      rules={rules}

      render={({field:{value , onChange , onBlur},fieldState: {error}})=>(
        <>
      <View style={[styles.container , {borderColor: error ? 'red' : '#e8e8e8'}]}>
      {icon && <Icon name={icon.name} size={icon.size} color={icon.color} style={{ padding: 10 }} />}
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input }

        />
        </View>
        {error && (<Text style={{color:'red', alignSelf:'stretch' }}>{error.message || 'Error'}</Text>)}
        </>
  )}
      />

  )
};
const styles  = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        flexDirection: 'row',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:20,

        paddingHorizontal:10,
       marginVertical:5
    },
    input:{}
})

export default CustomInput