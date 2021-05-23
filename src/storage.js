import Firebase from 'firebase/app';
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: 'https://vapeawaretesting-default-rtdb.firebaseio.com',
    projectId: process.env.PROJECTID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEAUREMENTID
};

if (!Firebase.apps.length) Firebase.initializeApp(firebaseConfig);

/**
 * @param {string} uniqueID The participant's UUID
 */
export const firebase = uniqueID => ({
    uniqueID,

    /**
     * Stores session data under the participant's UUID, date, and sessions
     * @param {{}} data Data to store
     */
    recordSession: async data => {
        const today = new Date().toDateString();
        (await Firebase.database().ref(`${uniqueID}/${today}/sessions`).push()).set(data);
    },

    /**
     * Stores session data under the participant's UUID, date, and survey
     * @param {{}} data Data to store
     */
    recordSurvey: async data => {
        const today = new Date().toDateString();
        (await Firebase.database().ref(`${uniqueID}/${today}/surveys`).push()).set(data);
    }
});

export const local = {
    /**
     * Retrieves data from local storage and parses to JSON if possible
     * @param {string} key Location of item in local storage
     * @returns {?(string|Object)} string or Object from local storage or null if the key is does not exist
     */
    read: (key) => {
        try {
            return AsyncStorage.getItem(key)
                .then(val => {
                    try { return JSON.parse(val); }
                    catch (e) { return val; }
                });
        } catch (e) {
            console.error(`Error retieving data: ${e}`);
        }
    },

    /**
     * Stores an item in local storage
     * @param {string} key Location to store item in local storage
     * @param {(string|Object)} value Value to store in local storage
     */
    write: async (key, value) => {
        const stringVal = typeof value === 'string' ? value : JSON.stringify(value);
        try {
            await AsyncStorage.setItem(key, stringVal)
                .then(() => console.log(`Data stored in local storage: (${key}, ${stringVal})`));
        } catch (e) {
            console.error(`Error storing data : (${key}, ${stringVal})`);
        }
    },

    /**
     * Removes a key/value pair in local storage
     * @param {string|[string]} keys Location(s) at which to remove the key/value pairs
     */
    remove: async (keys) => {
        try {
            if (typeof key === 'string') await AsyncStorage.removeItem(keys);
            else await AsyncStorage.multiRemove(keys);
        } catch (e) {
            console.error(`Error removing key: ${e}`);
        }
    }
};

export const secure = {

    /**
     * Gets a value stored at the given key in secure storage
     * @param {string} key The location to search for the value
     * @returns {Promise<string>} The value or null if the key/value pair does not exist
     */
    read: async key => {
        // if (!secure.isAvailable()) return null;
        return await SecureStore.getItemAsync(key)
            .catch(e => console.error(e));
    },

    /**
     * Stores a string in secure storage
     * @param {string} key The location to search for the value
     * @param {string} val The value to store at the key
     * @returns {Promise<void>}
     */
    write: async (key, val) => {
        return await SecureStore.setItemAsync(key, val)
            .catch(e => console.error(e));
    },

    /**
     * Checks to see if SecureStorage is available
     * @returns {boolean} Whether or not SecureStore is available on the device
     */
    isAvailable: async () => await SecureStore.isAvailableAsync()

};

const Storage = { firebase, local, secure };

export default Storage;