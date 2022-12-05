import React from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";




function Reportes() {

  return (
    
<View>
    { false ?   (<View style={styles.container}>
    <Text> Ahora es true </Text>
</View>) :  (<View style={styles.container}>
<Text> Ahora es false </Text>
</View> )}
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
