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

    renderDomains() {
        return this.state.domains.map((domain, index) =>
            <li key={index}>
                <button onClick={() => this.handleRemoveDomain(domain, index)}>
                    Delete
                </button>

                {domain}
            </li>
        );
    }

    handleRemoveDomain(domain, index) {
        console.log('deleting domain.....');
        this.state.domains.splice(index, 1);
        this.forceUpdate();
    }

    handlChangeDomain(e) {
        console.log('changing domain.....');
        this.setState({ entry: e.target.value })
    }

    handleSaveDomain() {
        console.log('saving domain...');
        this.state.domains.push(this.state.entry)
        this.forceUpdate();
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
                        {this.renderDomains()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ControlPanel;