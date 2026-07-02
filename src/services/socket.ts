import { io } from 'socket.io-client';

const socket = io('http://192.168.29.158:5000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  timeout: 10000,
});

socket.on('connect', () => {
  console.log('✅ SOCKET CONNECTED:', socket.id);
});

socket.on('connect_error', (err) => {
  console.log('❌ SOCKET ERROR:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('❌ SOCKET DISCONNECTED:', reason);
});

export default socket;