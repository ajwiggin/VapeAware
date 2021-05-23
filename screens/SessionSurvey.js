import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Button, Text, Chip, Input } from 'react-native-elements';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';
import Question from '../components/Question';

class SessionSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feelings: [],
            otherFeeling: null,
            stressLevel: null,
            alone: null
        };
    }

    feelingChange = (feeling, isPressed) => {
        this.setState({
            feelings: isPressed ?
                this.state.feelings.concat(feeling) :
                this.state.feelings.filter(f => f !== feeling)
        });
    }

    onComplete = sendSurvey => {
        if (!sendSurvey) {
            this.props.onSubmit();
            return;
        }
        const survey = this.state;
        if (survey.otherFeeling !== null) survey.feelings.concat(survey.otherFeeling);
        delete survey.otherFeeling;
        survey.alone = this.aloneButtons[survey.alone];
        this.props.onSubmit(survey);
    }

    createFeelingsButtons = feelings => {
        return feelings.map((row, i) =>
            <View style={styles.feelingsRow} key={i}>
                {Object.keys(row).map(feeling =>
                    <View key={feeling} style={styles.feelingButton}>
                        <SelectableButton title={feeling} onClick={this.feelingChange} color={row[feeling]} />
                    </View>
                )}
            </View>
        );
    }

    feelings = [
        {
            Happy: 'green', // light green
            Sad: 'blue', // purple-blue
            Angry: 'red'
        }, {
            Excited: 'orange',
            Confident: 'blue', // dark blue
            Jealous: 'green' // yellow-green, olive?
        }, {
            Guilty: 'purple',
            Proud: 'violet',
            Annoyed: 'orange' // yellow-green
        }
    ]
    aloneButtons = ['Alone', 'With Others']

    render() {
        return (
            <PageWrapper title="Optional Survey">
                <Question>
                    <Text>How do you feel?</Text>
                    <View style={styles.feelingsContainer}>
                        {this.createFeelingsButtons(this.feelings)}
                        <View style={styles.feelingsRow}>
                            <Input
                                style={styles.feelingInput}
                                placeholder="Other"
                                onChangeText={otherFeeling => {
                                    this.setState({ otherFeeling });
                                }}
                            />
                        </View>
                    </View>
                </Question>

                <Question>
                    <Text>What is your current stress level?</Text>
                    <ButtonGroup
                        onPress={stressLevel => this.setState({ stressLevel })}
                        selectedIndex={this.state.stressLevel}
                        buttons={[0, 1, 2, 3, 4, 5]}
                    />
                </Question>

                <Question>
                    <Text>Are you alone or with others?</Text>
                    <ButtonGroup
                        onPress={alone => this.setState({ alone })}
                        selectedIndex={this.state.alone}
                        buttons={this.aloneButtons}
                    />
                </Question>

                <Footer
                    leftButton={<Button title="Skip" onPress={() => this.onComplete(false)} />}
                    rightButton={<Button title="Submit" onPress={() => this.onComplete(true)} />}
                />
            </PageWrapper>
        );
    }
}

function SelectableButton(props) {
    const [pressed, setPressed] = useState(false);
    const backgroundColor = pressed ? props.color : '#fff';
    const titleColor = pressed ? '#fff' : props.color;

    useEffect(
        () => props.onClick(props.title, pressed),
        [pressed]
    );

    return <Chip
        onPress={() => setPressed(!pressed)}
        type={pressed ? 'solid' : 'outline'}
        buttonStyle={{ backgroundColor, borderColor: props.color }}
        titleStyle={{ color: titleColor }}
        {...props}
    />;
}

const styles = StyleSheet.create({
    feelingsContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    feelingsRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    feelingButton: {
        flex: 1,
        margin: 6
    },
    feelingInput: {}
});

export default SessionSurvey;