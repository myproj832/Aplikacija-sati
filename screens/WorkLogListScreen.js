import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserWorkLogs } from './api';
import styles from './WorkLogListStyles';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

const WorkLogListScreen = ({ navigation, route }) => {
  const { userId, companyId, clientId } = route.params;
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      fetchWorkLogs();
    }, [])
  );

  const fetchWorkLogs = async () => {
    try {
      setLoading(true);
      const response = await getUserWorkLogs(userId);

      if (!response || response.error) {
        Alert.alert('Error', response?.error || 'Failed to fetch work logs.');
        setWorkLogs([]);
      } else {
        setWorkLogs(response);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch work logs.');
      setWorkLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (title) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  // Funkcija za export podataka u Excel
  const exportToExcel = (section) => {
    if (!section.data || section.data.length === 0) {
      Alert.alert("Export Error", "No data available for export.");
      return;
    }

    const worksheetData = section.data.map(item => ({
      "Date": item.date,
      "Name": item.username,
      "Check-In": item.checkIn,
      "Check-Out": item.checkOut,
      "Break Start": item.breakStart,
      "Break End": item.breakEnd
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WorkLogs");

    // Kreiranje fajla
    const filePath = `${RNFS.DownloadDirectoryPath}/WorkLogs_${section.title}.xlsx`;
    const excelOutput = XLSX.write(wb, { type: 'base64', bookType: "xlsx" });

    RNFS.writeFile(filePath, excelOutput, 'base64')
      .then(() => Alert.alert("Success", `Excel file saved to: ${filePath}`))
      .catch(error => Alert.alert("Error", "Failed to save Excel file."));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading work logs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={workLogs ?? []}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderContainer}>
            <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(section.title)}>
              <Text style={styles.sectionHeaderText}>{String(section.title)}</Text>
              <Text style={styles.arrow}>{expandedSections[section.title] ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {/* Dugme za Export */}
            <TouchableOpacity style={styles.exportButton} onPress={() => exportToExcel(section)}>
              <Text style={styles.exportButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, section }) => (
          expandedSections[section.title] ? (
            <View style={styles.logItem}>
              <View style={styles.logDetails}>
                <Text style={styles.dateText}>📅 {String(item.date)}</Text>
                <Text style={styles.timeText}>⏱ Check-in: {String(item.checkIn)} - Check-out: {String(item.checkOut)}</Text>
                <Text style={styles.breakText}>☕ Break: {String(item.breakStart)} - {String(item.breakEnd)}</Text>
                <Text style={styles.userText}>👤 {String(item.username)}</Text>
              </View>

              {/* Dugme za uređivanje */}
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={() => navigation.navigate('EditWorkLog', { workLog: item, userId })}
              >
                <Text style={styles.editIcon}>✎</Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      />

      {/* Dugme za dodavanje novog Work Log-a */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('WorkLog', { userId, companyId, clientId })}
      >
        <Text style={styles.addButtonText}>➕ Add Work Log</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkLogListScreen;
