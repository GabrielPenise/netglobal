import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';



function Perfil({route, navigation}) {
const [perfil, setPerfil] = useState({})

AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => setPerfil(JSON.parse(data)))
  })
  
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text> ACA PUEDEN IR LOS DATOS DEL GUARDIA (PODEMOS INLCUIR ALGUNA FOTO) INCLUIR EL BOTON DE LOGOUT </Text>
  
    </View>
  );
}

export default Perfil;