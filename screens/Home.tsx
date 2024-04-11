import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackScreenProps, RootTabParamList, RootTabScreenProps } from "../types";
import { Feather } from '@expo/vector-icons'
import * as React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Profile from "./Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconColor } from "../IconColor";
import Services from "./Services";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

/**
 * Renders the bottom tab navigator component.
 * @function
 * @returns {JSX.Element} BottomTabNavigator component.
 */
export default function BottomTabNavigator(): JSX.Element {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: "Home",
          tabBarIcon: () => <Feather size={30} style={{ marginBottom: -3 }} name='home' color='white' />
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={({ }) => ({
          title: "profile",
          tabBarIcon: () => <Feather size={30} style={{ marginBottom: -3 }} name='eye' color='white' />
        })}
      />
       <BottomTab.Screen
        name="Services"
        component={Services}
        options={({ }) => ({
          title: "services",
          tabBarIcon: () => <Feather size={30} style={{ marginBottom: -3 }} name='search' color='white' />
        })}
      />
      {/*<BottomTab.Screen
        name="bite"
        component={Home}
        options={({ }) => ({
          title: "bite",
          tabBarIcon: () => <Feather size={30} style={{ marginBottom: 0 }} name='folder' color='white' />
        })}
      /> */}
    </BottomTab.Navigator>
  )
}

/**
 * Renders the Home screen component.
 * @function
 * @param {RootTabScreenProps<'Home'>} props - The component props.
 * @returns {JSX.Element} Home screen component.
 */
function Home({ navigation }: RootTabScreenProps<'Home'>): JSX.Element {

  const [cards, setCards] = React.useState<React.ReactNode[]>([]);
  const isFocused = useIsFocused()

  /**
   * Triggers the screen load action. Fetch area from api and create the cards
   * @async
   * @returns {Promise<void>} Promise object representing the screen load action.
   */
  const onScreenLoad = async (): Promise<void> => {
    try {
      const user_id = Number(await AsyncStorage.getItem('id'))
      if (isNaN(user_id)) {
        return;
      }
      console.log(user_id)
      const response = await fetch(`http://10.68.247.177:3000/api/area?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (!response.ok) {
        const message = await response.json()
        ToastAndroid.showWithGravity(message.error, ToastAndroid.SHORT, ToastAndroid.TOP)
        return;
      } else {
        const data = await response.json()
        console.log("there are", data.length, "area")

        for (var i = 0; i < data.length; ++i) {
          console.log(data[i])
          const title = data[i].title
          const actionDet = data[i].action.split('.')
          const reactionDet = data[i].reaction.split('.')
          console.log(actionDet)
          console.log(reactionDet)

          const colorAction = IconColor[actionDet[0]]
          const colorReaction = IconColor[reactionDet[0]]

          const newCard = (
            <AreaCard
              key={data[i].id}
              title={title}
              description={actionDet[1].replace(/_/g, ' ') + ' when ' + reactionDet[1].replace(/_/g, ' ')}
              nameRight={actionDet[0]}
              colorRight={colorAction}
              nameLeft={reactionDet[0]}
              colorLeft={colorReaction}
              onPress={() => console.log(`Clicked on card with index ${i}`)}
              onDelete={() => removeCard(i)}
            />
          );
          setCards((cards) => [...cards, newCard]);
        }
      }
    } catch (error) {
        console.log(error)
    }
  }

  /**
    * Removes a card from the array of cards.
    * @param {number} index - The index of the card to remove.
    */
  const removeCard = (index: number) => {
    setCards((cards) => cards.filter((_, i) => i !== index));
  };

  /**
   * Loads the screen when it is in focus.
   * @param {boolean} isFocused - Indicates whether the screen is in focus.
   */
  React.useEffect(() => {
    const getToken = async () => {
      console.log("google token", await AsyncStorage.getItem('token-google'))
      console.log("github token", await AsyncStorage.getItem('token-github'))
      console.log("twitch token", await AsyncStorage.getItem('token-twitch'))
    }

    if (isFocused) {
      console.log("screen is focused")
      setCards([])
      onScreenLoad();
      getToken()
    }
  }, [isFocused])

  return (
    <LinearGradient colors={['#000000',
      '#0047FF']} style={styles.linearGradient}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {cards.map((card: React.ReactNode, index) => {
          return React.cloneElement(card, { onPress: () => console.log(`Clicked on card with index ${index}`) });
        })}
        <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('CreateArea') }}>
          <MaterialCommunityIcons name="plus-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

function AreaCard(props: {
  key: number,
  title: string;
  description: string;
  nameRight: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  colorRight: string;
  nameLeft: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  colorLeft: string;
  onPress: () => void;
  onDelete: () => void;
}) {
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={() => { { props.onPress() }; navigation.navigate('AreasInfo') }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1, height: 150,
        width: '80%', marginBottom: 10, alignItems: 'center'
      })}>
      <View style={styles.areaCard}>
        <Text style={styles.areaCardTitle}>{props.title}</Text>
        <Text style={styles.areaCradDesc}>{props.description}</Text>
        <View style={styles.areaCardLogo}>
          <View style={styles.logo}>
            <MaterialCommunityIcons size={45} name={props.nameRight} color={props.colorRight} />
          </View>
          <View style={styles.logo}>
            <MaterialCommunityIcons size={45} name={props.nameLeft} color={props.colorLeft} />
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => props.onDelete()}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Pressable >

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
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
  areaCard: {
    height: 150,
    width: '100%',
    backgroundColor: "#B6B6B6",
    borderRadius: 17,
    opacity: 0.64,
    padding: 10,
    marginBottom: 10,
  },
  areaCardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  areaCradDesc: {
    color: 'white',
    fontSize: 10,
  },
  areaCardLogo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row-reverse'
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
  addButton: {
    height: 50,
    width: '80%',
    backgroundColor: "#B6B6B6",
    borderRadius: 17,
    opacity: 0.64,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  }
})