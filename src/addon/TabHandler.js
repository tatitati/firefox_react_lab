import React from 'react';
import ReactDOM from 'react-dom';

class TabHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                Tab handler here
            </div>
        );
    }
}

export default TabHandler;