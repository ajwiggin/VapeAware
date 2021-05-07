import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Settings</Text>
                <Button
                    title="Go home"
                    onPress={this.props.setPage.home}
                />
            </View>
        );
    }
}

export default Settings;