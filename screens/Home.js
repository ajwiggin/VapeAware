import React from 'react';
import { Button } from 'react-native-elements';
import Footer from './Footer';

import PageWrapper from './PageWrapper';

function Home(props) {
    return (
        <PageWrapper>
            <Button
                title="Record Session"
                onPress={props.setPage.recordSession}
            />
            <Footer
                centerButton={<Button title="Settings" onPress={props.setPage.settings} />}
            />
        </PageWrapper>
    );
}

export default Home;