import { useMemo, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, StatusBar, ToastAndroid } from "react-native";
import { RootStackScreenProps } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Send a login form to the API
 * @async
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the login was successful or not
 */
const sendForm = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('http://10.68.247.177:3000/api/login?mail=' + email + '&password=' + password, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    if (response.status != 200) {
      const message = await response.json().then(json => json)
      ToastAndroid.showWithGravity(message.error, ToastAndroid.SHORT, ToastAndroid.TOP)
      return false
    } else {
      const data = await response.json().then(json => json)
      try {
        console.log(data)
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('token', data.token)
        console.log("user id login", data.id.toString())
        await AsyncStorage.setItem('id', data.id.toString())
      } catch (e) {
        console.log(e)
      }
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Component that renders the Login screen
 * @function
 * @param {Object} navigation - The navigation object.
 * @returns {JSX.Element} - A JSX element that represents the Login screen
 */
export default function Login({ navigation }: RootStackScreenProps<'Login'>): JSX.Element {
  const [emailInput, setEmailValue] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  /**
   * Indicates whether the email address entered by the user is valid
   * @type {boolean}
   */
  const isEmail: boolean = useMemo(() => {
    if (emailInput.trim() === "")
      return true
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    return reg.test(emailInput)
  }, [emailInput])

  /**
    * Indicates whether the form is valid and can be submitted.
    * @type {boolean}
    */
  const isFormValid: boolean = useMemo(() => {
    return emailInput.trim() != "" && passwordInput.trim() != "" && isEmail;
  }, [emailInput, passwordInput, isEmail]);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  return (
    <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>AREA</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: 'white' }}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text
          style={{ margin: 10, fontSize: 25, fontWeight: 'bold', color: 'white', }}
        >What is your email address ?</Text>
        <TextInput
          value={emailInput}
          placeholder='Enter your email address'
          placeholderTextColor="#FFF"
          style={styles.textInput}
          autoCapitalize="none"
          returnKeyType='done'
          onChangeText={(text: string) => setEmailValue(text)}
        />
        <View style={styles.textInput}>
          <TextInput
            style={{ color: 'white', alignSelf: 'stretch', width: '90%' }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            onChangeText={(text: string) => setPasswordInput(text)}
            value={passwordInput}
            placeholder='Enter your password'
            placeholderTextColor='white'
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
          </Pressable>
        </View>
        <Text style={{ color: 'white' }}>Continue with <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('OAuths')}>Google</Text></Text>
        <TouchableOpacity style={styles.button} onPress={async () => { navigation.navigate('App') }} disabled={!isFormValid}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
        {/* remove this part from line 116 for there is no back-end: if (await sendForm(emailInput, passwordInput)) */}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderWidth: 0,
      borderColor: "blue",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    marginTop: StatusBar.currentHeight,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "blue",
    borderWidth: 0,
  },
  button: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  headerButton: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  textInput: {
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    maxWidth: '100%',
    margin: 10,
    paddingLeft: 10,
    color: 'white',
  },
})
