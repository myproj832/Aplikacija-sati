import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasksForClient } from './api';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import styles from './TaskListStyles';

const TaskListScreen = ({ navigation, route }) => {
  const { userId, companyId, clientId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  // ✅ Grupisanje taskova po godinama i mesecima (sortiranje opadajuće)
// ✅ Grupisanje taskova po godinama i mesecima + sortiranje po datumima unutar meseca
const groupTasksByYearAndMonth = (tasks) => {
  const grouped = {};

  tasks.forEach(task => {
    const [id, taskName, date, hours, minutes, username] = task;
    const [year, month] = date.split('-');

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];

    grouped[year][month].push({ id, taskName, date, hours, minutes, username });
  });

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Godine opadajuće
    .flatMap(([year, months]) =>
      Object.entries(months)
        .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA)) // Meseci opadajuće
        .map(([month, data]) => ({
          title: `${year} - ${month}`,
          data: data.sort((a, b) => new Date(b.date) - new Date(a.date)) // 🆕 Taskovi sortirani po datumu
        }))
    );
};


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasksForClient(userId, clientId);

      if (!response || response.error) {
        Alert.alert('Error', response?.error || 'Failed to fetch tasks.');
        setTasks([]);
      } else {
        const groupedTasks = groupTasksByYearAndMonth(response);
        setTasks(groupedTasks);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch tasks.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const toggleSection = (title) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  // ✅ Izvoz u Excel sada uključuje i korisničko ime
  const exportToExcel = () => {
    const allTasks = tasks.flatMap(section => section.data.map(task => ({
      Date: task.date,
      TaskName: task.taskName,
      TimeSpent: `${task.hours}h ${task.minutes}m`,
      CreatedBy: task.username
    })));

    if (allTasks.length === 0) {
      Alert.alert("No data", "There are no tasks to export.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(allTasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");

    const filePath = `${RNFS.DownloadDirectoryPath}/Tasks.xlsx`;

    const excelOutput = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const buffer = new ArrayBuffer(excelOutput.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelOutput.length; i++) {
      view[i] = excelOutput.charCodeAt(i) & 0xFF;
    }

    RNFS.writeFile(filePath, excelOutput, "ascii")
      .then(() => {
        Alert.alert("Export Successful", `File saved at: ${filePath}`);
      })
      .catch(error => {
        Alert.alert("Export Failed", error.message);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={tasks ?? []}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(title)}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
              <Text style={styles.arrow}>{expandedSections[title] ? "▲" : "▼"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportButton} onPress={exportToExcel}>
              <Text style={styles.exportButtonText}>📥 Export</Text>
            </TouchableOpacity>
          </View>
        )}
      renderItem={({ item, section }) => (
        expandedSections[section.title] ? (
          <View style={styles.taskItem}>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskText}>{item.taskName}</Text>
              <Text style={styles.dateText}>📅 {item.date}</Text>
              <Text style={styles.timeText}>⏱ {item.hours}h {item.minutes}m</Text>
              <Text style={styles.userText}>👤 {item.username}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditTask', { task: item })}
            >
              <Text style={styles.editButtonText}>✏️ </Text>
            </TouchableOpacity>
          </View>
        ) : null
      )}

      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask', { userId, companyId, clientId })}>
        <Text style={styles.addButtonText}>➕ Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;
