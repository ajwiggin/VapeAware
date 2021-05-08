import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

function Landing(props) {
    const [time, setTime] = useState(defaultTime);

    const onChange = (_, selectedTime) => setTime(selectedTime || time);

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