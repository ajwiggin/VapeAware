import React, { Component, useEffect, useState } from 'react';
import { ButtonGroup, Button, Text, Chip } from 'react-native-elements';
import PageWrapper from './PageWrapper';

class SessionSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feelings: [],
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
        survey.alone = this.aloneButtons[survey.alone];
        this.props.onSubmit(survey);
    }

    aloneButtons = ['Alone', 'With Others']

    render() {
        return (
            <PageWrapper title="Optional Survey">
                <Text>How do you feel?</Text>
                <SelectableButton title="Happy" onClick={this.feelingChange} />
                <SelectableButton title="Sad" onClick={this.feelingChange} />
                <SelectableButton title="Angry" onClick={this.feelingChange} />
                <SelectableButton title="Excited" onClick={this.feelingChange} />
                <SelectableButton title="Confident" onClick={this.feelingChange} />
                <SelectableButton title="Jealous" onClick={this.feelingChange} />
                <SelectableButton title="Guilty" onClick={this.feelingChange} />
                <SelectableButton title="Proud" onClick={this.feelingChange} />
                <SelectableButton title="Annoyed" onClick={this.feelingChange} />

                <Text>What is your current stress level?</Text>
                <ButtonGroup
                    onPress={stressLevel => this.setState({ stressLevel })}
                    selectedIndex={this.state.stressLevel}
                    buttons={[0, 1, 2, 3, 4, 5]}
                />

                <Text>Are you alone or with others?</Text>
                <ButtonGroup
                    onPress={alone => this.setState({ alone })}
                    selectedIndex={this.state.alone}
                    buttons={this.aloneButtons}
                />

                <Button
                    title="Skip"
                    onPress={() => this.onComplete(false)}
                />
                <Button
                    title="Submit"
                    onPress={() => this.onComplete(true)}
                />
            </PageWrapper>
        );
    }
}

function SelectableButton(props) {
    const [pressed, setPressed] = useState(false);

    useEffect(
        () => props.onClick(props.title, pressed),
        [pressed]
    );

    const onPress = () => setPressed(!pressed);

    return <Chip onPress={onPress} type={pressed ? 'solid' : 'outline'} {...props} />;
}

export default SessionSurvey;