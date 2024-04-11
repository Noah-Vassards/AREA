import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { RootStackScreenProps } from "../types";


/**
 * Sends an Area request to the server.
 * @async
 * @function
 * @param {string} action - The name of the action service formated like service_name.action_name
 * @param {string} reaction - The name of the reaction service formated like service_name.reaction_name.
 * @returns {Promise<boolean>} - A Promise that resolves with true if the request is successful, false otherwise.
 */
async function sendArea(action: string, reaction: string, title: string, action_data: Object, reaction_data: Object): Promise<boolean> {
  try {
    const user_id = Number(await AsyncStorage.getItem('id'))
    console.log("user id :", user_id)
    const response = await fetch(`http://10.68.247.177:3000/api/area`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        action: action,
        action_data: JSON.stringify(action_data),
        reaction_data: JSON.stringify(reaction_data),
        reaction: reaction,
        user_id: user_id,
      })
    })
    console.log("here")
    const message = await response.json()
    if (response.status == 200) {
      console.log("success")
      console.log(message)
      return true
    } else {
      console.log("failed")
      console.log(message)
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

function createObject(keys: string[], values: string[]): Object {
  let tmp = "{"
  for (let i = 0; i < keys.length && i < values.length; ++i) {
    tmp = tmp.concat('"' + keys[i] + '": "' + values[i] + '",')
  }
  tmp = tmp.concat('"api_token": ' + `${AsyncStorage.getItem('token-github').then(token => token)}`)
  tmp = tmp.concat('}')
  console.log(tmp)
  const newObj = JSON.parse(tmp)
  console.log("Object", newObj)
  return newObj
}

/**
 * Renders the CreateArea screen.
 * @function
 * @param {Object} navigation - The navigation object.
 * @returns {JSX.Element} - A JSX element that represents the CreateArea screen.
 */
export default function CreateArea({ navigation }: RootStackScreenProps<'CreateArea'>): JSX.Element {

  const isFocused = useIsFocused()

  const [openAService, setOpenAService] = useState(false);
  const [valueAService, setValueAService] = useState('');
  const [itemsAService, setItemsAService] = useState([]);
  const [selectedAItem, setSelectedAItem] = useState('');

  const [openActions, setOpenActions] = useState(false);
  const [valueActions, setValueActions] = useState('');
  const [actions, setActions] = useState([]);

  const [openRService, setOpenRService] = useState(false);
  const [valueRService, setValueRService] = useState('');
  const [itemsRService, setItemsRService] = useState([]);
  const [selectedRItem, setSelectedRItem] = useState('');

  const [openReaction, setOpenReaction] = useState(false);
  const [valueReaction, setValueReaction] = useState('');
  const [reaction, setReaction] = useState([]);

  const [inputsActions, setInputsActions] = useState<string[]>([]);
  const [placeholderAction, setPlaceholderAction] = useState<string[]>([]);

  const [inputsReaction, setInputsReaction] = useState<string[]>([]);
  const [placeholderReaction, setPlaceholderReaction] = useState<string[]>([]);

  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    /**
     * Fetches data from the server and sets the itemsAService state variable.
     * @async
     * @function
     * @returns {Promise<Array<any>>}
     */
    async function fetchdata(): Promise<Array<any>> {
      try {
        const response = await fetch('http://10.68.247.177:3000/api/area/about', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const message = await response.json()
        console.log("setting data")
        console.log(message.server.services.length)
        return message.server.services
      } catch (error) {
        console.log("error")
        console.log(error)
        return []
      }
    };

    fetchdata().then(data => {
      if (data.length == 0) {
        console.log("data empty")
        return
      }
      const services = data.map((item) => ({ label: item.name, value: item.name }))
      console.log("setting services")
      setItemsAService(services)
    })
  }, []);

  /**
    * Fetches actions for the selected service.
    */
  useEffect(() => {
    /**
     * Fetches actions from the server.
     * @async
     * @function
     * @returns {Promise<Array>} The actions for the selected service.
     */
    async function fetchActions(): Promise<Array<any>> {
      if (selectedAItem.length == 0) {
        console.log("no selected service")
        return [];
      }
      console.log(`service set as ${selectedAItem}`)
      try {
        const response = await fetch(`http://10.68.247.177:3000/api/area/about/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const res = await response.json()
        const message = res.server.services
        console.log("setting actions")
        let serviceActions = []
        for (let i = 0; i < message.length; ++i) {
          console.log(message[i].name, message[i].actions.length)
          if (message[i].name === selectedAItem) {
            console.log('FOUND !')
            serviceActions = message[i].actions
            console.log(message[i].actions.data)
            break
          }
        }
        console.log(`${selectedAItem} actions`, serviceActions)
        return serviceActions
      } catch (error) {
        console.log(error)
        return []
      }
    };

    fetchActions().then(actions => {
      /**
       * Map the actions to an array of objects with label and value properties.
       */
      const actionItems = actions.map((item) => ({ label: item.name, value: item.name }))
      setActions(actionItems)
    })
  }, [selectedAItem]);


  useEffect(() => {
    /**
     * Fetches actions from the server.
     * @async
     * @function
     * @returns {Promise<Array>} The actions for the selected service.
     */
    async function fetchActions(): Promise<void> {
      if (valueActions.length == 0) {
        console.log("no selected action")
        return;
      }
      console.log(`action set as ${valueActions}`)
      try {
        const response = await fetch(`http://10.68.247.177:3000/api/area/about/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const res = await response.json()
        const message = res.server.services
        console.log("setting actions")
        let actionData = []
        for (let i = 0; i < message.length; ++i) {
          console.log(message[i].name, message[i].actions.length)
          if (message[i].name === selectedAItem) {
            for (let j = 0; j < message[i].actions.length; ++j) {
              if (message[i].actions[j].name == valueActions) {
                console.log('found')
                console.log('data', message[i].actions[j].data)
                console.log("fields in data", message[i].actions[j].data.length)
                actionData = message[i].actions[i].data
                for (let k = 0; k < message[i].actions[j].data.length; ++k) {
                  if (message[i].actions[j].data[k].field == "text_input") {
                    setInputsActions((inputsActions) => [...inputsActions, ''])
                    setPlaceholderAction((placeholderActions) => [...placeholderActions, message[i].actions[j].data[k].name])
                  }
                }
                console.log('input text', inputsActions.length)
                return
              } else {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                setInputsActions([])
                setPlaceholderAction([])
              }
            }
          }
        }
        return
      } catch (error) {
        console.log(error)
        return;
      }
    };

    setInputsActions([])
    setPlaceholderAction([])
    fetchActions()
  }, [valueActions]);

  useEffect(() => {
    /**
     * Fetches reactions from the server.
     * @async
     * @function
     * @returns {Promise<Array>} The reactions for the selected service.
     */
    async function fetchReaction(): Promise<void> {
      if (valueReaction.length == 0) {
        console.log("no selected action")
        return;
      }
      console.log(`action set as ${valueReaction}`)
      try {
        const response = await fetch(`http://10.68.247.177:3000/api/area/about/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const res = await response.json()
        const message = res.server.services
        console.log("setting reactions")
        let actionData = []
        for (let i = 0; i < message.length; ++i) {
          console.log(message[i].name, message[i].reactions.length)
          if (message[i].name === selectedRItem) {
            for (let j = 0; j < message[i].reactions.length; ++j) {
              if (message[i].reactions[j].name == valueReaction) {
                console.log('found reaction data')
                console.log('data', message[i].reactions[j].data)
                console.log("fields in data", message[i].reactions[j].data.length)
                actionData = message[i].reactions[i].data
                for (let k = 0; k < message[i].reactions[j].data.length; ++k) {
                  if (message[i].reactions[j].data[k].field == "text_input") {
                    setInputsReaction((inputsReaction) => [...inputsReaction, ''])
                    setPlaceholderReaction((placeholderReaction) => [...placeholderReaction, message[i].reactions[j].data[k].name])
                  }
                }
                console.log('input text', inputsReaction.length)
                return
              } else {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Reaction")
                setInputsReaction([])
                setPlaceholderReaction([])
              }
            }
          }
        }
        return
      } catch (error) {
        console.log(error)
        return;
      }
    };

    setInputsReaction([])
    setPlaceholderReaction([])
    fetchReaction()
  }, [valueReaction]);

  /**
    * Fetches services from the server.
    */
  useEffect(() => {
    /**
      * Fetches services from the server.
      * @async
      * @function
      * @returns {Promise<Array>} The services from the server.
      */
    async function fetchdata(): Promise<Array<any>> {
      try {
        const response = await fetch('http://10.68.247.177:3000/api/area/about', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const message = await response.json()
        console.log("setting data")
        console.log(message.server.services.length)
        return message.server.services
      } catch (error) {
        console.log(error)
        return []
      }
    };

    fetchdata().then(data => {
      if (data.length == 0) {
        console.log("data empty")
        setItemsRService([])
        return
      }
      /**
       * Map the services to an array of objects with label and value properties.
       */
      const services = data.map((item) => ({ label: item.name, value: item.name }))
      console.log("setting services")
      setItemsRService(services)
    })
  }, []);

  /**
    * Fetches reactions for the selected service.
    */
  useEffect(() => {

    /**
     * Fetches reactions from the server.
     * @async
     * @function
     * @returns {Promise<Array>} The reactions for the selected service.
     */
    async function fetchReactions(): Promise<Array<any>> {
      /**
       * If no service is selected, clear reactions and return.
       */
      if (selectedRItem.length == 0) {
        console.log("no selected service")
        return [];
      }
      console.log(`service set as ${selectedRItem}`)
      try {
        const response = await fetch(`http://10.68.247.177:3000/api/area/about/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const res = await response.json()
        const message = res.server.services
        console.log("setting reaction")
        let serviceReaction = []
        for (let i = 0; i < message.length; ++i) {
          console.log(message[i].name, message[i].reactions.length)
          if (message[i].name === selectedRItem) {
            console.log('FOUND !')
            serviceReaction = message[i].reactions
            break
          }
        }
        console.log(`${selectedRItem} reaction`, serviceReaction)
        return serviceReaction
      } catch (error) {
        console.log(error)
        return []
      }
    };

    fetchReactions().then(reaction => {
      /**
       * Map the reactions to an array of objects with label and value properties.
       */
      const actionItems = reaction.map((item) => ({ label: item.name, value: item.name }))
      setReaction(actionItems)
    })
  }, [selectedRItem]);

  /**
   * Loads the screen when it is in focus.
   * @param {boolean} isFocused - Indicates whether the screen is in focus.
   */
  useEffect(() => {
    if (isFocused) {
      console.log("screen is focused")
      console.log('wipe data')
      setInputsActions([])
      setPlaceholderAction([])
      setInputsReaction([])
      setPlaceholderReaction([])
    }
  }, [isFocused])

  const handleInputChangeAction = (value: string, index: number) => {
    const newInputsActions = [...inputsActions];
    newInputsActions[index] = value;
    setInputsActions(newInputsActions)
  }

  const handleInputChangeReaction = (value: string, index: number) => {
    const newInputsReaction = [...inputsReaction];
    newInputsReaction[index] = value;
    setInputsReaction(newInputsReaction)
  }

  /**
    * Checks if the form is valid by verifying if all necessary fields have been selected
    * @function
    * @name checkForm
    * @returns {boolean} Returns a boolean indicating if the form is valid or not
    * @param {string} selectedRItem - The currently selected reaction service
    * @param {string} selectedAItem - The currently selected action service
    * @param {string} valueActions - The value of the actions input field
    * @param {string} valueReaction - The value of the reactions input field
    */
  const checkForm = useMemo((): boolean => {
    console.log(selectedRItem)
    console.log(selectedAItem)
    console.log(valueActions)
    console.log(valueReaction)

    for (let i = 0; i < inputsActions.length; ++i) {
      console.log('input', inputsActions[i])
      if (inputsActions[i].trim() === "" || inputsActions[i] === '')
        return false
    }

    if (selectedAItem == '' || selectedRItem == '' || valueActions == '' || valueReaction == '' || title.trim() == '' || title == '')
      return false
    return true
  }, [selectedRItem, selectedAItem, valueActions, valueReaction, inputsActions, title])

  return (
    <View style={{ backgroundColor: '#0047FF', flex: 1 }}>
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Choisis un titre"
          style={styles.textInput}
          value={title}
          onChangeText={(text: string) => setTitle(text)}
        />
        <View style={{ width: '100%', maxHeight: '100%', flex: 1, }}>
          <View style={[styles.form, { marginBottom: 10, zIndex: 1000 }]}>
            <Text style={styles.title}>Action</Text>
            <View style={{ flexDirection: "row" }}>
              <DropDownPicker
                open={openAService}
                value={valueAService}
                items={itemsAService}
                setOpen={setOpenAService}
                setValue={setValueAService}
                onChangeValue={(item) => { setSelectedAItem(item); console.log(`selected item ${item}`) }}
                placeholder="Choisis un service"
                containerStyle={{ height: 40, width: '50%', marginBottom: 20, zIndex: 5000, opacity: 1.0, }}
                style={{ height: 40 }}
                autoScroll={true}
                maxHeight={500}
              />
              <DropDownPicker
                open={openActions}
                value={valueActions}
                items={actions}
                setOpen={setOpenActions}
                setValue={setValueActions}
                placeholder="Choisis une action"
                containerStyle={{ height: 40, width: '50%', zIndex: 4999 }}
                style={{ opacity: 1.0, height: 40 }}
                maxHeight={500}
              />
            </View>
            <View>
              {inputsActions.map((value, index) => (
                <TextInput
                  style={styles.textInput}
                  placeholder={placeholderAction[index]}
                  key={index * -1}
                  value={value}
                  onChangeText={(text) => handleInputChangeAction(text, index)}
                />
              ))}
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Reaction</Text>
            <View style={{ flexDirection: "row" }}>
              <DropDownPicker
                open={openRService}
                value={valueRService}
                items={itemsRService}
                setOpen={setOpenRService}
                setValue={setValueRService}
                onChangeValue={(item) => { setSelectedRItem(item); console.log(`selected item ${item}`) }}
                placeholder="Choisis un service"
                containerStyle={{ height: 40, width: '50%', marginBottom: 20, zIndex: 4998, opacity: 1.0, }}
                style={{ backgroundColor: '#fff', height: 40 }}
                autoScroll={true}
              />
              <DropDownPicker
                open={openReaction}
                value={valueReaction}
                items={reaction}
                setOpen={setOpenReaction}
                setValue={setValueReaction}
                placeholder="Choisis une reaction"
                containerStyle={{ height: 40, width: '50%', zIndex: 4997 }}
                style={{ opacity: 1.0, height: 40 }}
              />
            </View>
            <View>
              {inputsReaction.map((value, index) => (
                <TextInput
                  style={styles.textInput}
                  placeholder={placeholderReaction[index]}
                  key={Date.now()}
                  value={value}
                  onChangeText={(text) => handleInputChangeReaction(text, index)}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={async () => { if (await sendArea([selectedAItem, valueActions].join('.'), [selectedRItem, valueReaction].join('.'), title, createObject(placeholderAction, inputsActions), createObject(placeholderReaction, inputsReaction))) { navigation.goBack() } }} disabled={!checkForm}>
          <Text style={{ color: 'white' }} >Créer l'AREA</Text>
        </TouchableOpacity>
      </ScrollView >
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
    width: '100%',
    borderWidth: 0,
    borderColor: "blue",
    maxWidth: '100%',
    paddingTop: (StatusBar.currentHeight !== undefined ? StatusBar.currentHeight : 0) + 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
    height: '50%',
    // backgroundColor: "#B6B6B6",
    backgroundColor: 'white',
    borderRadius: 17,
    // opacity: 0.64,
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: 'white',
    paddingBottom: 10,
    zIndex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  textInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    maxWidth: '100%',
    margin: 10,
    paddingLeft: 10,
    color: 'black',
  },
})