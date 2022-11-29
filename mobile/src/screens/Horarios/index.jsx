import { Text, View, TouchableOpacity } from 'react-native';

function Horarios({route, navigation}) {

  const handleBoton = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleBoton}>
        <Text> ACA VA LA LISTA DE LOS PROXIMOS TURNOS CON SUS SUCURSALES DIRECCIONES HORARIOS </Text>
      </TouchableOpacity>
      <Text> BOTONES </Text>
    </View>
  );
}

export default Horarios;