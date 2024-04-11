import { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, ToastAndroid, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTogglePasswordVisibility, useToggleConfirmationVisibility } from '../hooks/useTogglePasswordVisibility';
import { RootStackScreenProps } from '../types';

/**
 * Sends a form to the server to signup new user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password entered by the user.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the form was successfully sent.
 */
async function sendForm(email: string, password: string): Promise<boolean> {
    try {
        const response = await fetch('http://10.68.247.177:3000/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: email,
                password: password,
            }),
        })
        if (response.status != 200) {
            const message = await response.json().then(json => json)
            ToastAndroid.showWithGravity(message.error + '\n' + message.desc, ToastAndroid.SHORT, ToastAndroid.TOP)
            return false
        } else {
            console.log("response", response)
            const data = await response.json().then(json => json)
            try {
                console.log(data)
                await AsyncStorage.setItem('email', email)
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
 * A screen that allows users to sign up for the app.
 * @param {Object} navigation - The navigation object.
 * @returns {JSX.Element} - A JSX element representing the sign up screen.
 */
export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>): JSX.Element {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const { confirmationVisibility, confirmationRightIcon, handleConfirmationVisibility } = useToggleConfirmationVisibility();
    const [password, setNewPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [email, setEmail] = useState('')

    /**
   * Indicates whether the email address entered by the user is valid.
   * @type {boolean}
   */
    const isEmail: boolean = useMemo(() => {
        if (email.trim() === "")
            return true
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        return reg.test(email)
    }, [email])

    /**
   * Indicates whether the password and confirmation entered by the user match.
   * @type {boolean}
   */
    const isEqual: boolean = useMemo(() => {
        password.trim()
        confirmation.trim()
        return password == confirmation
    }, [password, confirmation])

    /**
   * Indicates whether the password entered by the user is long enough.
   * @type {boolean}
   */
    const isLongEnough: boolean = useMemo(() => {
        password.trim()
        return password.length >= 3
    }, [password])

    /**
   * Indicates whether the form is valid and can be submitted.
   * @type {boolean}
   */
    const isFormValid: boolean = useMemo(() => {
        return password.trim() != "" && confirmation.trim() != "" && email.trim() != "" && isEmail && isEqual && isLongEnough
    }, [password, confirmation, email, isEmail, isEqual])


    return (
        <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
            <View style={styles.header}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>AREA</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{ margin: 10, fontSize: 35, fontWeight: 'bold', color: 'white' }} >Inscription</Text>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ maxHeight: 50, alignSelf: 'stretch', width: '90%', padding: 10, color: 'white' }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType='emailAddress'
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder='Enter email address'
                        placeholderTextColor='white'
                    />
                </View>
                {!isEmail ? <Text style={{ color: 'red', alignSelf: 'flex-start', marginLeft: 10 }}>Adresse e-mail incorrecte</Text> : null}
                <Text style={{ color: 'white' }}>Continue with <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('OAuths')}>Google</Text></Text>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ maxHeight: 50, alignSelf: 'stretch', width: '90%', padding: 10, color: 'white' }}
                        secureTextEntry={passwordVisibility}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType='password'
                        onChangeText={text => setNewPassword(text)}
                        value={password}
                        placeholder='Enter new password'
                        placeholderTextColor='white'
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
                    </Pressable>
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ maxHeight: 50, alignSelf: 'stretch', width: '90%', padding: 10, color: 'white' }}
                        secureTextEntry={confirmationVisibility}
                        autoCapitalize='none'
                        autoCorrect={false}
                        textContentType='password'
                        onChangeText={text => setConfirmation(text)}
                        value={confirmation}
                        placeholder='Confirm your password'
                        placeholderTextColor='white'
                    />
                    <Pressable onPress={handleConfirmationVisibility}>
                        <MaterialCommunityIcons name={confirmationRightIcon} size={22} color="white" />
                    </Pressable>
                </View>
                {!isEqual ? <Text style={{ color: 'red', alignSelf: 'flex-start', marginLeft: 10 }}>Les mots de passe sont différents</Text> : null}
                {!isLongEnough ? <Text style={{ color: 'red', alignSelf: 'flex-start', marginLeft: 10 }}>Le mot de passe doit faire trois caractères minimum</Text> : null}
                <TouchableOpacity style={styles.button} onPress={async () => { navigation.navigate('App') }} disabled={!isFormValid}>
                    <Text style={{ color: 'white' }}>Create account</Text>
                </TouchableOpacity>
                {/* remove this part from line 159 for there is no back-end: if (await sendForm(emailInput, passwordInput)) */}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
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
