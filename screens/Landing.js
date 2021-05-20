import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import PageWrapper from './PageWrapper';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

function Landing(props) {
    const [time, setTime] = useState(defaultTime);

    const onClose = () => {
        Storage.local.write(LOCATIONS.SURVEYREMIDNER, time);
        props.onClose();
    };

    return (
        <PageWrapper>
            <Text>Thank you for participating!</Text>
            <Text>We employ optional daily surveys that are completed at the same time every day.</Text>
            <Text>What time would you like to be reminded about these surveys?</Text>
            <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                minuteInterval={15}
                onChange={(_, selectedTime) => setTime(selectedTime || time)}
                style={styles.TimePicker}
            />
            <Button
                title="Continue"
                onPress={onClose}
            />
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    TimePicker: {
        width: 100
    }
});

export default Landing;