import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';
import { Image, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const googlelogo = require("../assets/images/google-logo.png")
const twitchlogo = require('../assets/images/twitch-logo.png')
const githublogo = require('../assets/images/github-logo.png')

const twitchDiscovery = {
  authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
  revocationEndpoint: 'https://id.twitch.tv/oauth2/revoke',
};

const githubDiscovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/9cea5e6349f97deaef20'
};

/**
 * @param {Object} navigation - The navigation object.
 * @returns {JSX.Element} OAuths screen JSXElement.
 */
export default function OAuths({ navigation }: RootStackScreenProps<'OAuths'>): JSX.Element {
  const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
    androidClientId: "953254249965-glme5kl8eimea8uc3hp4vg2d33ag98lv.apps.googleusercontent.com",
    expoClientId: "953254249965-0o2nuoa0geu2th699f6g2lnhfb0tfj5t.apps.googleusercontent.com",
    iosClientId: "953254249965-0u1vam92j3k82001f0o65bjat3b1lmap.apps.googleusercontent.com",
  });
  const [requestTwitch, responseTwitch, promptAsyncTwitch] = useAuthRequest(
    {
      clientId: 'j1axmlxqtxjxf5xutpf4kwadpkbb67',
      redirectUri: "https://auth.expo.io/@myntarea/area",
      scopes: ['user:read:email', 'analytics:read:games'],
    },
    twitchDiscovery
  );

  const [requestGithub, responseGithub, promptAsyncGithub] = useAuthRequest(
    {
      clientId: '9cea5e6349f97deaef20',
      redirectUri: "https://auth.expo.io/@myntarea/area",
      scopes: ['identity'],
    },
    githubDiscovery
  );


  /**
    * useEffect hook that is triggered when responseGoogle, responseTwitch, or responseGithub changes.
    *
    * @param {object} responseGoogle - The response object from the Google login.
    * @param {object} responseTwitch - The response object from the Twitch login.
    * @param {object} responseGithub - The response object from the Github login.
    */
  React.useEffect(() => {
    const handleResponse = async () => {
      if (responseGoogle?.type === 'success') {
        console.log(responseGoogle.authentication)
        var data = {
          "accessToken": responseGoogle.authentication?.accessToken,
          "expiresIn": responseGoogle.authentication?.expiresIn,
          "refreshToken": responseGoogle.authentication?.refreshToken?.length !== undefined ? responseGoogle.authentication?.refreshToken : "undefined",
          "scope": responseGoogle.authentication?.scope
        }
        if (data.accessToken)
          await AsyncStorage.setItem('token-google', data.accessToken)
        await AsyncStorage.setItem('token-twitch', '')
        await AsyncStorage.setItem('token-github', '')
        connectUser(data, "google")
      }
      if (responseTwitch?.type === 'success') {
        const { code } = responseTwitch.params;
        axios.post("https://id.twitch.tv/oauth2/token", {
          "client_id": "j1axmlxqtxjxf5xutpf4kwadpkbb67",
          "client_secret": "kfow7ztrwt5ro13ly6egah2fteknai",
          "code": code,
          "grant_type": "authorization_code",
          "redirect_uri": "https://auth.expo.io/@myntarea/area"
        })
          .then(async (res) => {
            console.log(res.data)
            console.log(res.data.access_token)
            var data = {
              "accessToken": res.data.access_token,
              "expiresIn": res.data.expires_in,
              "refreshToken": res.data.refresh_token,
              "scope": res.data.scope.join()
            }
            await AsyncStorage.setItem('token-twitch', data.accessToken)
            await AsyncStorage.setItem('token-google', '')
            await AsyncStorage.setItem('token-github', '')
            console.log("google token", await AsyncStorage.getItem('token-google'))
            console.log("github token", await AsyncStorage.getItem('token-github'))
            console.log("twitch token", await AsyncStorage.getItem('token-twitch'))
            connectUser(data, "twitch")
          })
          .catch((err) => {
            console.log(err)
          })
      }
      if (responseGithub?.type === "success") {
        const { code } = responseGithub.params;
        axios.post("https://github.com/login/oauth/access_token", {
          "client_id": "9cea5e6349f97deaef20",
          "client_secret": "aa145bea4f00ebeda199282f3d6bfcc2780b943e",
          "code": code,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(async (res) => {
            console.log(res.data)
            var data = {
              accessToken: res.data.access_token,
              expiresIn: 30000,
              refreshToken: "undefined",
              scope: (res.data.scope && res.data.scope.length > 0) ? res.data.scope : "undefined"
            }
            console.log("before")
            await AsyncStorage.setItem('token-github', data.accessToken)
            await AsyncStorage.setItem('token-google', '')
            await AsyncStorage.setItem('token-twitch', '')
            console.log("after")
            connectUser(data, "github")
          })
          .catch((err) => {
            console.log("salut")
            console.log(err)
          })
      }
    }

    handleResponse()
  }, [responseGoogle, responseTwitch, responseGithub]);

  /**
    * Function that sends a request to the server to authorize the user and navigates to the App screen if authorized.
    *
    * @async
    * @param {object} data - The data object containing the access token, expiration time, refresh token, and scope.
    * @param {string} type - The type of OAuth2 token being used (e.g. "google", "twitch", "github").
    */
  const connectUser = async (data: any, type: string) => {
    try {
      console.log('here')
      const response = await fetch('http://10.68.247.177:3000/api/authorize', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: type,
          Oauth2_access_token: data.accessToken,
          Oauth2_token_type: type,
          Oauth2_expires_in: data.expiresIn,
          Oauth2_refresh_token: data.refreshToken,
          Oauth2_scope: data.scope
        })
      });
      if (response.status != 200) {
        console.log("status not ok")
        const message = await response.json()
        ToastAndroid.showWithGravity(message.error + '\n' + message.desc, ToastAndroid.SHORT, ToastAndroid.TOP)
      } else {
        const message = await response.json().then(json => json)
        console.log("there")
        console.log("message", message)
        // await AsyncStorage.setItem('token', message.token)
        // await AsyncStorage.setItem('id', message.id)
        navigation.navigate('App')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LinearGradient colors={['#000000', '#0047FF']} style={styles.linearGradient}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>AREA</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.OauthButton}>
          <Image
            style={{ height: 30, width: 30 }}
            source={googlelogo}
          />
          <TouchableOpacity
            disabled={!requestGoogle}
            onPress={() => {
              promptAsyncGoogle({ useProxy: true });
            }}>
            <Text style={{ color: 'white', alignContent: 'center', }}>S'indentfier avec Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.OauthButton}>
          <Image
            style={{ height: 30, width: 30 }}
            source={twitchlogo}
          />
          <TouchableOpacity
            disabled={!requestTwitch}
            onPress={() => {
              promptAsyncTwitch({ useProxy: true });
            }}>
            <Text style={{ color: 'white', alignContent: 'center', }}>S'identifier avec Twitch</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.OauthButton}>
          <Image
            style={{ height: 30, width: 30 }}
            source={githublogo}
          />
          <TouchableOpacity
            disabled={!requestGithub}
            onPress={() => {
              promptAsyncGithub({ useProxy: true });
            }}>
            <Text style={{ color: 'white', alignContent: 'center', }}>S'identifier avec Github</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white' }}>Ou utilise ton email pour te <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}>connecter</Text> ou <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('SignUp')}>t'inscrire</Text></Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: StatusBar.currentHeight,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  OauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})