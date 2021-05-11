import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

function PageWrapper(props) {
    return (
        <View>
            <Text h1>VapeAware</Text>
            {props.title && <Text h3>{props.title}</Text>}
            {props.children}
        </View>
    );
}

export default PageWrapper;