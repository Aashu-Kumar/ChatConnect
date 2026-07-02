import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import socket from '../services/socket';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/MessageInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

const ChatScreen = ({ route }: Props) => {
  const { username } = route.params;

  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {

    socket.on('connect', () => {
        setIsConnected(true);
    });

    socket.on('disconnect', () => {
        setIsConnected(false);
    });

    socket.off('receive_message');

    socket.on('receive_message', (message: Message) => {
    setMessages(previous => [...previous, message]);

    setTimeout(() => {
    flatListRef.current?.scrollToEnd({
        animated: true,
    });
    }, 100);

    });

    return () => {

        socket.off('receive_message');
        socket.off('connect');
        socket.off('disconnect');

    };

    }, []);

  const handleSend = (message: string) => {

    const newMessage: Message = {
    id: Date.now().toString(),
    sender: username,
    text: message,
    time: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
};

    socket.emit('send_message', newMessage);
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <View style={styles.header}>
        <View>
            <Text style={styles.title}>💬 ChatConnect</Text>

            <Text style={styles.subtitleHeader}>
                Real-Time Chat
            </Text>
        </View>

        <Text style={styles.online}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </Text>
    </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={[
        styles.chatArea,
        messages.length===0 && styles.emptyContainer
    ]}
    ListEmptyComponent={
        <View style={styles.emptyView}>

            <Text style={styles.emptyIcon}>💬</Text>

            <Text style={styles.emptyTitle}>
                Welcome to ChatConnect
            </Text>

            <Text style={styles.emptySubtitle}>
                Start chatting by sending your first message.
            </Text>

        </View>
    }
    renderItem={({item})=>(
        <MessageBubble
        sender={item.sender}
        text={item.text}
        mine={item.sender === username}
        time={item.time}
        />
    )}
/>

      <ChatInput onSend={handleSend} />

  </KeyboardAvoidingView>  

    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({

  user: {
    color: '#E5E7EB',
    fontSize: 13,
    marginTop: 3,
    },  

  subtitleHeader:{
    color:'#DCE8FF',
    fontSize:13,
    marginTop:2,
    },

  container:{
    flex:1,
    backgroundColor:'#F5F7FB',
  },

  header:{
    height:70,
    backgroundColor:'#2563EB',

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    paddingHorizontal:20,

    elevation:6,
  },

  title:{
    color:'white',
    fontSize:22,
    fontWeight:'700',
  },

  online:{
    color:'white',
    fontWeight:'600',
  },

  chatArea:{
    padding:15,
  },

  emptyContainer:{
    flexGrow:1,
    justifyContent:'center',
},

emptyView:{
    alignItems:'center',
},

emptyIcon:{
    fontSize:70,
},

emptyTitle:{
    marginTop:20,
    fontSize:22,
    fontWeight:'700',
    color:'#1F2937',
},

emptySubtitle:{
    marginTop:10,
    fontSize:15,
    color:'#6B7280',
    textAlign:'center',
},

});