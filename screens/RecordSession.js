import React, { Component } from 'react';
import { View, Switch, Modal, StyleSheet } from 'react-native';
import { Button, Text, ButtonGroup } from 'react-native-elements';

import PageWrapper from './PageWrapper';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';
import Location from '../src/location';
import SessionSurvey from './SessionSurvey';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native';

class RecordSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrent: true,
            when: null,
            where: null,
            survey: null,
            modalVisible: false,
            showSurvey: false
        };
    }

    async componentDidMount() {
        const uniqueID = await Storage.secure.read(LOCATIONS.UNIQUEID) || await Storage.local.read(LOCATIONS.UNIQUEID);
        this.firebase = Storage.firebase(uniqueID);
    }

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

        data.when = this.whenButtons[data.when];
        data.where = this.whereButtons[data.where];

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

    whenButtons = ['Morning', 'Afternoon', 'Night']
    whereButtons = ['Home', 'School', 'Work', 'Other']

    render() {
        if (this.state.showSurvey) {
            return <SessionSurvey onSubmit={this.onSurveySubmit} />;
        }
        return (
            <PageWrapper title="Record Session">
                <Text>Is this happening currently?</Text>
                <Switch
                    value={this.state.isCurrent}
                    onValueChange={() => this.setState({ isCurrent: !this.state.isCurrent })}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                {!this.state.isCurrent &&
                    <View>
                        <Text>What time did this event occur?</Text>
                        <Picker
                        <ButtonGroup
                            onPress={when => this.setState({ when })}
                            selectedIndex={this.state.when}
                            buttons={this.whenButtons}
                        />
                        <Text>Where were you when the event occured?</Text>
                        <ButtonGroup
                            onPress={where => this.setState({ where })}
                            selectedIndex={this.state.where}
                            buttons={this.whereButtons}
                        />
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
            </PageWrapper>
        );
    }
}

/* eslint-disable react-native/no-color-literals */
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
export default RecordSession;