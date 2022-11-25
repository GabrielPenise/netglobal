import { Text, View, TouchableOpacity } from 'react-native';

function HomeScreen({route, navigation}) {
  const handleBoton = () => {
    navigation.navigate("Login", {param1: 'param'})
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleBoton}>
        <Text>Go to login</Text>
      </TouchableOpacity>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
