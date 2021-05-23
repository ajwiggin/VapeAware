import React from 'react';
import { StyleSheet, View } from 'react-native';

function Question(props) {
    return (
        <View style={[styles.question, props.horizontal && styles.horizontal]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    question: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginVertical: 20
    },
    horizontal: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});

export default Question;