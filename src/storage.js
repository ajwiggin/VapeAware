import Firebase from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};

Firebase.initializeApp(firebaseConfig);

export const firebase = {
    /**
     * Retrieves firebase data at specified location
     * ! This method attaches a listener to the database at the specified ref and should not be used as-written
     * @param {string} [ref='/'] Data reference location
     * @returns Data json from firebase
     */
    read: async (ref = '/') => {
        return Firebase.database().ref(ref)
            .on('value', snapshot => snapshot.val());
    },

    /**
     * Writes an object to firebase. If null is passed in, the data at the specified location will be removed
     * @param {string} ref Data reference location
     * @param {?{}} data JSON data to write
     */
    write: async (ref = '/', data) => {
        Firebase.database().ref(ref).set(data)
            .then(() => console.log(`Data written to ref '${ref}'`))
            .catch(() => console.error(`Data write failed to ref '${ref}'`));
    }
};

export const local = {
    /**
     * Retrieves data from local storage and parses to JSON if possible
     * @param {string} key Location of item in local storage
     * @returns {?(string|Object)} string or Object from local storage or null if the key is does not exist
     */
    read: async (key) => {
        try {
            const val = await AsyncStorage.getItem(key);
            try { return JSON.parse(val); }
            catch (e) { return val; }
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
     * @param {string|[string]} key Location(s) at which to remove the key/value pairs
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

const Storage = { firebase, local };

export default Storage;