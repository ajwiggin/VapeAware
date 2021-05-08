import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';

class DailySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creationTime: new Date(),
            feeling: 'default'
        };
    }

    componentDidMount() {
        const lastSurvey = Storage.local.read(LOCATIONS.DAILYSURVEY);
        const yesterday = Date.now() - 60 * 60 * 24 * 1000;
        console.log(lastSurvey.creationTime);

        if (lastSurvey && lastSurvey.creationTime > yesterday) {
            console.log('Exists and is in the past 24 hours');
            this.setState({ lastSurvey });
        }
    }

    onSubmit = () => {
        const responses = this.state;
        for (let key in responses) {
            if (responses[key] === 'default') delete responses[key];
        }
        this.props.submit(responses);
        this.props.setPage.home();
    }

    onSave = () => {
        this.props.save(this.state);
        this.props.setPage.home();
    }

    onCancel = () => {
        this.props.setPage.home();
    }

    onFeelingChange = (feeling) => this.setState({ feeling });

    render() {
        return (
            <View>
                <Text>Daily Survey</Text>
                <Text>How do you feel?</Text>
                <Picker
                    selectedValue={this.state.feeling}
                    onValueChange={this.onFeelingChange}
                >
                    <Picker.Item label='Select One' value='default' />
                    <Picker.Item label='Good' value='morning' />
                    <Picker.Item label='Medium' value='afternoon' />
                    <Picker.Item label='Bad' value='night' />
                </Picker>
                <Button
                    title='Save and Submit'
                    onPress={this.onSubmit}
                />
                <Button
                    title='Save'
                    onPress={this.onSave}
                />
                <Button
                    title='Cancel'
                    onPress={this.onCancel}
                />
            </View>
        );
    }
}

export default DailySurvey;