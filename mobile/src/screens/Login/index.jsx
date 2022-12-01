import { View, Image, TextInput, Text } from 'react-native';
import {  useEffect, useState } from 'react';
import images from '../../assets/images'
import styles from './styles';
import axios from 'axios';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/user';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {URLBase} from "../../url/variable"


function LoginScreen({route, navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [perfil, setPerfil] = useState({})  
    const user = useSelector((state) => state.user);

    const onChangeTextEmail = (text)=>{
        setEmail(text)
    }
    
    const onChangeTextContrasena = (text)=>{
        setPassword(text)
    }
   
    // useEffect(()=>{
    //   navigation.navigate("Perfil")
    // },[user.id])

    const onButtonPress = async (e) => {

      try {
        const LoginUser = await URLBase.post(`/guards/login`, {email, password})
        const jsonValue = JSON.stringify(LoginUser)
        await AsyncStorage.setItem("user", jsonValue)
            } 
            catch (error) {
        alert("usuario/contraseña incorrecta, consulte con recursos humanos")
      }
      navigation.navigate("Perfil")
   }


//  const usuario = () => {
//    AsyncStorage.getItem("user").then((data) => setPerfil(JSON.parse(data)))}
// usuario()

// const removeUser = () => {
//   AsyncStorage.removeItem("user").then((res) => console.log("done"))
// }

// removeUser()

  return (

  <NavigationContainer>
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
        <Text style={{marginTop:20, alignContent:"center"}}> ¿Olvido su contraseña? Haga Click aquí</Text>
    </View>
    </NavigationContainer>
  );
}


export default LoginScreen;


