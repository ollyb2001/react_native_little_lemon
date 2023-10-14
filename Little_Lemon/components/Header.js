import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header() {

// Navigation
const navigation = useNavigation();


const [profileImage, setProfileImage] = useState(null);
const [isUserSignedIn, setIsUserSignedIn] = useState(false);

useEffect(() => {
    // Check if user is signed in or not by checking AsyncStorage
    const checkIfSignedIn = async () => {
      try {
        const firstName = await AsyncStorage.getItem('@first_name');
        const email = await AsyncStorage.getItem('@email');
  
        if (firstName !== null && email !== null) {
          console.log('User is signed in'); 
          setIsUserSignedIn(true);
        }
        else {
          console.log('User is NOT signed in'); 
          setIsUserSignedIn(false);
        }
      } catch (err) {
        console.log('Error @isUserSignedIn: ', err);
      }
    };

    const fetchProfileImage = async () => {
      try {
          const savedImageUri = await AsyncStorage.getItem('@profileImage');
          if (savedImageUri) {
              setProfileImage(savedImageUri);
          }
      } catch (error) {
          console.log('Error fetching profile image:', error);
      }
  };

  // Fetch the profile image when component mounts
    fetchProfileImage();
  
  // Check if user is signed in when component mounts
    checkIfSignedIn();

 // Add listener to fetch profile image when screen is focused
    const unsubscribe = navigation.addListener('focus', fetchProfileImage);
    return unsubscribe;
}, [navigation]);
  


  return (
    

    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />

    {isUserSignedIn && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
          accessible={true}
          accessibilityLabel="Go to Profile"
          accessibilityHint="Navigates to the user's profile screen"
        >
          {profileImage ? 
            <Image source={{ uri: profileImage }} style={styles.buttonImage} /> :
            <Image source={require('../assets/Profile.png')} style={styles.buttonImage} />
          }
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        marginTop: 40,
      },
      button: {
        position: 'absolute',
        right: 20,
        top: 50,
        backgroundColor: 'black',
        borderRadius: 25,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      },
      buttonImage: {
        width: 40, 
        height: 40,
        borderRadius: 25,
      },
})