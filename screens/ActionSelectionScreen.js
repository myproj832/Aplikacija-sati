import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ActionSelectionStyles';

const ActionSelectionScreen = ({ navigation, route }) => {
  const { userId, companyId, clientId } = route.params; // Preuzimamo parametre

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Action</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TaskList', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>📋 Log Work Hours</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkLog', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>⏳ Log Work Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Ticketing', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>🎫 Report an Issue</Text>
      </TouchableOpacity>


    </View>
  );
};

export default ActionSelectionScreen;
