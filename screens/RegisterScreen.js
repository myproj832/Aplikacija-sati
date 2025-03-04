import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from './api';
import styles from './RegisterStyles'; // ✅ Import stilova

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    const response = await registerUser(email, password, username);

    if (response.message) {
      Alert.alert('Success', response.message);
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', response.error || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput style={styles.input} placeholder="Full Name" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
