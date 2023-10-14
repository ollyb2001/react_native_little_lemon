import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createStackNavigator();

// Issue with reloading the app after onboarding is complete FIXED

export default function App() {
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const completed = await AsyncStorage.getItem('@onboardingComplete');
                console.log('Onboarding status: ', completed);

                // Determine the initial route
                const initialRouteName = (completed === 'true') ? 'Home' : 'Onboarding';
                setInitialRoute(initialRouteName);
            }
            catch (err) {
                console.log('Error @isOnboardingComplete: ', err);
                setInitialRoute('Onboarding'); 
            }
        };

        checkOnboardingStatus();
    }, []);

    // Don't render navigation until initial route is determined
    if (initialRoute === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
