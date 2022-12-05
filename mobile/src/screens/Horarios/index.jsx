import { Text, View, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URLBase } from "../../url/variable";
import React from "react";
import { ScrollView } from "react-native";

function Horarios({ navigation }) {
  const user = useSelector((state) => state.user);
  const [empleado, setEmpleado] = useState([
    {
      branch: { name: "", city: "", province: "", fulladress: "", type: "" },
      shift: { start: "", end: "" },
    },
  ]);


  useEffect(() => {
    if (user)
      URLBase.get(`/events/byGuard/${user.id}`).then((res) =>
        setEmpleado(res.data)
      );
  }, [user]);

  const handleBoton = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
          <Card.Title>HORARIOS DE LA SEMANA:</Card.Title>
          <Card.Divider />
          {empleado.map((dato, i) => {
            return (
              <Card>
                <Card.Title>HORARIO DEL DÍA: {dato.date}</Card.Title>
                <View key={i} style={styles.user}>
                <Text style={styles.datos}> Nombre: {dato.branch.name} </Text>
                <Text style={styles.datos}>
                  {" "}
                  Dirección: {dato.branch.fulladdress}{" "}
                </Text>
                <Text style={styles.datos}> Ciudad: {dato.branch.city} </Text>
                <Text style={styles.datos}>
                  {" "}
                  Provincia: {dato.branch.province}{" "}
                </Text>
                <Text style={styles.datos}>
                  {" "}
                  Hora de ingreso: {dato.shift.start}{" "}
                </Text>
                <Text style={styles.datos}>
                  {" "}
                  Hora de salida: {dato.shift.end}{" "}
                </Text>
              </View>
        </Card>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  legajo: {
    fontWeight: "350",
    fontSize: 30,
  },
  datos: {
    fontSize: 20,

  },
});
export default Horarios;
