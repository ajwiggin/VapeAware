import Firebase from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

Firebase.initializeApp(firebaseConfig);

export let fb = {};
export let local = {};

/**
 * Writes an object to firebase. If null is passed in, the data at the specified location will be removed
 * @param {string} ref Data reference location
 * @param {?{}} data JSON data to write
 */
fb.write = async (ref = '/', data) => {
    Firebase.database().ref(ref).set(data)
        .then(() => console.log(`Data written to ref '${ref}'`))
        .catch(() => console.error(`Data write failed to ref '${ref}'`));
};

/**
 * Retrieves firebase data at specified location
 * @param {string} [ref='/'] Data reference location
 * @returns Data json from firebase
 */
fb.read = async (ref='/') => {
    return Firebase.database().ref(ref)
        .on('value', snapshot => snapshot.val());
};

/**
 * Stores an item in local storage
 * @param {string} key Location to store item in local storage
 * @param {(string|Object)} value Value to store in local storage
 */
local.write = async (key, value) => {
    const stringVal = typeof value === 'string' ? value : JSON.stringify(value);
    try {
        await AsyncStorage.setItem(key, stringVal)
            .then(() => console.log(`Data stored in local storage: (${key}, ${stringVal})`));
    } catch (e) {
        alert(`Error storing data : (${key}, ${stringVal})`);
    }
};

/**
 * Retrieves data from local storage and parses to JSON if possible
 * @param {string} key Location of item in local storage
 * @returns {?(string|Object)} string or Object from local storage or null if the key is does not exist
 */
local.read = async (key) => {
    try {
        const val = await AsyncStorage.getItem(key);
        try { return JSON.parse(val); }
        catch (e) { return val; }
    } catch (e) {
        console.log(`Error retieving data: ${e}`);
    }
};

export default { fb, local };