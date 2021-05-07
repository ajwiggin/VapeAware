import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Storage from '../src/storage';

const defaultTime = new Date();
defaultTime.setHours(18, 0, 0, 0);

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { time: defaultTime };
    }

    onChange = (_, selectedTime) => this.setState({ time: selectedTime || this.state.time });

    onClose = () => {
        Storage.local.write('surveyReminder', this.state.time);
        this.props.onClose();
    }

    render() {
        return (
            <View>
                <Text>Thank you for participating!</Text>
                <Text>We employ optional daily surveys that are completed at the same time every day.</Text>
                <Text>What time would you like to be reminded about these surveys?</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.time}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    minuteInterval={15}
                    onChange={this.onChange}
                />
                <Button
                    title="Continue"
                    onPress={this.onClose}
                />
            </View>
        );
    }
}

export default Landing;