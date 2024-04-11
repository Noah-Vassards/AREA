import { View, StyleSheet, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TriggerCard from "../components/TriggerCard"
import AccountCard from "../components/AccountCard";
import SettingsCard from "../components/SettingsCard";

/**
  * Renders the AreasInfo component which displays more details about the user AREA.
  * @function
  * @returns {JSX.Element} Returns the JSX.Element that renders the AreasInfo component.
  */
export default function AreasInfo(): JSX.Element {
  return (
    <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add music to Spotify playlist</Text>
          <Text style={styles.description}>add a new sound weh one is deleted from the playlist</Text>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
        </View>
        <ScrollView contentContainerStyle={{
          width: '100%', alignItems: 'flex-start',
        }} >
          <Text style={{ color: 'white', fontSize: 40, marginBottom: 5, fontWeight: 'bold' }}>If</Text>
          <TriggerCard
            title="Music deleted from spotify"
            name='spotify'
            color='#1ed55f'
          />
          <AccountCard
            title="Message Received"
            name='discord'
            color='#5865f2'
          />
          <SettingsCard
            title="Message Received"
            name='discord'
            color='white'
          />
          <Text style={{ color: 'white', fontSize: 40, marginBottom: 5, fontWeight: 'bold' }}>Then</Text>
          <TriggerCard
            title="Add music to playlist"
            name='spotify'
            color='#1ed55f'
          />
          <AccountCard
            title="Message Received"
            name='discord'
            color='#5865f2'
          />
          <SettingsCard
            title="Message Received"
            name='discord'
            color='white'
          />
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    maxWidth: '100%',
    paddingTop: 50,
    flexGrow: 1,
    flexShrink: 1,
    overflow: "visible",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    width: '100%',
    display: 'flex',
    margin: 5,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    borderWidth: 0,
    borderColor: "blue",
    flexShrink: 1,
  },
})