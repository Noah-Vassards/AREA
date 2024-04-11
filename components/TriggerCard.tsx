import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

/**
  * A component that displays a trigger card with a title and an icon
  * @function
  * @param {Object} props - The props object
  * @param {string} props.title - The title of the card
  * @param {string} props.name - The name of the icon to be displayed
  * @param {string} props.color - The color of the icon
  * @returns {JSX.Element} - A trigger card component
    */
export default function TriggerCard(props: {
  title: string;
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}): JSX.Element {
  return (
    <View
      style={{
        height: 80, width: '50%', alignItems: 'center', marginBottom: 10,
      }}>
      <View style={styles.triggerCard}>
        <View style={styles.logo}>
          <MaterialCommunityIcons size={45} name={props.name} color={props.color} />
        </View>
        <Text adjustsFontSizeToFit={true} numberOfLines={2} style={styles.areaCardTitle}>{props.title}</Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  triggerCard: {
    height: '100%',
    width: '100%',
    backgroundColor: "#B6B6B6",
    borderRadius: 17,
    opacity: 0.64,
    padding: 10,
    flexDirection: 'row',
    JustifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: "#B6B6B6",
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaCardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },
})