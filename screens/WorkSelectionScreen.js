import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './WorkSelectionStyles'; // ✅ Novi stilovi za ovaj ekran

const WorkSelectionScreen = ({ route, navigation }) => {
  const { userId, companyId, clientId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Work Type</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TaskList', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>📋 Log Work Hours</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkLogList', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>⏰ Log Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TicketList', { userId, companyId, clientId })}
      >
        <Text style={styles.buttonText}>🚨 Report an Issue</Text>
      </TouchableOpacity>


    </View>
  );
};

export default WorkSelectionScreen;
