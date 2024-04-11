import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../screens/WelcomePage"
import Login from "../screens/Login"
import Connect from "../screens/Connect"
import SignUp from "../screens/SignUp"
import ResetPassword from "../screens/ResetPassword"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import { RootStackParamList } from "../types";
import linking from "./LinkingConfiguration";
import BottomTabNavigator from "../screens/Home";
import AreasInfo from "../screens/AreasInfo";
import OAuths from "../screens/OAuths";
import CreateArea from "../screens/CreateArea";
import Services from "../screens/Services";

/**
 * Renders the navigation container with the root navigator.
 * @function
 * @returns {JSX.Element}
 */
export default function Navigation({ }) {
    return (
        <NavigationContainer
            // linking={linking}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}

/**
 * Stack navigator with the root screens.
 * @returns {JSX.Element}
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * Renders the root navigator with its screens.
 * @returns {JSX.Element}
 */
function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={WelcomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Connect' component={Connect} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="App" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="AreasInfo" component={AreasInfo} options={{ headerShown: false }} />
            <Stack.Screen name="OAuths" component={OAuths} options={{ headerShown: false }} />
            <Stack.Screen name="Services" component={Services} options={{ headerShown: false }} />
            <Stack.Screen name="CreateArea" component={CreateArea} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}