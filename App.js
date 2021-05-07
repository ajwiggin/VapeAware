import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Storage from './src/storage';

// import TestDataCollection from './src/testDataCollection';

import Landing from './screens/Landing';
import Home from './screens/Home';
import RecordSession from './screens/RecordSession';
import Settings from './screens/Settings';

const pages = {
    HOME: Symbol('home'),
    RECORDSESSION: Symbol('recordsession'),
    SETTINGS: Symbol('settings')
};

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

class App extends Component {
    constructor(props) {
        super(props);
        Storage.local.write('hasVisited', false);
        this.state = {
            currentPage: pages.HOME,
            hasVisited: false
        };
    }

    componentDidMount() {
        Storage.local.read('hasVisited')
            .then(hasVisit => {
                this.setHasVisited(hasVisit || false);
            });
    }

    setHasVisited = (hasVisited) => this.setState({ hasVisited });

    closeLanding = () =>{
        Storage.local.write('hasVisited', true);
        this.setHasVisited(true);
    }

    getCurrentPage = () => {
        switch (this.state.currentPage) {
            case pages.HOME: return <Home setPage={this.setPage} />;
            case pages.RECORDSESSION: return <RecordSession setPage={this.setPage} />;
            case pages.SETTINGS: return <Settings setPage={this.setPage} />;
        }
    }

    setPage = {
        home: () => this.setState({ currentPage: pages.HOME }),
        recordSession: () => this.setState({ currentPage: pages.RECORDSESSION }),
        settings: () => this.setState({ currentPage: pages.SETTINGS })
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