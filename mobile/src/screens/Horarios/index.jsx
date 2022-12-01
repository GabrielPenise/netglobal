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
import {URLBase} from "../../url/variable";

function Horarios({route, navigation}) {

  const user = useSelector((state) => state.user)
const [empleado, setEmpleado] = useState({})
const id = user.id


useEffect(() =>{
  URLBase.get(`/events/byGuard/1`).then((res) => setEmpleado(res.data))
}, [])


// const removeValue = async () => {
//   try {
//     await AsyncStorage.removeItem('user')
//   } catch(e) {
//     console.log(e);
//   }
//     console.log('Done.')
// }  


  const handleBoton = () => {
    navigation.navigate("LoginScreen")
  }

  return (

    <View style={{ flex: 1, alignItems: 'center', marginTop: 100}}>
    {/* <Avatar
          size={200}
          rounded
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-DIROB4u3cU82LhXPXqJIlMNeUrElZCKwKA&usqp=CAU' }}
          title="Bj"
        >
     </Avatar> */}
<CardDivider/>
<CardDivider/>
     <View>
     {/* <Text style={styles.datos}> Sucursal: {empleado[0].branchId} </Text>
     <Text style={styles.datos}> Día: {empleado[0].date} </Text>
     <Text style={styles.datos}> Turno: {empleado[0].shiftId} </Text> */}
     </View>
     <Card.Divider/>
     <Card.Divider/>
     <Card.Divider/>
    </View>
  );
}
const styles = StyleSheet.create({
  legajo: {
    fontWeight: '350',
    fontSize: 30
  },
  datos: {
    fontSize: 20,
    
  }
});
export default Horarios;

