import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Horarios from './src/screens/Horarios';
import Reportes from './src/screens/Reportes';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store/store';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from './src/Navigation/rootNavigation';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
const [perfil, setPerfil] = useState({})

useEffect(() => {
  getPerfil()
},[])

async function getPerfil() {
  try {
    const perfil = await AsyncStorage.getItem("user")
    setPerfil(perfil)
  } catch (error) {
    console.log(error);
  }
}

  return (


  <Provider store={store}>
    {perfil? (<RootNavigator/>): (<LoginScreen/>)}
   </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
