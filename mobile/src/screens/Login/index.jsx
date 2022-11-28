import {  useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import images from '../../assets/images'
import styles from './styles';
import axios from 'axios';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'




function LoginScreen({route, navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")  

    const onChangeTextEmail = (text)=>{
        setEmail(text)
    }
    
    const onChangeTextContrasena = (text)=>{
        setPassword(text)
    }
   
    const onButtonPress = () => {
        axios.post("http://192.168.1.85:3001/api/guards/login", {email, password}).then((res) => setUser(res.data.email))
        AsyncStorage.setItem("users", user)
        if(user !== null) {
          navigation.navigate("Perfil")
        }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('users')
        if(value !== null) {
          console.log(value);
        }
      } catch(e) {
        console.log(error);
      }
    }
console.log(new Date());



getData()
  return (
    <View style={styles.container}>
      <View>
        <Image source={images.logoFull} style={styles.image} />
        <TextInput placeholder='Email' onChangeText={onChangeTextEmail} value={email} style={styles.textInput} />
        <TextInput placeholder='Password'value={password} onChangeText={onChangeTextContrasena} style={styles.textInput} secureTextEntry={true}/>
        <View style={styles.loginBtn}>
        <Button title='Ingresar' onPress={onButtonPress} buttonStyle={{
  backgroundColor: 'rgba(90, 154, 230, 1)',
  borderColor: 'transparent',
  borderWidth: 0,
  borderRadius: 30,
}}/>
        </View>


      </View>
    </View>
  );
}


export default LoginScreen;


