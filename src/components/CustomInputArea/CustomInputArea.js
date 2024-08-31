import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import de l'icône

const CustomTextarea = ({ icon }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.textarea, icon && { paddingLeft: 15 }]} // Ajustement du paddingLeft si icône présente
        placeholder="Description"
        multiline={true}
        numberOfLines={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligner l'icône en haut
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingTop: 10, // Ajouter un peu de padding en haut pour centrer le contenu
  },
  icon: {
    paddingTop: 5,  // Positionner l'icône légèrement plus haut
    paddingRight: 5, // Réduire l'espace entre l'icône et le placeholder
    paddingLeft: 8
  },
  textarea: {
    flex: 1,
    height: 100,
    textAlignVertical: 'top',
    paddingLeft: 0, // Alignement du texte à gauche de l'icône
  },
});

export default CustomTextarea;
