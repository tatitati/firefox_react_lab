import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    render() {
        return (
            <div>
                <h3>{this.state.date.toLocaleTimeString()}.</h3>
                <a href="#" onClick={this.handleClick}>
                    Click me
                </a>
            </div>
        );
    }
}

export default Clock;