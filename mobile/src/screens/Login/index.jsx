import { useState } from 'react';
import { Text, View, Image, TextInput, Button } from 'react-native';
import images from '../../assets/images'
import styles from './styles';
function LoginScreen({route, navigation}) {
    const [email, setEmail] = useState("");
    const [contrasena, setCotrasena] = useState("")
    const onChangeTextEmail = (text)=>{
        setEmail(text)
    }

    const onChangeTextContrasena = (text)=>{
        setCotrasena(text)
    }

    const onButtonPress = () => {
        //comentario
    }
  return (
    <View style={styles.container}>
      <View>
        <Image source={images.logo} style={styles.image} />
        <TextInput placeholder='Email' onChangeText={onChangeTextEmail} value={email} style={{backgroundColor: '#FFF', marginVertical: 10}} />
        <TextInput placeholder='Contraseña'value={contrasena} onChangeText={onChangeTextContrasena} style={{backgroundColor: '#FFF', marginVertical: 10}}/>
        <Button title='Ingresar' onPress={onButtonPress}/>
      </View>
    </View>
  );
}

export default LoginScreen;
