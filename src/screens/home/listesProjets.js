import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Api from '../../../ApiUrl/Api';

const ProjectsScreen = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Api.get('/api/projets/Allprojets');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project === selectedProject ? null : project);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {projects.map((project) => (
        <TouchableOpacity
          key={project._id}
          style={styles.projectContainer}
          onPress={() => handleProjectClick(project)}
        >
          <Text style={styles.projectName}>{project.nomProjet}</Text>
          {selectedProject === project && (
            <View style={styles.projectDetails}>
              <Text>Description: {project.description}</Text>
              <Text>nompiece: {project.nomPiece}</Text>
              <Text>nombrepiece: {project.nombrePiece}</Text>
              <Text>dateCreation: {project.dateCreation}</Text>
              <Text>photos: {project.photos}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Assure que les items sont espacés uniformément
    padding: 8,
  },
  projectContainer: {
    width: (width / 2) - 16, // 50% de la largeur de l'écran, moins la marge
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDetails: {
    marginTop: 8,
  },
});

export default ProjectsScreen;
