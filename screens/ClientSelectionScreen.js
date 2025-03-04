import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './ClientSelectionStyles'; // ✅ Import stila
import { getClientsForUserAndCompany } from './api';

const ClientSelectionScreen = ({ route, navigation }) => {
  const { userId, companyId } = route.params; // ✅ Dobijamo companyId iz navigacije
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("✅ Company ID received in ClientSelection:", companyId);

    const fetchClients = async () => {
      try {
        const response = await getClientsForUserAndCompany(userId, companyId);
        console.log("📢 Clients API response:", response);

        if (!Array.isArray(response)) {
          console.error("🚨 Invalid API response format:", response);
          Alert.alert('Error', 'Invalid response format.');
          return;
        }

        if (response.error) {
          Alert.alert('Error', response.error);
        } else {
          setClients(response);
        }
      } catch (error) {
        console.error("❌ Error fetching clients:", error);
        Alert.alert('Error', 'Failed to fetch clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [userId, companyId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading clients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {clients.length > 0 ? (
        clients.map((client, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              console.log("📌 Navigating to TaskList with:", { userId, clientId: client[0], companyId });
              navigation.navigate('TaskList', { userId, clientId: client[0], companyId });
            }}
          >
            <Text style={styles.buttonText}>{client[1]}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loadingText}>No clients found</Text>
      )}
    </View>
  );
};

export default ClientSelectionScreen;
