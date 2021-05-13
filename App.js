import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { v4 as uuid } from 'uuid';

import Storage from './src/storage';
import { PAGES, LOCATIONS } from './src/constants';

import Landing from './screens/Landing';
import Home from './screens/Home';
import RecordSession from './screens/RecordSession';
import Settings from './screens/Settings';

class App extends Component {
    constructor(props) {
        super(props);
        // Remove all previous storage if opening in development
        if (__DEV__) Storage.local.remove(Object.values(LOCATIONS));

        // Set the default state; hasVisited stores whether or not the user has ever opened the app before
        this.state = {
            currentPage: PAGES.HOME,
            hasVisited: false
        };
    }

    // Runs when the component mounts on the DOM
    async componentDidMount() {
        // Read whether or not the app has been opened from local storage
        Storage.local.read(LOCATIONS.HASVISITED)
            .then(hasVisited => {
                this.setHasVisited(hasVisited || false);
            });

        // Check secure storage (see Expo SecureStore) has the participant's unique ID
        // If it returns null (no value found), local storage is checked
        let uniqueID = await Storage.secure.read(LOCATIONS.UNIQUEID) || await Storage.local.read(LOCATIONS.UNIQUEID);

        // If the unique ID isn't found in secure or local storage, create a new one (see NodeJS UUID)
        if (!uniqueID) {
            uniqueID = uuid();
            Storage.secure.isAvailable()
                .then(available => {
                    // Write the unique ID to secure or local storage, depending on what is available
                    if (available) Storage.secure.write(LOCATIONS.UNIQUEID, uniqueID);
                    else Storage.local.write(LOCATIONS.UNIQUEID, uniqueID);
                });
        }
        console.log(uniqueID);
        this.setState({ uniqueID });
    }

    // Sets hasVisited in state
    setHasVisited = (hasVisited) => this.setState({ hasVisited });

    // Closes the landing page and writes hasVisited to local storage
    closeLanding = () => {
        Storage.local.write(LOCATIONS.HASVISITED, true);
        this.setHasVisited(true);
    }

    // Returns the current page as a React component depending on the App's state
    getCurrentPage = () => {
        switch (this.state.currentPage) {
            case PAGES.HOME: return <Home setPage={this.setPage} />;
            case PAGES.RECORDSESSION: return <RecordSession setPage={this.setPage} />;
            case PAGES.SETTINGS: return <Settings setPage={this.setPage} />;
        }
    }

    // Sets the currentPage in state (passed into each page as a prop)
    setPage = {
        home: () => this.setState({ currentPage: PAGES.HOME }),
        recordSession: () => this.setState({ currentPage: PAGES.RECORDSESSION }),
        settings: () => this.setState({ currentPage: PAGES.SETTINGS })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                {this.state.hasVisited ? this.getCurrentPage() : (<Landing onClose={this.closeLanding} />)}
            </SafeAreaView>
        );
    }
}

const containerColor = '#fff';

// Creates a stylesheet to be used in App
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: containerColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default App;