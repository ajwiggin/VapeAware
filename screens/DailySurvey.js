import React, { Component } from 'react';
import { ButtonGroup, Button, Input, Text } from 'react-native-elements';

import PageWrapper from './PageWrapper';
import Question from './Question';
import Footer from './Footer';

class DailySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = props.data || {
            vapeAmount: null,
            mood: null,
            otherMood: null,
            moodInput: null,
            habitInput: null,
            expiration: new Date(props.startTime).setTime(props.startTime + (4 * 60 * 60 * 1000))
        };
    }

    vapeAmountButtons = ['Less Than Usual', 'Same', 'More Than Usual'];
    moodButtons = ['Angry', 'Happy', 'Sad', 'Other'];

    render() {
        return (
            <PageWrapper title="Daily Survey">
                <Question>
                    <Text>How much did you vape today?</Text>
                    <ButtonGroup
                        buttons={this.vapeAmountButtons}
                        selectedIndex={this.state.vapeAmount}
                        onPress={vapeAmount => this.setState({ vapeAmount })}
                    />
                </Question>

                <Question>
                    <Text>What was your overall mood for the day?</Text>
                    <ButtonGroup
                        buttons={this.moodButtons}
                        selectedIndex={this.state.mood}
                        onPress={mood => this.setState({ mood })}
                    />
                    {this.state.mood === 'Other' &&
                        <Input
                            placeholder="Other"
                            onChangeText={otherMood => this.setState({ otherMood })}
                        />
                    }
                </Question>

                <Question>
                    <Text>Did anything happen today that might have affected your mood?</Text>
                    <Input
                        onChangeText={moodInput => this.setState({ moodInput })}
                        placeholder="Text"
                    />
                </Question>

                <Question>
                    <Text>Did anything happen today that might have impacted your vaping habit?</Text>
                    <Input
                        onChangeText={habitInput => this.setState({ habitInput })}
                        placeholder="Text"
                    />
                </Question>

                <Footer
                    leftButton={
                        <Button
                            title="Save"
                            onPress={() => this.props.save(this.state)}
                        />
                    }
                    rightButton={
                        <Button
                            title="Submit"
                            onPress={() => this.props.submit(this.state)}
                        />
                    }
                />

            </PageWrapper>
        );
    }
}

export default DailySurvey;