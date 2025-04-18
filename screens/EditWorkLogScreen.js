import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './EditWorkLogStyles';
import { updateWorkLog } from './api';

const EditWorkLogScreen = ({ navigation, route }) => {
  const { workLog, userId } = route.params;

  console.log("📌 Received work log for edit:", workLog);

  if (!workLog || !workLog.id) {
    Alert.alert("Error", "Invalid work log data!");
    navigation.goBack();
    return null;
  }

  const [workDate, setWorkDate] = useState(new Date(workLog.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInTime, setCheckInTime] = useState(workLog.checkIn);
  const [checkOutTime, setCheckOutTime] = useState(workLog.checkOut);
  const [breakStart, setBreakStart] = useState(workLog.breakStart);
  const [breakEnd, setBreakEnd] = useState(workLog.breakEnd);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setWorkDate(selectedDate);
  };

  const handleSave = async () => {
    const formattedDate = workDate.toISOString().split('T')[0];

    console.log("📩 Work log being sent:", {
      logId: workLog.id,
      work_date: formattedDate,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      break_start: breakStart,
      break_end: breakEnd,
    });

    try {
      const response = await updateWorkLog(
        workLog.id,
        checkInTime,
        checkOutTime,
        breakStart,
        breakEnd
      );

      console.log("✅ API Response:", response);

      if (response.message) {
        Alert.alert('Success', 'Work log updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error || 'Failed to update work log.');
      }
    } catch (error) {
      console.error("❌ Error updating work log:", error);
      Alert.alert('Error', 'An error occurred while updating work log.');
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

export default EditWorkLogScreen;
