import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './WorkLogStyles';
import { addWorkLog } from './api';

const WorkLogScreen = ({ route, navigation }) => {
 const { userId, companyId = null, clientId = null } = route.params || {};

  console.log("🔍 Received params in WorkLogScreen:", { userId, companyId, clientId }); // ✅ Debug log

  const [workDate, setWorkDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInTime, setCheckInTime] = useState('08:00');
  const [checkOutTime, setCheckOutTime] = useState('16:00');
  const [breakStart, setBreakStart] = useState('');
  const [breakEnd, setBreakEnd] = useState('');

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setWorkDate(selectedDate);
  };

  const handleSave = async () => {
    const formattedDate = workDate.toISOString().split('T')[0];

    try {
      console.log("📩 Sending Work Log:", { userId, companyId, clientId, formattedDate, checkInTime, checkOutTime, breakStart, breakEnd });

      const response = await addWorkLog(userId, companyId, clientId, formattedDate, checkInTime, checkOutTime, breakStart, breakEnd);

      if (response.message) {
        Alert.alert('Success', 'Work log saved successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error || 'Failed to save work log.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving work log.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Work Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>{workDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker value={workDate} mode="date" display="calendar" onChange={onChangeDate} />
      )}

      <Text style={styles.label}>Check-In Time</Text>
      <TextInput style={styles.input} value={checkInTime} onChangeText={setCheckInTime} />

      <Text style={styles.label}>Check-Out Time</Text>
      <TextInput style={styles.input} value={checkOutTime} onChangeText={setCheckOutTime} />

      <Text style={styles.label}>Break Start</Text>
      <TextInput style={styles.input} value={breakStart} onChangeText={setBreakStart} />

      <Text style={styles.label}>Break End</Text>
      <TextInput style={styles.input} value={breakEnd} onChangeText={setBreakEnd} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkLogScreen;
