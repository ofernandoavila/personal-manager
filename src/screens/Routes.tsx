import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import Main from './Task/TaskStack';
import Callendar from './Callendar/Callendar';
import Habits from './Habits/Habits';
import User from './User/User';

export default function Routes () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Today'}
        tabBarOptions={{
            activeBackgroundColor: '#1E90FF',
            inactiveBackgroundColor : '#197ee0',
            activeTintColor: '#FFF',
            inactiveTintColor: '#BBB',
        }}
      >
        <Tab.Screen name={'Today'} component={Main} options={{ tabBarIcon: ({color}) => (
            <FontAwesome5 color={color}  name={'check-square'} size={20}/>
        )}} />

        <Tab.Screen name={'Callendar'} component={Callendar} options={{ tabBarIcon: ({color}) => (
            <FontAwesome5 color={color}  name={'calendar-day'} size={20}/>
        )}} />
        
        <Tab.Screen name={'Habits'} component={Habits} options={{ tabBarIcon: ({color}) => (
            <FontAwesome5 color={color}  name={'list'} size={20}/>
        )}} />

        <Tab.Screen name={'User'} component={User} options={{ tabBarIcon: ({color}) => (
            <FontAwesome5 color={color}  name={'user-alt'} size={20}/>
        )}} />
      </Tab.Navigator>
    </NavigationContainer>    
  );
} 