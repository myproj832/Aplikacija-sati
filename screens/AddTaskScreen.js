import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from './api';
import styles from './AddTaskStyles';

const AddTaskScreen = ({ route, navigation }) => {
  const { userId, companyId, clientId } = route.params;

  const [taskName, setTaskName] = useState('');
  const [dateWorked, setDateWorked] = useState(new Date());
  const [hoursWorked, setHoursWorked] = useState('');
  const [minutesWorked, setMinutesWorked] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateWorked(selectedDate);
    }
  };

  const handleSaveTask = async () => {
    const formattedDate = dateWorked.toISOString().split('T')[0];

    const taskData = {
      user_id: userId,
      client_id: clientId,
      company_id: companyId,
      task_name: taskName,
      date_worked: formattedDate,
      hours_worked: parseInt(hoursWorked) || 0,
      minutes_worked: parseInt(minutesWorked) || 0
    };

    try {
      const response = await addTask(userId, clientId, companyId, taskName, formattedDate, parseInt(hoursWorked), parseInt(minutesWorked));
      console.log("✅ API Response:", response);

      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        Alert.alert('Success', 'Task added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('TaskList', { userId, companyId, clientId, refresh: true }) }
        ]);
      }
    } catch (error) {
      console.error("❌ Error adding task:", error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>📅 {dateWorked.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker value={dateWorked} mode="date" display="calendar" onChange={onChangeDate} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskName}
        onChangeText={setTaskName}
      />


      <View style={styles.rowContainer}>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={hoursWorked}
          onChangeText={setHoursWorked}
          placeholder="Hours"
        />
        <Text style={styles.timeLabel}>h</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={minutesWorked}
          onChangeText={setMinutesWorked}
          placeholder="Minutes"
        />
        <Text style={styles.timeLabel}>m</Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>SAVE TASK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;
