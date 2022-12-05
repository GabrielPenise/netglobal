import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Button, Platform } from "react-native";
import axios from "axios";
// import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from "expo-location";
import { URLBase } from "../../url/variable";
import { useSelector } from "react-redux";
import { PricingCard, lightColors, Card, Icon } from "@rneui/themed";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  Platform,
} from "react-native";

const fecha = new Date().toISOString();
const Fichaje = ({ navigation }) => {
  const [text, setText] = useState(fecha);
  const [textSalida, setTextSalida] = useState(fecha);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [botonEntrada, setBotonEntrada] = useState(false);
  const [botonSalida, setBotonSalida] = useState(false);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const user = useSelector((state) => state.user);
  const [modalVisibleSalida, setModalVisibleSalida] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleOnPress = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locacion = await Location.getCurrentPositionAsync({});
      const update = await URLBase.put("/events/checkin/1", {
        time_in: locacion.timestamp,
        position_in_latitude: locacion.coords.latitude,
        position_in_longitude: locacion.coords.longitude,
      });
      const horario = locacion.timestamp;
      const fecha = new Date(horario);
      setHoraEntrada(
        `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
      );
    })();
    setBotonEntrada(true);
    setModalVisible(!modalVisible)
  };

  const handleOnPressSalida = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locacion = await Location.getCurrentPositionAsync({});
      const update = await URLBase.put("/events/checkout/1", {
        time_out: locacion.timestamp,
        position_out_latitude: locacion.coords.latitude,
        position_out_longitude: locacion.coords.longitude,
      });
      const horario = locacion.timestamp;
      const fecha = new Date(horario);
      setHoraSalida(
        `${fecha.getHours()}: ${fecha.getMinutes()}: ${fecha.getSeconds()}`
      );
    })();
    setBotonSalida(true);
    
  };
  return (
    <View style={styles.container}>
    {botonEntrada ? (
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Su hora de entrada es: {horaEntrada}
        </Text>
      ) : null}

      <View style={{ margin: 20 }}>
        {!botonEntrada ? (
          <Button
            title="Ingrese la hora de entrada"
            onPress={() => setModalVisible(!modalVisible)}
          />
        ) : null}
      </View>

      {botonSalida ? (
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Su hora de salida es: {horaSalida}
        </Text>
      ) : null}
      <View style={{ margin: 20 }}>
        {!botonSalida ? (
          <Button
            title="Ingrese la hora de salida"
            onPress={() => setModalVisibleSalida(!modalVisibleSalida)}
          />
        ) : null}
      </View>

      {/* VISTA MODAL DE ENTRADA */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                ¿Deseas confirmar el horario de entrada?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleOnPress}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* VISTA MODAL DE SALIDA */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSalida}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                ¿Deseas confirmar el horario de salida?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleOnPressSalida}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleSalida(!modalVisibleSalida)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 2,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Fichaje;

//   <View style={styles.centeredView}>
//   <Modal
//     animationType="slide"
//     transparent={true}
//     visible={modalVisibleSalida}
//     onRequestClose={() => {
//       Alert.alert("Modal has been closed.");

//     }}
//   >
//     <View style={styles.centeredView}>
//       <View style={styles.modalView}>
//         <Text style={styles.modalText}>¿Deseas confirmar el horario de salida?</Text>
//         <Pressable
//           style={[styles.button, styles.buttonClose]}
//           onPress={handleOnPressSalida}

//         >
//           <Text style={styles.textStyle}>Aceptar</Text>
//         </Pressable>
//         <Pressable
//           style={[styles.button, styles.buttonClose]}
//           onPress={() => setModalVisibleSalida(!modalVisibleSalida)}
//         >
//           <Text style={styles.textStyle}>Cerrar</Text>
//         </Pressable>
//       </View>
//     </View>
//   </Modal>
//   <Pressable
//     style={[styles.button, styles.buttonOpen]}
//     onPress={() => setModalVisibleSalida(true)}
//   >
//     <Text style={styles.textStyle}>Show Modal</Text>
//   </Pressable>
// </View>
