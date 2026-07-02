import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';

export type RootStackParamList = {
  Login: undefined;
  Chat: {
    username: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
            name="Chat"
            component={ChatScreen}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;