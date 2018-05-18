import { AsyncStorage } from 'react-native'; 
import axios from 'axios' 
import uuid from 'uuid' 
import base64 from 'base-64' 
import get from 'lodash/get' 
import { Constants } from 'expo';

import store from '../redux/store';

const urlRoot = "http://api.mixpanel.com"; 
const { MIXPANEL_TOKEN } = Constants.manifest.extra;
 
const sendEvent = async function(name, props = {}) { 
  const user = get(store.getState().users, 'user', null);
  const databaseId = user && (user.id || user.facebook_id || user.google_id || user.twitter_id);
  const temporaryId = await getUserTemporaryId();
  const id = (name === "$create_alias") ? temporaryId : (databaseId || temporaryId);

  const data = { 
    "event": `${name}`, 
    "properties": { 
      "token": MIXPANEL_TOKEN, 
      "distinct_id": id, 
      ...props, 
    } 
  }; 
 
  const encodedData = base64.encode((JSON.stringify(data))); 
  const url = `${urlRoot}/track/?data=${encodedData}`; 
  return axios.get(`${url}`); 
} 

const SetUserTemporaryId = () => {
  const id = uuid(); 
  AsyncStorage.setItem('UserTemporaryId', id); 
  return id;
}

/* eslint-disable */

export const getUserTemporaryId = async function() { 
  try { 
    const temporaryId = await AsyncStorage.getItem('UserTemporaryId'); 
    if (temporaryId != null){ 
      return temporaryId;
    } else { 
      SetUserTemporaryId();
    } 
  } catch (error) { 
    SetUserTemporaryId();
  } 
}

/* eslint-enable  */
 
export const actions = { 
  signupButton: () => sendEvent('Pressed sign up button'),
  startedSignup: (method) => sendEvent(`Started sign up with ${method}`),
  finishedSignup: (method) => sendEvent(`Finished sign up with ${method}`),
  createAlias: (userId) => sendEvent("$create_alias", {"alias": userId}),
  addCoinButton: () => sendEvent('Pressed add another coin button'),
  saveCoinButton: () => sendEvent('Pressed save coin button'),
  navigation: (screenName) => sendEvent(`Pressed navigation - ${screenName}`),
  estimationExplanation: () => sendEvent(`Pressed estimation explanation`),
} 
