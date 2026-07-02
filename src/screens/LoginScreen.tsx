import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');

  const handleContinue = () => {
  const username = name.trim();

  if (!username) {
    return;
  }

  navigation.navigate('Chat', {
    username,
  });
};

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💬</Text>

      <Text style={styles.title}>ChatConnect</Text>

      <Text style={styles.subtitle}>Real Time Chat Application</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}>
        <Text style={styles.buttonText}>Join Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 25,
  },

  logo: {
    fontSize: 70,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 20,
  },

  subtitle: {
    marginTop: 10,
    color: '#666',
    marginBottom: 40,
    fontSize: 16,
  },

  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },
});