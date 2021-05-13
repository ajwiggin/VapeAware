import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

// Create the default time as 6pm
const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

function Landing(props) {
    // Create the state variable time and the function setTime, to change its value
    const [time, setTime] = useState(defaultTime);

    // Listener function called when time selector changes
    // Sets the state (time) to the selected time (or the previous state if selectedTime is null)
    const onChange = (_, selectedTime) => setTime(selectedTime || time);

    // Button press handler, writes selected time to local storage
    const onClose = () => {
        Storage.local.write(LOCATIONS.SURVEYREMIDNER, time);
        props.onClose();
    };

    return (
        <View>
            <Text>Thank you for participating!</Text>
            <Text>We employ optional daily surveys that are completed at the same time every day.</Text>
            <Text>What time would you like to be reminded about these surveys?</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                minuteInterval={15}
                onChange={onChange}
            />
            <Button
                title="Continue"
                onPress={onClose}
            />
        </View>
    );
}

export default Landing;