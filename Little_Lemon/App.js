import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation Container is the parent component for all navigation
const Stack = createStackNavigator();

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    // Check if onboarding is complete or not
    const checkOnboardingStatus = async () => {
      try {
        // Get the value from AsyncStorage and store it in a variable
        const completed = await AsyncStorage.getItem('@onboardingComplete');

        // If the value is not null, the user has completed onboarding and should be taken to the home screen
        if (completed !== null) {
          setIsOnboardingComplete(true);
        }
      }

      // Catch any errors within onboarding
      catch (err) {
        console.log('Error @isOnboardingComplete: ', err);
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <NavigationContainer>
      {/* Stack Navigator is the parent component for all the screens in the app */}
      <Stack.Navigator initialRouteName={isOnboardingComplete ? "Home" : "Onboarding"} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
    }