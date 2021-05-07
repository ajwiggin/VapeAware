import React from 'react';
import { View, Button } from 'react-native';
import * as Location from './location';
import Notifications from './notifications';

export default function TestDataCollection() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Button onPress={() => Location.requestLocationAccess()} title='Request Location' />
          <Button onPress={() => Location.getCurrentPosition().then(loc => console.log(loc))} title='Get current Location' />
          <Button onPress={() => Notifications.registerForPushNotificationsAsync()} title='Register for PNs' />
          <Button onPress={() => Notifications.sendPushNotification("Sent!", "This is the body")} title='Send PN' />
        </View>
    );
}
