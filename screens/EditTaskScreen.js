import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './EditTaskStyles';
import { updateTask } from './api';

const EditTaskScreen = ({ navigation, route }) => {
  const { task } = route.params;
  const [taskName, setTaskName] = useState(task.taskName);
  const [date, setDate] = useState(new Date(task.date));
  const [hours, setHours] = useState(task.hours.toString());
  const [minutes, setMinutes] = useState(task.minutes.toString());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    const updatedTask = {
      id: task.id,
      taskName,
      date: date.toISOString().split('T')[0], // Format YYYY-MM-DD
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0,
    };

    try {
      const response = await updateTask(updatedTask);
      if (response.message === "Task updated successfully") {
        Alert.alert("✅ Success", "Task updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() } // ✅ Vraćanje na listu taskova
        ]);
      } else {
        Alert.alert("❌ Error", "Failed to update task.");
      }
    } catch (error) {
      Alert.alert("❌ Error", "An error occurred while updating the task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Name:</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
      />

      <Text style={styles.label}>Date:</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Time Spent:</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <Text style={styles.label}>h</Text>
        <TextInput
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <Text style={styles.label}>m</Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTaskScreen;
