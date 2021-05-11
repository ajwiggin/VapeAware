import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

import PageWrapper from './PageWrapper';

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
        <PageWrapper title="Settings">
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
        </PageWrapper>
    );
}

export default Settings;