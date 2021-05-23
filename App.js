import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { v4 as uuid } from 'uuid';

import Storage from './src/storage';
import { PAGES, LOCATIONS } from './src/constants';
import Notifications from './src/notifications';
import theme from './styles/theme';

import Landing from './screens/Landing';
import Home from './screens/Home';
import RecordSession from './screens/RecordSession';
import Settings from './screens/Settings';
import DailySurvey from './screens/DailySurvey';

function App() {
    const [currentPage, setCurrentPage] = useState(PAGES.HOME);
    const [hasVisited, setHasVisited] = useState(false);
    const [dailySurvey, setDailySurvey] = useState(null);
    const [nextSurvey, setNextSurvey] = useState(null);
    const [uniqueID, setUniqueID] = useState(null);
    const notificationResponseListener = React.createRef();

    useEffect(() => {
        if (__DEV__) Storage.local.remove(Object.values(LOCATIONS));

        Storage.local.read(LOCATIONS.HASVISITED)
            .then(newHasVisited => setHasVisited(newHasVisited || false));

        Promise.all([
            Storage.secure.read(LOCATIONS.UNIQUEID),
            Storage.local.read(LOCATIONS.UNIQUEID)
        ])
            .then(([secure, local]) => {
                let newUniqueID = secure || local;
                if (!newUniqueID) {
                    newUniqueID = uuid();
                    Storage.secure.isAvailable()
                        .then(available => {
                            if (available) Storage.secure.write(LOCATIONS.UNIQUEID, uniqueID);
                            else Storage.local.write(LOCATIONS.UNIQUEID, uniqueID);
                        });
                }
                setUniqueID(newUniqueID);
            });

        notificationResponseListener.current = Notifications.addListener(() => setPage.dailySurvey());
        return () => {
            Notifications.removeListener(notificationResponseListener.current);
            Notifications.cancelScheduledSurvey();
        };
    }, []);

    const closeLanding = time => {
        Storage.local.write(LOCATIONS.HASVISITED, true);
        setHasVisited(true);
        setNextSurvey(time);
        Notifications.scheduleDailySurvey(time);
        // .then(id => Storage.local.write(LOCATIONS.DAILYSURVEYPUSHID, id));
    };

    const getPageComponent = () => {
        switch (currentPage) {
            case PAGES.HOME: return <Home setPage={setPage} survey={dailySurvey} />;
            case PAGES.RECORDSESSION: return <RecordSession setPage={setPage} />;
            case PAGES.SETTINGS: return <Settings setPage={setPage} />;
            case PAGES.DAILYSURVEY: return <DailySurvey setPage={setPage} data={dailySurvey} startTime={nextSurvey} save={saveDailySurvey} submit={submitDailySurvey} />;
        }
    };

    const saveDailySurvey = data => {
        // write to local storage
        Storage.local.write(LOCATIONS.DAILYSURVEY, data);
        setDailySurvey(data);
        setCurrentPage(PAGES.HOME);
    };

    const submitDailySurvey = data => {
        Storage.firebase(uniqueID).recordSurvey(data);
        setDailySurvey(null);
        setCurrentPage(PAGES.HOME);
    };

    const setPage = {
        home: () => setCurrentPage(PAGES.HOME),
        recordSession: () => setCurrentPage(PAGES.RECORDSESSION),
        settings: () => setCurrentPage(PAGES.SETTINGS),
        dailySurvey: () => setCurrentPage(PAGES.DAILYSURVEY)
    };

    return (
        <ThemeProvider theme={theme}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                {hasVisited ? getPageComponent() : (<Landing onClose={closeLanding} />)}
            </SafeAreaView>
        </ThemeProvider>
    );
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