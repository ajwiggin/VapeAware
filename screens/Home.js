import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import notifications from '../src/notifications';
import Footer from './Footer';

import PageWrapper from './PageWrapper';

function Home(props) {
    const sendNotification = () => notifications.send('VapeAware', 'Test Notification!');

    return (
        <PageWrapper>
            <Button
                title="Record Session"
                onPress={props.setPage.recordSession}
                style={styles.button}
            />
            {props.survey &&
                <View style={{ ...styles.button, ...styles.surveyButton }}>
                    <Button
                        title="Continue Daily Survey"
                        onPress={props.setPage.dailySurvey}
                    />
                    <Text style={styles.surveyText}>Available until {formatAMPM(new Date(props.survey.expiration))}</Text>
                </View>
            }
            {__DEV__ &&
                <Button
                    title="Test Notification"
                    onPress={sendNotification}
                    style={styles.button}
                />}
            <Footer
                centerButton={<Button title="Settings" onPress={props.setPage.settings} />}
            />
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    button: {
        alignContent: 'center',
        marginVertical: 20
    },
    surveyButton: {
        alignItems: 'center'
    },
    surveyText: {
        fontSize: 15
    }
});

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 ? hours % 12 : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

export default Home;