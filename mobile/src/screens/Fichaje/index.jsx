import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Button, Platform } from "react-native";
import axios from "axios";
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';


const Fichaje = ({route, navigation}) => {
  const handleBoton = () => {
    navigation.navigate("Login")
  } 
  const [text, setText] = useState("");
  const [textSalida, setTextSalida] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [latitud, setLatitud] = useState(0)
  const [longitud, setLongitud] = useState(0)

  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locacion = await Location.getCurrentPositionAsync({});
      setLocation(locacion);
      // console.log(locacion.coords.latitude)

      setLatitud(locacion.coords.latitude)
      setLongitud(locacion.coords.longitude)
      
    })();
  }, []);
  // console.log(latitud)
  // console.log(longitud)

  const handleOnPress = ()=>{
    setText(String(new Date()))
    axios.put("http://192.168.100.24:3001/api/events/checkin/1", { position_in_latitude:latitud, position_in_longitude: longitud})
    .then(data=>console.log(data))
  }


  const handleOnPressSalida = ()=>{
    setTextSalida("2022-01-17T04:33:12.000Z") 
    axios.put("http://192.168.100.24:3001/api/events/checkout/1", { position_out_latitude:latitud, position_out_longitude: longitud})
    .then(data=>console.log(data))
  }
  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} initialRegion={{
      latitude: latitud,
      longitude: longitud,
    }} >
      <Marker
      coordinate={{latitude: latitud, longitude: longitud}}
      title="Usted esta aquí"
      ></Marker>
      </MapView>
      <Text style={{fontWeight:"bold", fontSize: 20}}>Su hora de entrada es: {text}</Text>
      <View style={{margin: 20}}>
      {!text ? (<Button title="Ingrese la hora de entrada" onPress={handleOnPress}/> ) : (null)}
      </View>


      <Text style={{fontWeight:"bold", fontSize: 20}}>Su hora de salida es: {textSalida}</Text>
      <View style={{margin: 20}}>
        {!textSalida ? (<Button title="Ingrese la hora de salida" onPress={handleOnPressSalida} />) : (null)} 
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
