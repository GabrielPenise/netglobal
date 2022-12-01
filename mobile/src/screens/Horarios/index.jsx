import { Text, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import {URLBase} from "../../url/variable";
 import React from 'react';

function Horarios({navigation}) {
const user = useSelector((state) => state.user)
const [empleado, setEmpleado] = useState(null)


useEffect(() =>{
  if(user) 
  URLBase.get(`/events/byGuard/${user.id}`).then((res) => setEmpleado(res.data))
}, [user])


  const handleBoton = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100}}>
<CardDivider/>
     <View>
      <Text>hola</Text>
     {/* <Text style={styles.datos}> Nombre: {empleado[0].branch.name} </Text>
     <Text style={styles.datos}> Ciudad: {empleado[0].branch.city}  </Text>
     <Text style={styles.datos}> Provincia: {empleado[0].branch.province} </Text>
     <Text style={styles.datos}> Dirección: {empleado[0].branch.fulladdress} </Text>
     <Text style={styles.datos}> Turno: {empleado[0].branch.type} </Text>
     <Text style={styles.datos}> Hora de ingreso: {empleado[0].shift.start} </Text>
     <Text style={styles.datos}> Hora de salida: {empleado[0].shift.end} </Text> */}
     </View>
     <Card.Divider/>
    </View>
  );
   };

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
