import { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import { useToggleConfirmationVisibility } from '../hooks/useTogglePasswordVisibility';
import { RootStackScreenProps } from '../types';

export default function ResetPassword({ navigation }: RootStackScreenProps<'ResetPassword'>) {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const { confirmationVisibility, confirmationRightIcon, handleConfirmationVisibility } = useToggleConfirmationVisibility();
    const [newPassword, setNewPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const isFormValid = useMemo(() => {

        return newPassword.trim() != "" && confirmation.trim() != ""
    }, [newPassword, confirmation])
    const isEqual = useMemo(() => {
        return newPassword == confirmation
    }, [newPassword, confirmation])

    return (
        <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
            <View style={styles.container}>
                <Text style={{ margin: 10, fontSize: 35, fontWeight: 'bold', color: 'white' }} >Reset your password</Text>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ maxHeight: 50, alignSelf: 'stretch', width: '90%', padding: 10, color:'white' }}
                        secureTextEntry={passwordVisibility}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType='password'
                        onChangeText={(text: string) => setNewPassword(text)}
                        value={newPassword}
                        returnKeyLabel='next'
                        placeholder='Enter new password'
                        placeholderTextColor="white"
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
                    </Pressable>
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ maxHeight: 50, alignSelf: 'stretch', width: '90%', padding: 10, color: 'white' }}
                        secureTextEntry={confirmationVisibility}
                        autoCapitalize="none"
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
                <TouchableOpacity style={styles.button} onPress={() => { if (isEqual) { navigation.navigate('App') } else { Alert.alert("Both password are different") } }} disabled={!isFormValid}>
                    <Text style={{ color: 'white' }}>Continue</Text>
                </TouchableOpacity>
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