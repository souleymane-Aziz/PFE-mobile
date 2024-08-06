import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import COLORS from '../../../constants/color';
import Colors from '../../../constants/Colors';

const Apropos = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ARCHIAR</Text>
        <Text style={styles.subtitle}>L'assistant numérique de construction pour électriciens et architectes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionText}>
          ARCHIAR est une application de pointe conçue spécifiquement pour répondre aux besoins des professionnels du bâtiment pendant la phase de construction des maisons. Grâce à des technologies de scan 3D et d'analyse d'image avancées, ARCHIAR facilite la planification, le suivi et la coordination des travaux électriques et architecturaux.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Principales fonctionnalités</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletText}>• Scan 3D en temps réel : Créez des modèles 3D détaillés des structures, des réseaux électriques et des aménagements au fur et à mesure de la construction.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletText}>• Détection des conflits : L'application identifie automatiquement les interférences potentielles entre les différents éléments du bâtiment pour éviter les problèmes.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletText}>• Planification optimisée : Visualisez en réalité augmentée l'emplacement optimal des équipements électriques et des composants architecturaux.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletText}>• Suivi des travaux : Suivez l'avancement des chantiers, générez des rapports et partagez les informations avec l'ensemble de l'équipe.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletText}>• Intégration BIM : Importez et exportez facilement les données vers les logiciels de modélisation BIM pour une intégration parfaite.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conclusion</Text>
        <Text style={styles.sectionText}>
          ARCHIAR, votre partenaire digital indispensable pour des constructions plus efficaces et de meilleure qualité. Gagnez en productivité, réduisez les erreurs et coordonnez parfaitement vos équipes grâce à cette solution innovante.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Apropos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryclair,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#696969',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryclair,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginLeft: 5,
  },
});
