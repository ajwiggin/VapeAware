import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Button, Text, ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';

import PageWrapper from '../components/PageWrapper';
import Storage from '../src/storage';
import { LOCATIONS } from '../src/constants';
import Location from '../src/location';
import SessionSurvey from './SessionSurvey';
import Footer from '../components/Footer';
import Question from '../components/Question';

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
        if (!this.state.isCurrent && (this.state.when === null || this.state.where === null)) {
            this.setState({ modalVisible: true });
            return;
        }
        this.setState({ showSurvey: true });
    };

    onSurveySubmit = survey => {
        let data = this.state;
        delete data.showSurvey;
        delete data.modalVisible;

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
                <Question horizontal>
                    <Text>Is this happening currently?</Text>
                    <Switch
                        value={this.state.isCurrent}
                        onValueChange={() => this.setState({ isCurrent: !this.state.isCurrent })}
                    />
                </Question>

                <Modal
                    isVisible={this.state.modalVisible}
                    style={styles.modalContainer}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    swipeDirection={['down', 'up']}
                    onSwipeComplete={() => this.setState({ modalVisible: false })}
                >
                    <View style={styles.modal}>
                        <Text>Please answer all required questions before saving the session</Text>
                    </View>
                </Modal>

                {!this.state.isCurrent &&
                    <>
                        <Question>
                            <Text>What time did this event occur?</Text>
                            <ButtonGroup
                                onPress={when => this.setState({ when })}
                                selectedIndex={this.state.when}
                                buttons={this.whenButtons}
                            />
                        </Question>

                        <Question>
                            <Text>Where were you when the event occured?</Text>
                            <ButtonGroup
                                onPress={where => this.setState({ where })}
                                selectedIndex={this.state.where}
                                buttons={this.whereButtons}
                            />
                        </Question>
                    </>
                }
                <Footer
                    leftButton={<Button title="Cancel" onPress={this.props.setPage.home} />}
                    rightButton={<Button title="Save" onPress={this.onContinue} />}
                />
            </PageWrapper>
        );
    }
}

/* eslint-disable react-native/no-color-literals */
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default RecordSession;