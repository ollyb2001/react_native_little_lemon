import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import MainBanner from '../components/MainBanner'
import { useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories';


export default function Home() {

// Navigation
const navigation = useNavigation();



  return (
    <View style={styles.container}>
        <Header />
        <MainBanner />
        <Categories  />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})