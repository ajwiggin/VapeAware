import Firebase from 'firebase';
import config from './config';

const dev = process.env.NODE_ENV === "development";

export const db = Firebase.initializeApp(config);

export const writeData = async (ref='/', data) {
    Firebase.database().ref(ref).set(data)
        .then(() => { if (dev) console.log(`Data written to ref '${ref}'`) })
        .catch(() => { if (dev) console.error(`Data write failed to ref '${ref}'`) });
}

export const readData = async (ref='/') => {
    return Firebase.database().ref(ref)
        .on('value', snapshot => snapshot.val());
}

export const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
        position => position, // should full location be logged or only coords"? position.coords
        error => console.error(error));
}