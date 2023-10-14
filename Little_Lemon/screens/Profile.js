import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from 'react-native-check-box';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function Profile() {
    // State variables and navigation
    const navigation = useNavigation();

    // State variables for user data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isCheckedOrder, setIsCheckedOrder] = useState(false);
    const [isCheckedPassword, setIsCheckedPassword] = useState(false);
    const [isCheckedOffers, setIsCheckedOffers] = useState(false);
    const [isCheckedNews, setIsCheckedNews] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    // Function to fetch user data from AsyncStorage
    useEffect(() => {
    requestMediaLibraryPermissions();
    fetchUserData();
    }, []);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
    }
  };

  // Function to fetch user data from AsyncStorage

  const fetchUserData = async () => {
    try {
        const savedFirstName = await AsyncStorage.getItem('@first_name');
        const savedLastName = await AsyncStorage.getItem('@last_name');
        const savedEmail = await AsyncStorage.getItem('@email');
        const savedPhoneNumber = await AsyncStorage.getItem('@phone_number');
        const savedIsCheckedOrder = await AsyncStorage.getItem('@isCheckedOrder');
        const savedIsCheckedPassword = await AsyncStorage.getItem('@isCheckedPassword');
        const savedIsCheckedOffers = await AsyncStorage.getItem('@isCheckedOffers');
        const savedIsCheckedNews = await AsyncStorage.getItem('@isCheckedNews');
        const savedProfileImage = await AsyncStorage.getItem('@profileImage');

        // Check if the values are not null before setting them
        // This is because AsyncStorage returns null if the key does not exist

        if (savedFirstName !== null) setFirstName(savedFirstName);
        if (savedLastName !== null) setLastName(savedLastName);
        if (savedEmail !== null) setEmail(savedEmail);
        if (savedPhoneNumber !== null) setPhoneNumber(savedPhoneNumber);
        if (savedIsCheckedOrder !== null) setIsCheckedOrder(JSON.parse(savedIsCheckedOrder));
        if (savedIsCheckedPassword !== null) setIsCheckedPassword(JSON.parse(savedIsCheckedPassword));
        if (savedIsCheckedOffers !== null) setIsCheckedOffers(JSON.parse(savedIsCheckedOffers));
        if (savedIsCheckedNews !== null) setIsCheckedNews(JSON.parse(savedIsCheckedNews));
        if (savedProfileImage !== null) setProfileImage(savedProfileImage);
    } catch (error) {
      console.error(error);
    }
  };

    // Function to reset user data in AsyncStorage from button press

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem('@first_name');
      await AsyncStorage.removeItem('@last_name');
      await AsyncStorage.removeItem('@email');
      await AsyncStorage.removeItem('@phone_number');
      await AsyncStorage.removeItem('@isCheckedOrder');
      await AsyncStorage.removeItem('@isCheckedPassword');
      await AsyncStorage.removeItem('@isCheckedOffers');
      await AsyncStorage.removeItem('@isCheckedNews');
      await AsyncStorage.removeItem('@profileImage');
      await AsyncStorage.setItem('@onboardingComplete', 'false')
      
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error("Error resetting data", error);
    }
  };

  // Function to handle submit from button press

  const handleSubmit = async () => {
    try {
      // Save the user data to AsyncStorage
      await AsyncStorage.setItem('@first_name', firstName);
      await AsyncStorage.setItem('@last_name', lastName);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@phone_number', phoneNumber);
      await AsyncStorage.setItem('@isCheckedOrder', JSON.stringify(isCheckedOrder));
      await AsyncStorage.setItem('@isCheckedPassword', JSON.stringify(isCheckedPassword));
      await AsyncStorage.setItem('@isCheckedOffers', JSON.stringify(isCheckedOffers));
      await AsyncStorage.setItem('@isCheckedNews', JSON.stringify(isCheckedNews));
  
      // Check if profileImage is not null or undefined before trying to set it.
      if (profileImage !== null && profileImage !== undefined) {
        await AsyncStorage.setItem('@profileImage', profileImage);
      } else {
        await AsyncStorage.removeItem('@profileImage');
      }
    
      // Navigate to the Home page
  
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error navigating to Home Page", error);
    }
  };

    // Function to select profile image from media library

    const selectProfileImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          // ... (rest of your configuration)
      });
  
      if (!result.canceled) {
          const imageUri = result.assets[0].uri;
          setProfileImage(imageUri);
          
          // Save the URI to AsyncStorage
          await AsyncStorage.setItem('@profileImage', imageUri);
      }
  };

return ( 

<View style={styles.container}>
      
    <Header />
      <View style={styles.body}>
        <View style={styles.bodyHeaderSection}>
          <Text style={styles.bodyText}>Personal Information</Text>
        </View>

        <TouchableOpacity onPress={selectProfileImage} style={styles.imageContainer}>
        {
  profileImage ? 
    <Image source={{ uri: profileImage }} style={styles.profileImage} /> :
    <View style={[styles.profileImage, styles.placeholderContainer]}>
      <Text style={styles.placeholderText}>
        {firstName && firstName[0].toUpperCase()}
        {lastName && lastName[0].toUpperCase()}
      </Text>
    </View>
}
    <Text style={{marginTop: 10}}>Change Photo</Text>
</TouchableOpacity>


        <View style={styles.bodyTextSection}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
          />
        </View>
        <View style={styles.bodyTextSection}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
          />
        </View>
        <View style={styles.bodyTextSection}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={styles.bodyTextSection}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
          />
        </View>
        <View style={styles.bodyHeaderSection}>
          <Text style={styles.bodyText}>Email Notifications</Text>
        </View>
        
        <View style={{ padding: 10 }}>
          <CheckBox
            style={{padding: 10 }}
            onClick={() => {
              setIsCheckedOrder(!isCheckedOrder);
            }}
            isChecked={isCheckedOrder}
            rightText={"Order Statuses"}
          />
          <CheckBox
            style={{padding: 10 }}
            onClick={() => {
              setIsCheckedPassword(!isCheckedPassword);
            }}
            isChecked={isCheckedPassword}
            rightText={"Password Changes"}
          />
          <CheckBox
            style={{padding: 10 }}
            onClick={() => {
              setIsCheckedOffers(!isCheckedOffers);
            }}
            isChecked={isCheckedOffers}
            rightText={"Special Offers"}
          />
          <CheckBox
            style={{padding: 10 }}
            onClick={() => {
              setIsCheckedNews(!isCheckedNews);
            }}
            isChecked={isCheckedNews}
            rightText={"Newsletters"}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
          <Text style={styles.resetButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>

);}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
},
  bodyHeaderSection: {
    marginTop: 10,
    marginLeft: 20,
  },
  bodyText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  TextInputStyle: {
    textAlign: 'Left',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
},
placeholderText: {
    fontSize: 32,
    color: 'white',
},
resetButton: {
  marginTop: 10,
  backgroundColor: '#F4CE14',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  marginLeft: 20,
  marginRight: 20,
},
resetButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},

footer: {
  backgroundColor: '#fff',
},
});