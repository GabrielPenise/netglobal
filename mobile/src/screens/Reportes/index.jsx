import { Text, View, TouchableOpacity } from 'react-native';

function Reportes({route, navigation}) {

  const handleBoton = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleBoton}>
        <Text> ACA PUEDEN IR LOS REPORTES DE HORAS TRABAJADAS </Text>
      </TouchableOpacity>
      <Text>Home Screen</Text>
    </View>
  );
}

export default Reportes;