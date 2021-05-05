import { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>VapeAware</h1>
                <h3>{this.props.children}</h3>
            </div>
        );
    }
}