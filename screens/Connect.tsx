import { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackScreenProps } from '../types';

/**
  * Send login form data to the server
  * @async
  * @function
  * @param {string} email - User email
  * @param {string} password - User password
  * @returns {Promise<void>}
  */
const sendForm = async (email: string, password: string): Promise<void> => {
  try {
    const response = await fetch('http://10.68.247.177:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    const message = response.status
    console.log(message)
  } catch (error) {
    console.error(error)
  }
}

/**
  * Login screen component
  * @function
  * @param {Object} navigation - Navigation object from react-navigation library
  * @param {Object} route - Route object from react-navigation library
  * @returns {JSX.Element} - Login screen UI
  */
export default function Connect({ navigation, route }: RootStackScreenProps<'Connect'>) {

  const [textInputValue, setTextInputValue] = useState('');

  /**
   * Indicates whether the form is valid and can be submitted
   * @type {boolean}
   */
  const isFormValid: boolean = useMemo(() => {
    return textInputValue.trim() != "";
  }, [textInputValue]);

  const email = route.params?.email

  return (
    <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text
          style={{ alignSelf: 'flex-start', margin: 10, fontSize: 40, fontWeight: 'bold', color: 'white' }}
        >Happy to see you back ^^</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
          onChangeText={(text: string) => setTextInputValue(text)}
          value={textInputValue}
          placeholder='Enter your password'
          placeholderTextColor='white'
        />
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', padding: 10 }}>
          <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('ResetPassword')}>Forgot your password ?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => sendForm(email, textInputValue)} disabled={!isFormValid}>
          <Text style={{ color: 'white' }}>Connect</Text>
        </TouchableOpacity>
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
    maxWidth: '100%',
    paddingTop: 50,
    borderWidth: 0,
    borderColor: "blue",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    borderWidth: 0,
    borderColor: 'blue',
    display: 'flex',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
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