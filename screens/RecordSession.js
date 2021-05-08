import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import Storage from '../src/storage';
// import { LOCATIONS } from '../src/constants';
import Location from '../src/location';

class RecordSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrent: true,
            when: 'default',
            where: 'default'
        };
    }

    isCurrentToggle = () => this.setState({ isCurrent: !this.state.isCurrent })

    onContinue = async () => {
        if (!this.state.isCurrent && (this.state.when === 'default' || this.state.where === 'default')) {
            // Error, user must select a value!
            return;
        }
        if (this.state.isCurrent) {
            //! This should be handled asyncronously so there is no visible lag
            const location = await Location.getCurrentPosition();
            this.setState({
                when: Date.now(),
                where: location
            });
        }
        // TODO: Write data to storage (fb or local?)
        console.log(this.state);
        this.props.setPage.home();
    }

    onWhenChange = (when) => this.setState({ when })

    onWhereChange = (where) => this.setState({ where })

    render() {
        return (
            <View>
                <Text>Record Session</Text>
                <Text>Is this happening currently?</Text>
                <Switch
                    value={this.state.isCurrent}
                    onValueChange={this.isCurrentToggle}
                />
                {!this.state.isCurrent &&
                    <>
                        <Text>What time did this event occur?</Text>
                        <Picker
                            selectedValue={this.state.when}
                            onValueChange={this.onWhenChange}
                        >
                            <Picker.Item label='Select one' value='default' />
                            <Picker.Item label='Morning' value='morning' />
                            <Picker.Item label='Afternoon' value='afternoon' />
                            <Picker.Item label='Night' value='night' />
                        </Picker>
                        <Text>Where were you when the event occured?</Text>
                        <Picker
                            selectedValue={this.state.where}
                            onValueChange={this.onWhereChange}
                        >
                            <Picker.Item label='Select one' value='default' />
                            <Picker.Item label='Home' value='home' />
                            <Picker.Item label='School' value='school' />
                            <Picker.Item label='Work' value='work' />
                            <Picker.Item label='Other' value='other' />
                        </Picker>
                    </>
                }
                <Button
                    title="Save"
                    onPress={this.onContinue}
                />
            </View>
        );
    }
}

export default RecordSession;