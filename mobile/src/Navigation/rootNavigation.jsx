import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Horarios from '../screens/Horarios';
import Reportes from '../screens/Reportes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Perfil from '../screens/Perfil';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/user';


const Tab = createBottomTabNavigator();


export default function RootNavigator() {
const [perfil, setPerfil] = useState({})
const dispatch = useDispatch()

async function getPerfil() {
  try {
    const perfil = await AsyncStorage.getItem("user")
    const usuario = JSON.parse(perfil)
    setPerfil(usuario.data)
    dispatch(userLogin(usuario.data))
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
    getPerfil()
  },[])

  const Stack = createNativeStackNavigator()

  return (
 
              
          

    <NavigationContainer>
      <Tab.Navigator>      
      <Tab.Screen name="Perfil" component={HomeScreen} options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
                <Tab.Screen name="Perfil " component={Perfil} options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}/>
          <Tab.Screen name="Horarios" component={Horarios} options={{
          tabBarLabel: 'Horarios',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}/>
          <Tab.Screen name="Reportes" component={Reportes} options={{
          tabBarLabel: 'Reportes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard" color={color} size={26} />
          ),
        }}/>
             
      </Tab.Navigator>
      
      </NavigationContainer>



    
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