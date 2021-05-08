import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { v4 as uuid } from 'uuid';

import Storage from './src/storage';
import { PAGES, LOCATIONS } from './src/constants';
import Notifications from './src/notifications';

import Landing from './screens/Landing';
import Home from './screens/Home';
import RecordSession from './screens/RecordSession';
import Settings from './screens/Settings';
import DailySurvey from './screens/DailySurvey';

class App extends Component {
    constructor(props) {
        super(props);
        // Remove all previous storage if opening in development
        if (__DEV__) Storage.local.remove(Object.values(LOCATIONS));
        this.state = {
            currentPage: PAGES.HOME,
            hasVisited: false,
            notification: null,
            incompleteDailySurvey: false
        };
        this.notificationResponseListener = React.createRef();
        this.saveDailySurvey = this.saveDailySurvey.bind(this);
        this.submitDailySurvey = this.submitDailySurvey.bind(this);
    }

    async componentDidMount() {
        Storage.local.read(LOCATIONS.HASVISITED)
            .then(hasVisited => {
                this.setHasVisited(hasVisited || false);
            });
        this.uniqueID = await Storage.secure.read(LOCATIONS.UNIQUEID) || await Storage.local.read(LOCATIONS.UNIQUEID);
        if (!this.uniqueID) {
            this.uniqueID = uuid();
            Storage.secure.isAvailable()
                .then(available => {
                    if (available) Storage.secure.write(LOCATIONS.UNIQUEID, this.uniqueID);
                    else Storage.local.write(LOCATIONS.UNIQUEID, this.uniqueID);
                });
        }
        console.log(this.uniqueID);
        this.setState({ uniqueID: this.uniqueID });
        this.notificationResponseListener.current = Notifications.addListener(response => {
            console.log(`Notification response recieved: ${JSON.stringify(response)}`);
            this.setPage.dailySurvey();
        });
    }

    componentWillUnmount() {
        Notifications.removeListener(this.notificationResponseListener.current);
    }

    setHasVisited = (hasVisited) => this.setState({ hasVisited });

    closeLanding = () => {
        Storage.local.write(LOCATIONS.HASVISITED, true);
        this.setHasVisited(true);
    }

    getCurrentPage = () => {
        switch (this.state.currentPage) {
            case PAGES.HOME: return <Home setPage={this.setPage} hasSurvey={this.state.incompleteDailySurvey} />;
            case PAGES.RECORDSESSION: return <RecordSession setPage={this.setPage} />;
            case PAGES.SETTINGS: return <Settings setPage={this.setPage} />;
            case PAGES.DAILYSURVEY: return <DailySurvey setPage={this.setPage} save={this.saveDailySurvey} submit={this.submitDailySurvey} />;
        }
    }

    saveDailySurvey = (data) => {
        // write to local storage
        Storage.local.write(LOCATIONS.DAILYSURVEY, data);
        this.setState({ incompleteDailySurvey: true });
        console.log(data);
    }

    submitDailySurvey = (data) => {
        // write to firebase
        Storage.firebase(this.uniqueID).recordSurvey(data);
        console.log(data);
    }

    testNotifs = async () => {
        Notifications.send('Title', 'Body!');
    }

    setPage = {
        home: () => this.setState({ currentPage: PAGES.HOME }),
        recordSession: () => this.setState({ currentPage: PAGES.RECORDSESSION }),
        settings: () => this.setState({ currentPage: PAGES.SETTINGS }),
        dailySurvey: () => this.setState({ currentPage: PAGES.DAILYSURVEY })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                {this.state.hasVisited ? this.getCurrentPage() : (<Landing onClose={this.closeLanding} />)}
                <Button
                    title='Test Notification'
                    onPress={this.testNotifs}
                />
            </SafeAreaView>
        );
    }
}

const containerColor = '#fff';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: containerColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default App;