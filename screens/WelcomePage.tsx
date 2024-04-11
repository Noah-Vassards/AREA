import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../types";

/**
 * Renders the welcome page of the app.
 *
 * @param {Object} navigation - The navigation object.
 * @param {object} props.navigation - The navigation object.
 *
 * @returns {JSX.Element} The welcome page component.
 */
export default function WelcomePage({ navigation }: RootStackScreenProps<'Root'>) {
    return (
        <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>AREA</Text>
                </View>
                <View style={styles.body}>
                    <Text style={{ textAlign: 'center', marginHorizontal: 0, fontSize: 25, fontWeight: 'bold', color: 'white' }}>Automation platform of his digital life</Text>
                    <View style={{ position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'blue', borderWidth: 0, width: '100%', padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            style={styles.button}
                        >
                            <Text style={{ color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            style={styles.button}
                        >
                            <Text style={{ color: 'white' }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        width: '100%',
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
})
