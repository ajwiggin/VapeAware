import React from 'react';
import { Button } from 'react-native-elements';

import PageWrapper from './PageWrapper';

// React component represeting home page with two buttons
function Home(props) {
    return (
        <PageWrapper>
            <Button
                title="Record Session"
                onPress={props.setPage.recordSession}
            />
            <Button
                title="Settings"
                onPress={props.setPage.settings}
            />
        </PageWrapper>
    );
}

export default Home;