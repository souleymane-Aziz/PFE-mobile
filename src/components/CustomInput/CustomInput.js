import { View, Text ,TextInput ,StyleSheet} from 'react-native'
import React from 'react'
import {  Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
const CustomInput = ({control ,value, name ,rules = {}, placeholder ,secureTextEntry,icon, onValueChange, items,label }) => {

  return (


      <Controller
      control={control}
      name={name}
      rules={rules}
      value={value}

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
        {/* <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={{ height: 50, width: 380 }}
      >
        {items &&
          items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
      </Picker> */}


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