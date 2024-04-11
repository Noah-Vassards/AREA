import { LinkingOptions } from "@react-navigation/native";
import * as Linking from 'expo-linking'

import { RootStackParamList } from "../types";

/**
  * Configuration for deep linking in the app
  * @type {LinkingOptions<RootStackParamList>}
  */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: 'root',
      Login: 'login',
      Connect: 'connect',
      SignUp: 'signup',
      App: {
        screens: {
          Home: {
            screens: {
              Home: 'home',
            },
          },
        },
      },
      ResetPassword: 'resetpassword',
      Profile: 'profile',
    },
  },
};

export default linking;