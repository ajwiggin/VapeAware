import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Storage from './src/storage';
import { PAGES, LOCATIONS } from './src/constants';

// import TestDataCollection from './src/testDataCollection';

import Landing from './screens/Landing';
import Home from './screens/Home';
import RecordSession from './screens/RecordSession';
import Settings from './screens/Settings';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

class App extends Component {
    constructor(props) {
        super(props);
        // Remove all previous storage if opening in development
        if (__DEV__) Storage.local.remove(Object.values(LOCATIONS));
        this.state = {
            currentPage: PAGES.HOME,
            hasVisited: false
        };
    }

    componentDidMount() {
        Storage.local.read(LOCATIONS.HASVISITED)
            .then(hasVisited => {
                this.setHasVisited(hasVisited || false);
            });
    }

    setHasVisited = (hasVisited) => this.setState({ hasVisited });

    closeLanding = () => {
        Storage.local.write(LOCATIONS.HASVISITED, true);
        this.setHasVisited(true);
    }

    getCurrentPage = () => {
        switch (this.state.currentPage) {
            case PAGES.HOME: return <Home setPage={this.setPage} />;
            case PAGES.RECORDSESSION: return <RecordSession setPage={this.setPage} />;
            case PAGES.SETTINGS: return <Settings setPage={this.setPage} />;
        }
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: containerColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default App;