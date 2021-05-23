import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import PageWrapper from './PageWrapper';
import Footer from './Footer';

import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';
import Notifications from '../src/notifications';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

function Settings(props) {
    const [time, setTime] = useState(defaultTime);

    const onSave = () => {
        Storage.local.write(LOCATIONS.REMINDERTIME, time.getTime());
        Notifications.cancelScheduledSurvey()
            .then(() => Notifications.scheduleDailySurvey(time.getTime()));
        props.setPage.home();
    };

    useEffect(() => {
        Storage.local.read(LOCATIONS.REMINDERTIME)
            .then(readTime => {
                if (readTime) setTime(new Date(readTime));
            });
    }, []);

    return (
        <PageWrapper title="Settings">
            <Text>Select daily reminder time!</Text>
            <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                minuteInterval={15}
                onChange={(_, selectedTime) => setTime(selectedTime || time)}
                style={styles.TimePicker}
            />
            <Footer
                rightButton={<Button title="Save" onPress={onSave} />}
            />
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    TimePicker: {
        width: 100
    }
});

export default Settings;