import React from 'react';
import { View, StyleSheet } from 'react-native';

function Footer(props) {
    return (
        <View style={styles.footer}>
            <View style={styles.buttonContainer}>
                {props.leftButton && React.cloneElement(props.leftButton, { style: styles.leftButton })}
            </View>
            <View style={styles.buttonContainer}>
                {props.centerButton && React.cloneElement(props.centerButton, { style: styles.centerButton })}
            </View>
            <View style={styles.buttonContainer}>
                {props.rightButton && React.cloneElement(props.rightButton, { style: styles.rightButton })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 25
    },
    buttonContainer: {
        flex: 1
    },
    leftButton: {},
    rightButton: {},
    centerButton: {}
});

export default Footer;