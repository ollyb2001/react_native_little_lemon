import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CategoryList({ categories, activeCategories, onSelectCategory }) {
    return (
      <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category + index} 
              style={[
                styles.category, 
                activeCategories.includes(category) && styles.selectedCategory
              ]}
              onPress={() => onSelectCategory(category)}
              accessibilityRole="button"
              accessibilityLabel={`Toggle category ${category}`}
            >
              <Text style={[styles.text, activeCategories.includes(category) && styles.selectedText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    minHeight:50,
    maxHeight:50,    
  },
  innerContainer: {
    flexDirection: 'row',
    
  },
  category: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,  
    alignItems: 'center',
    justifyContent: 'center',
},

  selectedCategory: {
    backgroundColor: '#495e57',

  },
  text: {
    fontSize: 16,
    color: '#495e57',
    fontWeight: 'bold',
    padding: 5,
   
   
  },
  selectedText: {
    color: '#ffffff',
   
  },
});
