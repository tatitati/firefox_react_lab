import React from 'react';
import ReactDOM from 'react-dom';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                CONTROL PANEL HERE
            </div>
        );
    }
}

export default ControlPanel;