import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomTextarea = ({ control, name, rules = {}, placeholder, icon }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            {icon && (
              <Icon name={icon.name} size={icon.size} color={icon.color} style={{ padding: 10 }} />
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              multiline={true}
              style={styles.textarea}
              textAlignVertical="top" // Aligne le texte en haut
            />
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  textarea: {
    flex: 1,
    height: 100, // Hauteur fixe pour le textarea
    padding: 10, // Padding pour le texte
  },
});

export default CustomTextarea;