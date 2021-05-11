import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';
import Location from '../src/location';
import SessionSurvey from './SessionSurvey';

class RecordSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrent: true,
            when: 'default',
            where: 'default',
            survey: null,
            showSurvey: false
        };
    }

    async componentDidMount() {
        const uniqueID = await Storage.secure.read(LOCATIONS.UNIQUEID) || await Storage.local.read(LOCATIONS.UNIQUEID);
        this.firebase = Storage.firebase(uniqueID);
    }

    isCurrentToggle = () => this.setState({ isCurrent: !this.state.isCurrent })

    onContinue = async () => {
        if (!this.state.isCurrent && (this.state.when === 'default' || this.state.where === 'default')) {
            // TODO: Error, user must select a value!
            console.log('TODO: You must select a value!');
            return;
        }
        this.setState({ showSurvey: true });
    };

    onSurveySubmit = survey => {
        let data = this.state;
        delete data.showSurvey;

        if (survey) data.survey = survey;

        if (data.isCurrent) {
            Location.getCurrentPosition()
                .then(location => {
                    data.when = new Date().toTimeString();
                    data.where = location;
                    this.firebase.recordSession(data);
                });
            this.props.setPage.home();
            return;
        }

        this.firebase.recordSession(data);

        this.props.setPage.home();
    }

    onWhenChange = (when) => this.setState({ when })

    onWhereChange = (where) => this.setState({ where })

    render() {
        if (this.state.showSurvey) {
            return <SessionSurvey onSubmit={this.onSurveySubmit} />;
        }
        return (
            <View>
                <Text>Record Session</Text>
                <Text>Is this happening currently?</Text>
                <Switch
                    value={this.state.isCurrent}
                    onValueChange={this.isCurrentToggle}
                />
                {!this.state.isCurrent &&
                    <View>
                        <Text>What time did this event occur?</Text>
                        <Picker
                            selectedValue={this.state.when}
                            onValueChange={this.onWhenChange}
                        >
                            <Picker.Item label="Select one" value="default" />
                            <Picker.Item label="Morning" value="morning" />
                            <Picker.Item label="Afternoon" value="afternoon" />
                            <Picker.Item label="Night" value="night" />
                        </Picker>
                        <Text>Where were you when the event occured?</Text>
                        <Picker
                            selectedValue={this.state.where}
                            onValueChange={this.onWhereChange}
                        >
                            <Picker.Item label="Select one" value="default" />
                            <Picker.Item label="Home" value="home" />
                            <Picker.Item label="School" value="school" />
                            <Picker.Item label="Work" value="work" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>
                }
                <Button
                    title="Save"
                    onPress={this.onContinue}
                />
                <Button
                    title="Cancel"
                    onPress={this.props.setPage.home}
                />
            </View>
        );
    }
}

export default RecordSession;