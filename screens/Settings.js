import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

function Settings(props) {
    const [time, setTime] = useState(defaultTime);

    const onSave = () => {
        Storage.local.write(LOCATIONS.SURVEYREMIDNER, time);
        props.setPage.home();
    };

    const onTimeChange = (_, selectedTime) => setTime(selectedTime || time);

    useEffect(() => {
        Storage.local.read(LOCATIONS.SURVEYREMIDNER)
            .then(readTime => {
                setTime(new Date(readTime));
            });
    }, []);

    return (
        <View>
            <Text>Settings</Text>
            <Text>Select daily reminder time!</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                minuteInterval={15}
                onChange={onTimeChange}
            />
            <Button
                title="Save"
                onPress={onSave}
            />
        </View>
    );
}

export default Settings;