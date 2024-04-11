import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native"

/**
  * A card component for displaying account informations
  * @function
  * @param {Object} props - The component props
  * @param {string} props.title - The title of the settings option
  * @param {string} props.name - The name of the MaterialCommunityIcons icon
  * @param {string} props.color - The color of the MaterialCommunityIcons icon
  * @returns {JSX.Element} - A settings card component
  */
export default function AccountCard(props: {
  title: string;
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}): JSX.Element {
  const navigation = useNavigation()
  return (
    <View
      style={{
        height: 210, width: '100%', alignItems: 'center',
      }}>
      <View style={styles.accountCard}>
        <View style={{ flex: 1 }}>
          <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: 'white', margin: 10 }} />
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ color: 'white', fontSize: 11, }}>valentino.piero@yotmail.com</Text>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ color: 'white', fontSize: 25, marginVertical: 5, alignSelf: 'flex-end' }}>Xkiler_du_44X</Text>
        </View>
        <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center', flexDirection: 'column', borderColor: 'blue', borderWidth: 0 }}>
          {/* <View style={{ height: '50%', width: '100%', flexGrow: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'black', opacity: 0.57, borderRadius: 15, padding: 5, width: '100%', }} contentContainerStyle={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 17 }}>salutkjbqsdksqhdhslqjsdkhfmsldqjhfsm!dljsdmkifjdsl fsDKHF ESjldhf sdkh sdkmflsdjhfmlsqdhkdsqjh jldqh msdh isdfh lkfsdhkflhsdfyjhsdkh fsdjhfisdpfh isdugf lsdkhfvisdg fsidmfhsdkhfdsiufhosdm gflsdih fsd</Text>
                        </ScrollView>
                    </View> */}
          <TouchableOpacity style={{ backgroundColor: 'white', opacity: 0.57, borderRadius: 10, width: 130, height: 30, margin: 10, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10, position: 'absolute', bottom: 0 }}>
            <Text style={{ fontSize: 20 }}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  accountCard: {
    position: 'relative',
    height: '100%',
    width: '90%',
    alignSelf: 'flex-start',
    backgroundColor: "#B6B6B6",
    borderRadius: 17,
    opacity: 0.64,
    padding: 10,
    flexDirection: 'row',
    JustifyContent: 'center',
  },
})