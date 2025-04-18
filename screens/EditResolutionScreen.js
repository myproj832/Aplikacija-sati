import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { updateTicketResolution } from './api';
import styles from './EditResolutionStyles';

const EditResolutionScreen = ({ route, navigation }) => {
  const { ticketId } = route.params;
  const [resolutionComment, setResolutionComment] = useState('');

console.log('ticketId',ticketId);
  const handleSaveResolution = async () => {
    if (!resolutionComment.trim()) {
      Alert.alert('Error', 'Resolution comment cannot be empty.');
      return;
    }

    try {
      const response = await updateTicketResolution(ticketId, resolutionComment);

      if (response.message) {
        Alert.alert('Success', 'Resolution updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', response.error || 'Failed to update resolution.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating resolution.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Resolution Comment:</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe how the issue was resolved..."
        value={resolutionComment}
        onChangeText={setResolutionComment}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveResolution}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditResolutionScreen;
