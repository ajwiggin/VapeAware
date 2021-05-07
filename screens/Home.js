import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View>
                <Text>VapeAware</Text>
                <Button
                    title="Record Session"
                    onPress={this.props.setPage.recordSession}
                />
                <Button
                    title="Settings"
                    onPress={this.props.setPage.settings}
                />
            </View>
        );
    }
}

export default Home;