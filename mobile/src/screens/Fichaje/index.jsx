import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Button, Platform } from "react-native";
import axios from "axios";
// import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import  {URLBase} from "../../url/variable"
import { useSelector } from "react-redux";
import { PricingCard, lightColors, Card, Icon } from '@rneui/themed';


const fecha = new Date().toISOString()
const Fichaje = ({navigation}) => {
  const [text, setText] = useState(fecha);
  const [textSalida, setTextSalida] = useState(fecha);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [botonEntrada, setBotonEntrada] = useState(false)
  const [botonSalida, setBotonSalida] = useState(false)
  const [latitud, setLatitud] = useState(0)
  const [longitud, setLongitud] = useState(0)
  const [horaEntrada, setHoraEntrada] = useState("")
  const [horaSalida, setHoraSalida] = useState("")
  const user = useSelector((state) => state.user);

// =======================  aca hay que obtener el ID del evento que corresponde a ese dia 
  // useEffect(() => {
  //     URLBase.get(`/events/byDate/${user.id}/20221129`).then((data) => console.log(data))
  //   },
  //  [])
// 

  // React.useEffect(() => {
  //   (async () => {
      
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     let locacion = await Location.getCurrentPositionAsync({});
  //     setLocation(locacion);
  //     setLatitud(locacion.coords.latitude)
  //     setLongitud(locacion.coords.longitude)
  //   })();
  // }, []);
// ================================================================
  // const handleFecha = () =>{
  //   const fecha2= new Date().toISOString()
  //   setText(fecha2)
  // }
 
  const handleOnPress = ()=>{
    (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let locacion = await Location.getCurrentPositionAsync({});
      console.log(locacion);
      const update = await URLBase.put("/events/checkin/1", {time_in:locacion.timestamp, position_in_latitude:locacion.coords.latitude, position_in_longitude: locacion.coords.longitude})
      const horario = locacion.timestamp
      const fecha = new Date(horario)
      setHoraEntrada(`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`)
    })()
    setBotonEntrada(true)
  }

  const handleOnPressSalida = ()=>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  setErrorMsg('Permission to access location was denied');
  return;
}
let locacion = await Location.getCurrentPositionAsync({});
const update = await URLBase.put("/events/checkout/1", {time_out:locacion.timestamp, position_out_latitude:locacion.coords.latitude, position_out_longitude: locacion.coords.longitude})
const horario = locacion.timestamp
const fecha = new Date(horario)
setHoraSalida(`${fecha.getHours()}: ${fecha.getMinutes()}: ${fecha.getSeconds()}`)
})()
    setBotonSalida(true)
  }


  // const handleOnPress = ()=>{
  //   handleFecha()
  //   URLBase.put("/events/checkin/2", {time_in:text, position_in_latitude:latitud, position_in_longitude: longitud})
  //   setBotonEntrada(true)
  // }
  
  // const handleOnPressSalida = ()=>{
  //   handleFecha()
  //   URLBase.put("/events/checkout/2", { time_out:text,position_out_latitude:latitud, position_out_longitude: longitud})
  //   setBotonSalida(true)
  // }
  
  return (
    <View style={styles.container}>
      {/* <MapView 
      style={styles.map} initialRegion={{
      latitude: latitud,
      longitude: longitud,
    }} >
      <Marker
      coordinate={{latitude: latitud, longitude: longitud}}
      title="Usted esta aquí"
      ></Marker>
      </MapView> */}

      {botonEntrada ? (<Text style={{fontWeight:"bold", fontSize: 20}}>Su hora de entrada es:  {horaEntrada}</Text>) : (null)}

      <View style={{margin: 20}}>
      {!botonEntrada ? (<Button title="Ingrese la hora de entrada" onPress={handleOnPress}/> ) : (null)}
      </View>

      {botonSalida ? (<Text style={{fontWeight:"bold", fontSize: 20}}>Su hora de salida es: {horaSalida}</Text>) : (null)}
      <View style={{margin: 20}}>
        {!botonSalida ? (<Button title="Ingrese la hora de salida" onPress={handleOnPressSalida} />) : (null)} 
      </View>
        
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    alignItems: "center",
    justifyContent:"center"
  },
    map: {
    width: '100%',
    height: '50%',
  }});
  
  export default Fichaje;
