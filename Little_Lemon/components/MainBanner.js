import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Font from 'expo-font';



export default function MainBanner() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  
const KarlaRegular = require('../assets/fonts/Karla-Regular.ttf');
const MarkaziTextRegular = require('../assets/fonts/MarkaziText-Regular.ttf');

// Define the loadFonts function
const loadFonts = async () => {
    await Font.loadAsync({
      'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
      'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;  // or render a loading indicator
  }

  
const handleSearchPress = () => {
    setShowSearchBar(true);
  };

  const handleSearchCancel = () => {
    setShowSearchBar(false);
    setSearchText('');
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text) {
      const lowercasedText = text.toLowerCase();
      setFilteredData(
        originalData.filter((item) =>
          item.name.toLowerCase().includes(lowercasedText) ||
          item.description.toLowerCase().includes(lowercasedText)
        )
      );
    } else {
      setFilteredData(originalData);
    }
  };




  return (
    <View style={styles.container}>
      
    <Text style={styles.HeaderText}>Little Lemon</Text>
    <Text style={styles.h2Text}>Chicago</Text>
    
    <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
    <Text style={styles.body}>We are a family owned Mediterranean restaurant,focused on traditional recipes served with a modern twist</Text>
    <Image source={require('../assets/heroImage.png')} style={{height: 150, width: 150, borderRadius: 20}}/>
    </View>


    </View>
  )
}

const styles = StyleSheet.create({

container: {
    backgroundColor:"#495e57",
    height: 350,
    width: "100%",
    padding: 20,
},

HeaderText: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 70,
    color: "#F4CE14",
    fontWeight: "400",
},
h2Text: {
    marginTop: -20,
    fontFamily: "MarkaziText-Regular",
    fontSize: 50,
    color: "#ffffff",
    fontWeight: "400",
},

body: {
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "200",
    width: "60%"
},
searchButton: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  searchButtonIcon: {
    height: 20,
    width: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50,
    width: '100%',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 5,
    marginTop: 20,
  },
  searchBarInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  searchBarCancel: {
    marginLeft: 5,
    padding: 5,
  },
  searchBarCancelIcon: {
    height: 30,
    width: 30,
  },

})