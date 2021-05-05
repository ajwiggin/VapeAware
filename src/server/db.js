import Firebase from 'firebase';
import config from './config';

const dev = process.env.NODE_ENV === "development";

export const db = Firebase.initializeApp(config);

/**
 * Writes an object to firebase. If null is passed in, the data at the specified location will be removed
 * @param {String} ref Data reference location
 * @param {?Object} data JSON data to write
 */
export const writeData = async (ref='/', data) => {
    Firebase.database().ref(ref).set(data)
        .then(() => { if (dev) console.log(`Data written to ref '${ref}'`) })
        .catch(() => { if (dev) console.error(`Data write failed to ref '${ref}'`) });
}

/**
 * Retrieves firebase data at specified location
 * @param {String} ref Data reference location
 * @returns Data JSON
 */
export const readData = async (ref='/') => {
    return Firebase.database().ref(ref)
        .on('value', snapshot => snapshot.val());
}

/**
 * Get's the participant's current location
 * @returns Position JSON or null (error)
 */
export const getLocation = async () => {
    return navigator.geolocation.getCurrentPosition(
        position => position, // should full location be logged or only coords"? position.coords
        error => console.error(error));
}