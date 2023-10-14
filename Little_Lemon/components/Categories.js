import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ScrollView } from 'react-native';
import { init, fetchItems, insertItem, droptable } from '../database';
import CategoryList from './CategoriesList'; 

export default function Categories() {
 
    // Menu data state and search query state
    const [menuData, setMenuData] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate categories from menuData
    const categories = [...new Set(menuData.map(item => item.category))];

    const handleSelectCategory = category => {
        setActiveCategories(prev => 
            prev.includes(category) 
                ? prev.filter(ac => ac !== category) 
                : [...prev, category]
        );
    };

    const fetchDataFromAPIAndInsertToDB = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const data = await response.json();
    
            if (data?.menu?.length) {
                for (const item of data.menu) {
                    // Ensure that item is not inserted multiple times
                    await insertItem(item.name, item.price, item.description, item.image, item.category);
                }
                setMenuData(data.menu);
            } else {
                console.error("Unexpected API response format:", data);
            }
        } catch (err) {
            console.error("Fetching data error:", err);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                await init();
                const localData = await fetchItems();

                if (localData.rows._array.length === 0) {
                    await fetchDataFromAPIAndInsertToDB();
                } else {
                    setMenuData(localData.rows._array);
                }
            } catch (err) {
                console.error("Data initialization error:", err);
            }
        };

        initializeData();
    }, []);

    // Filter menuData based on activeCategories and searchQuery
    const filteredMenuData = menuData.filter(item =>
        (activeCategories.length === 0 || activeCategories.includes(item.category)) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = query => {
        setSearchQuery(query);
    };

    return (
        <View style={styles.container}> 
      <TextInput 
        style={styles.searchInput}
        value={searchQuery}
        placeholder="Search our delicious menu!"
        onChangeText={handleSearchChange}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
      </View>
      <CategoryList 
        categories={categories}
        activeCategories={activeCategories}
        onSelectCategory={handleSelectCategory}
      />


      <FlatList
        data={filteredMenuData}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Image 
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} 
                style={styles.itemImage} 
              />
            </View>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },

    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemContainer: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemDescription: {
        marginTop: 0,
        width: '70%',
    },
    itemImage: {
        height: 100,
        width: 100,
        marginTop: 10,
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: '500',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
    },
});
