import React, { useEffect } from 'react';
import styles from './WelcomeStyles';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  useEffect(() => {
    // Automatski prebacuje na Login Screen nakon 3 sekunde
    const timer = setTimeout(() => {
      navigation.replace('Login'); // ✅ Navigacija na Login Screen
    }, 3000);

    return () => clearTimeout(timer); // Očisti timer kad se komponenta unmountuje
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/navira-logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Your vision, our mission</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>WELCOME</Text>
      </TouchableOpacity>

    </View>
  );
};


export default WelcomeScreen;
