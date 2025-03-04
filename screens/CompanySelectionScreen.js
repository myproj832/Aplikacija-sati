import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './CompanySelectionStyles'; // ✅ Import stila
import { getUserCompanies } from './api';

const CompanySelectionScreen = ({ navigation, route }) => {
  const { userId } = route.params; // Dohvatanje userId iz navigacije
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      console.log("✅ Fetching companies for userId:", userId);

      try {
        const response = await getUserCompanies(userId);
        console.log("📢 Response from API:", response);

        if (!Array.isArray(response)) {
          console.error("🚨 Invalid API response format:", response);
          Alert.alert('Error', 'Invalid response format.');
          return;
        }

        if (response.error) {
          Alert.alert('Error', response.error);
        } else {
          setCompanies(response);
        }
      } catch (error) {
        console.error("❌ Error fetching companies:", error);
        Alert.alert('Error', 'Failed to fetch companies.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading companies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {companies.length > 0 ? (
        companies.map((company, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              navigation.navigate('ClientSelection', { userId, companyId: company[0] });
            }}
          >
            <Text style={styles.buttonText}>{company[1]}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loadingText}>No companies available</Text>
      )}
    </View>
  );
};

export default CompanySelectionScreen;
