import React from 'react';
import ReactDOM from 'react-dom';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveDomain = this.handleSaveDomain.bind(this);
        this.handleRemoveDomain = this.handleRemoveDomain.bind(this);
        this.handlChangeDomain = this.handlChangeDomain.bind(this);
        this.state = {
            date: new Date(),
            entry: null,
            domains: []
        };
    }
    
    renderItems() {
        return this.state.domains.map((domain) =>  <li>{domain}</li>);
    }

    handlChangeDomain(e) {
        console.log('changing domain.....');
        this.setState({ entry: e.target.value })
    }

    handleSaveDomain() {
        console.log('saving domain...');
        this.state.domains.push(this.state.entry)
        console.log(this.state.domains)
        this.forceUpdate();
    }

    handleRemoveDomain() {
        // this.setState({isLoggedIn: true});
        console.log('removing domain...');
    }

    render() {
        return (
            <div>
                CONTROL PANEL HERE
                <div>
                    New Domain
                    <input type="text" onChange={this.handlChangeDomain}/>
                    <button onClick={this.handleSaveDomain}>Add</button>
                </div>
                <div>
                    <ul>
                        {this.renderItems()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ControlPanel;