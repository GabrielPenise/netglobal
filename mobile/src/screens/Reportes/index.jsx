import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';



function Reportes({route, navigation}) {
const [perfil, setPerfil] = useState({})
  const handleBoton = () => {
    navigation.navigate("Login")
  }

  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => setPerfil(JSON.parse(data)))
  }, [])


 const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch(e) {
      console.log(e);
    }
      console.log('Done.')
  }  

  // removeValue()
  
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
       <Text> ACA PUEDEN IR LOS REPORTES DE HORAS TRABAJADAS  </Text>
        
    </View>
  );
}

export default Reportes;