import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getProblemTypes, addTicket } from './api';
import styles from './AddTicketStyles';

const AddTicketScreen = ({ route, navigation }) => {
  const { userId, companyId, clientId } = route.params;

  // State za listu problema i izabranu vrednost
  const [problemTypes, setProblemTypes] = useState([]);
  const [selectedProblemType, setSelectedProblemType] = useState('');
  const [description, setDescription] = useState('');

  // ✅ Fetch problem types iz API-ja
  useEffect(() => {
    const fetchProblemTypes = async () => {
      const response = await getProblemTypes();
      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setProblemTypes(response);
      }
    };
    fetchProblemTypes();
  }, []);



  const handleSave = async () => {
    if (!selectedProblemType || !description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const response = await addTicket(userId, companyId, clientId, selectedProblemType, description, null);

    if (response.message) {
      Alert.alert('Success', 'Ticket reported successfully.');
      navigation.goBack();
    } else {
      Alert.alert('Error', response.error || 'Failed to report ticket.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Problem Type</Text>

      {/* 📌 Picker dropdown za vrste problema */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedProblemType}
          onValueChange={(itemValue) => setSelectedProblemType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Problem Type" value="" />
          {problemTypes.map((item) => (
            <Picker.Item key={item.id} label={item.problem_type} value={item.id} />
          ))}
        </Picker>
      </View>
   <Text style={styles.label}>Description</Text>
    <TextInput
      style={styles.descriptionInput} // ✅ Novi stil umesto styles.input
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={50} // ✅ Omogućava unos u više linija
      placeholder="Describe the issue in detail..."
      textAlignVertical="top" // ✅ Podesi početni unos na vrh polja
    />


      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTicketScreen;
