import React, { useEffect } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  buttonText: {
    color: '#8a2be2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
