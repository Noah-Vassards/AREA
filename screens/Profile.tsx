import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { RootStackScreenProps } from "../types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";

/**
 * Represents the Profile screen component.
 * @param {Object} navigation - The navigation object.
 * @return {JSX.Element} - The JSX element for the Profile screen component.
 */
export default function Profile({ navigation }: RootStackScreenProps<'Profile'>): JSX.Element {
  const [email, setItem] = useState('');

  /**
    * Fetches the email from AsyncStorage and sets it to the email state variable.
    */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const value = await AsyncStorage.getItem('email');
      if (value) {
        setItem(value);
      }
    };

    fetchData();
  }, []);

  /**
    Clears all data from AsyncStorage.
    */
  const clearData = async ():Promise<void> => {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys)
    if (keys.length != 0) {
      await AsyncStorage.multiRemove(keys);
    }
  }


  return (
    <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
      <View style={styles.container}>
        <SettingsCard
          title="Profile"
          email={email}
          color='white'
        />
        <TouchableOpacity style={styles.button} onPress={async () => { await clearData(); navigation.navigate('Root'); }}>
          <Text style={{ color: 'white' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

/**
  Renders the settings card component.
  @param {Object} props - Component props.
  @param {string} props.title - The title of the settings card.
  @param {string} props.email - The email to display.
  @param {string} props.color - The color of the settings card.
  @return {JSX.Element} Settings card JSX.Element.
    */
function SettingsCard(props: {
  title: string;
  email: string;
  color: string;
}) {
  return (
    <View style={styles.settingsCard}>
      <Text style={{ color: 'white', margin: 10 }}>ACCOUNT INFORMATIONS</Text>
      <View style={{ flexGrow: 1, justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>E-mail</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', alignSelf: 'center', marginRight: 5 }}>{props.email}</Text>
            <Text style={{ fontSize: 30 }}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>Password</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', alignSelf: 'center', marginRight: 5 }}></Text>
            <Text style={{ fontSize: 30 }}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>Connected services</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', alignSelf: 'center', marginRight: 5 }}></Text>
            <Text style={{ fontSize: 30 }}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
  settingsCard: {
    flex: 0,
    height: 210,
    width: '100%',
    backgroundColor: "#B6B6B6",
    borderRadius: 17,
    opacity: 0.64,
    padding: 10,
    marginVertical: 10,
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