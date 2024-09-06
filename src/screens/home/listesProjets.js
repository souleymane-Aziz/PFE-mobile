import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const Scanner = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:5000/api/projets/ClientProjects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    setSelectedProjectIds((prevSelected) =>
      prevSelected.includes(projectId)
        ? prevSelected.filter(id => id !== projectId) // Deselect if already selected
        : [...prevSelected, projectId] // Add to selection
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        {projects.map((project) => (
          <TouchableOpacity
            key={project._id}
            style={styles.projectContainer}
            onPress={() => handleProjectClick(project._id)}
          >
            <View style={styles.projectSquare}>
              <Text style={styles.projectName}>{project.nomProjet}</Text>
            </View>
            {selectedProjectIds.includes(project._id) && (
              <View style={styles.projectDetails}>
                <Text style={styles.projectAttribute}>Description: {project.description}</Text>
                <Text style={styles.projectAttribute}>Nom de la pièce: {project.nomPiece}</Text>
                <Text style={styles.projectAttribute}>Nombre de pièces: {project.nombrePiece}</Text>
                <Text style={styles.projectAttribute}>Date de création: {new Date(project.dateCreation).toLocaleDateString()}</Text>
                <Text style={styles.photosTitle}>Photos</Text>
                <View style={styles.photosContainer}>
                  {project.photos.map((photo, index) => (
                    <Image
                      key={index}
                      source={{ uri: `http://192.168.1.2:5000/${photo}` }} // Adjust the URL as needed
                      style={styles.photo}
                    />
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background color for the container
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projectContainer: {
    width: '48%', // Keeps the width of each square
    marginBottom: 16,
    backgroundColor: '#fff', // White background for each project container
    borderRadius: 12, // Rounded corners for the container
    overflow: 'hidden', // Ensures rounded corners are applied to child elements
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
    elevation: 5, // Shadow elevation for Android
  },
  projectSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Slightly darker background color
    borderRadius: 12,
    padding: 16,
    height: 100, // Fixed height for a more consistent look
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
  projectDetails: {
    padding: 16,
  },
  projectAttribute: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666', // Lighter text color for attributes
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#333', // Dark text color for title
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  photo: {
    width: 90, // Increased size for better visibility
    height: 90,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 12, // Rounded corners for photos
    borderWidth: 1, // Border around photos
    borderColor: '#ddd', // Light border color
  },
});

export default Scanner;