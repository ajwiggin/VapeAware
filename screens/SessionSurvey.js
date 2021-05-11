import React, { Component, useEffect, useState } from 'react';
import { ButtonGroup, Button, Text } from 'react-native-elements';
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

    aloneChange = alone => this.setState({ alone });

    stressChange = stressLevel => this.setState({ stressLevel });

    CreateButton = val => () => <Text>{val}</Text>;

    render() {
        return (
            <PageWrapper title="Optional Survey">
                <Text>How do you feel?</Text>
                <SelectableButton title="Happy" onClick={this.feelingChange} />
                <SelectableButton title="Sad" onClick={this.feelingChange} />
                <SelectableButton title="Mad" onClick={this.feelingChange} />

                <Text>What is your current stress level?</Text>
                <ButtonGroup
                    onPress={this.stressChange}
                    selectedIndex={this.state.stressLevel}
                    buttons={[
                        { element: this.CreateButton(0) },
                        { element: this.CreateButton(1) },
                        { element: this.CreateButton(2) },
                        { element: this.CreateButton(3) },
                        { element: this.CreateButton(4) },
                        { element: this.CreateButton(5) }
                    ]}
                />

                <Text>Are you alone or with others?</Text>
                <ButtonGroup
                    onPress={this.aloneChange}
                    selectedIndex={this.state.alone}
                    buttons={[
                        { element: this.CreateButton('Alone') },
                        { element: this.CreateButton('With Others') }
                    ]}
                />

                <Button
                    title="Skip"
                    onPress={() => this.props.onSubmit()}
                />
                <Button
                    title="Submit"
                    onPress={() => this.props.onSubmit(this.state)}
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

    return <Button onPress={onPress} type={pressed ? 'solid' : 'outline'} {...props} />;
}

export default SessionSurvey;