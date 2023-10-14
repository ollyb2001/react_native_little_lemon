import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function Onboarding() {

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem('@first_name');
      await AsyncStorage.removeItem('@email');   
    } catch (error) {
      console.error("Error resetting data", error);
    }
  };

    //Navigation
    const navigation = useNavigation();

    // Variables for Text Input
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');

    // For Button to be disabled if fields are empty
    const isDisabled = !FirstName || !Email;

    // Function to store data in AsyncStorage

    const storeData = async () => {
        try {
          await AsyncStorage.setItem('@first_name', FirstName)
          await AsyncStorage.setItem('@email', Email)
          await AsyncStorage.setItem('@onboardingComplete', 'true')
    
          navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", "There was an error saving your information.");
            console.error(error);
        }
      }

      // Function to handle button press which checks if fields are empty

      const handleOnPress = () => {
        if (FirstName === '' || Email === '') {
          Alert.alert("Input Error", "Please fill in all fields.");
        } else {
          storeData();
        }
      };

      useEffect(() => {
        handleReset();
      }
      , []);
        

        
return (
  <View style={styles.container}>

    <Header />

  <View style={styles.body}>
    <View style={styles.bodyHeaderSection}>
      <Text style={styles.bodyText}>Lets Get to know you!</Text>
    </View>

    <View style={styles.bodyTextSection}>
    <Text style={{fontSize:25, textAlign:"center"}}>First Name</Text>
      <TextInput
        style={styles.TextInputStyle}
        onChangeText={setFirstName}
        value={FirstName}
        placeholder="First Name"
      />
      <Text style={{fontSize:25, textAlign:"center", marginTop:20}}>Email</Text>
      <TextInput
        style={styles.TextInputStyle}
        onChangeText={setEmail}
        value={Email}
        placeholder="Email"
      />
    </View>
  </View>

  <View style={styles.footer}>
  <TouchableOpacity 
style={[styles.button, isDisabled && styles.disabledButton]} 
onPress={handleOnPress}
disabled={isDisabled}
>
<Text style={styles.buttonText}>Log In</Text>
</TouchableOpacity>
  </View>
</View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 124,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#F4CE14',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 40,
    paddingLeft: 60,
  },
  body: {
    flex: 9,
    width: '100%',
    backgroundColor: '#495E57',
    padding: 20,
  },
  bodyHeaderSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bodyTextSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  TextInputStyle: {
    height: 60,
    width: "90%",
    borderColor: 'gray',
    borderWidth: 3,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    paddingLeft: 20,
    fontSize: 15,
  },
  bodyText: {
    fontSize: 30,
    color: '#F4CE14',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 80,
  },
  footer: {
    width: '100%',
    height: 80,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#F4CE14',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
  },





})