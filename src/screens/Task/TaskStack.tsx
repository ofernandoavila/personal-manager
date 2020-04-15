import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from './MainTask';
import AddTask from './AddTask';

export default function TaskStack() {
  return (
    <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen name={'Main'} component={Main} options={{ headerShown: false }} />
        <Stack.Screen name={'AddTask'} component={AddTask} options={{ headerShown: false }} />
    </Stack.Navigator>   
  );
} 