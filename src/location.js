import * as Location from 'expo-location';
import Storage from './storage';
import { LOCATIONS } from './constants';

/**
 * Checks whether the participant has given location access
 * TODO: Can local storage be replaced by Location.getPermissionsAsync()?
 * @returns {boolean} Whether or not the participant has given location access. Returns null if location has not been requested
 */
export const hasAccess = () => Storage.local.read(LOCATIONS.LOCATIONACCESS);

/**
 * Requests location access from the participant and stores the result in local storage.
 * TODO: Should the participant be required to give location access? If they decide not to, we could just add a location selector
 * @returns {boolean} Whether or not the participant has given location access
 */
export async function requestAccess() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    const hasAccess = status === 'granted';
    Storage.local.write(LOCATIONS.LOCATIONACCESS, hasAccess);
    return hasAccess;
}

/**
 * Gets the participant's current location
 * @returns {Promise<Location.LocationObject>} A promise of the participant's current position
 */
export async function getCurrentPosition() {
    if (hasAccess() === null) requestAccess();
    return await Location.getCurrentPositionAsync({});
}

export default { hasAccess, requestAccess, getCurrentPosition };