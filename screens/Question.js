import React from 'react';
import { StyleSheet, View } from 'react-native';

function Question(props) {

    return (
        <View style={styles.question}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    question: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginVertical: 10
    }
});

export default Question;