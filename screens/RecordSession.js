import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class RecordSession extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Record Session</Text>
                <Button
                    title="Go home"
                    onPress={this.props.setPage.home}
                />
            </View>
        );
    }
}

export default RecordSession;