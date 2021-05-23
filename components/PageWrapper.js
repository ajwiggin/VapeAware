import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

function PageWrapper(props) {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.header}>
                <Text h1 style={styles.appName}>VapeAware</Text>
                {props.title && <Text h3 style={styles.title}>{props.title}</Text>}
            </View>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20
    },
    header: {
        position: 'absolute',
        top: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        margin: 2
    },
    title: {
        margin: 2
    }
});

export default PageWrapper;