import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../../constants/color'

const Apropos = () => {
  return (
    <View
      style={styles.container}>
      <Text>"ARCHIAR - L'assistant numérique de construction pour électriciens et architectes

ARCHIAR est une application de pointe conçue spécifiquement pour répondre aux besoins des professionnels du bâtiment pendant la phase de construction des maisons. Grâce à des technologies de scan 3D et d'analyse d'image avancées, ARCHIAR facilite la planification, le suivi et la coordination des travaux électriques et architecturaux.

Principales fonctionnalités :

Scan 3D en temps réel : Créez des modèles 3D détaillés des structures, des réseaux électriques et des aménagements au fur et à mesure de la construction.
Détection des conflits : L'application identifie automatiquement les interférences potentielles entre les différents éléments du bâtiment pour éviter les problèmes.
Planification optimisée : Visualisez en réalité augmentée l'emplacement optimal des équipements électriques et des composants architecturaux.
Suivi des travaux : Suivez l'avancement des chantiers, générez des rapports et partagez les informations avec l'ensemble de l'équipe.
Intégration BIM : Importez et exportez facilement les données vers les logiciels de modélisation BIM pour une intégration parfaite.
ARCHIAR, votre partenaire digital indispensable pour des constructions plus efficaces et de meilleure qualité. Gagnez en productivité, réduisez les erreurs et coordonnez parfaitement vos équipes grâce à cette solution innovante."</Text>
    </View>
  );
};

export default Apropos;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:20
  }
});