import React from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";


function Reportes() {

  return (
    <View style={styles.container}>
      <Text> Avisos por licencias </Text>
  </View>
  );
}

export default Reportes;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
