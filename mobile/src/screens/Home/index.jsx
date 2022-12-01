import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Card } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

function HomeScreen({route, navigation, perfil}) {
const user = useSelector((state) => state.user)
const [empleado, setEmpleado] = useState({})
const id = user.id


useEffect(() =>{
  if(user) 
  axios.get(`http://192.168.1.85:3001/api/guards/1`).then((res) => setEmpleado(res.data))
}, [id])

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('user')
  } catch(e) {
    console.log(e);
  }
    console.log('Done.')
}  

const handleLogOut = () => {
  removeValue()
  navigation.navigate("Reportes")
} 
ListItem
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100}}>
    
    <Avatar
          size={200}
          rounded
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-DIROB4u3cU82LhXPXqJIlMNeUrElZCKwKA&usqp=CAU' }}
          title="Bj"
        >
     </Avatar>
<CardDivider/>
<CardDivider/>
     <View>
     <Text style={styles.datos}> Nombre: {empleado.name} </Text>
     <Text style={styles.datos}> Apellido: {empleado.lastname} </Text>
     <Text style={styles.datos}> CUIL: {empleado.cuil} </Text>
     <Text style={styles.datos}> Domicilio: {`${empleado.street} ${empleado.number}`} </Text>
     <Text style={styles.datos}> Ciudad: {empleado.city} </Text>
     <Text style={styles.datos}> Provincia: {empleado.province} </Text>
     </View>
     <Card.Divider/>
     <Card.Divider/>
     <Card.Divider/>
     <Button title='Cerrar Sesión' onPress={handleLogOut} buttonStyle={{
  backgroundColor: 'rgba(90, 154, 230, 1)',
  borderColor: 'transparent',
  borderWidth: 0,
  borderRadius: 30,
}}/>
    </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  legajo: {
    fontWeight: '350',
    fontSize: 30
  },
  datos: {
    fontSize: 20,
    
  }
});
console.log("hola");
console.log("hola");