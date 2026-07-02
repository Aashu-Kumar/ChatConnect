import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return;
    }

    onSend(trimmedMessage);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity
        style={[
        styles.button,
        message.trim().length===0 && {
        opacity:0.5,
        }
        ]}
        disabled={message.trim().length===0}
                onPress={handleSend}>
        <Text style={styles.buttonText}>➤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
  },

  button: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
});