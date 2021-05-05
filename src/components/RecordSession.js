import { Component } from 'react';

export default class RecordSession extends Component {
    constructor(props) {
        super(props);
        this.state = { current: true };
    }

    render() {
        return (
            <div className="recordsession">
                {   // vape use or urge? 
                    // is current?
                    // if not
                        // when was this?
                        // where were you when the event happened 
                }
            </div>
        );
    }
}