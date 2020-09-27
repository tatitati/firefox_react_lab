import React from 'react';
import ReactDOM from 'react-dom';

/* global browser */

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

    componentDidMount() {
        this.readFromStorage()
        this.forceUpdate()
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

    readFromStorage(){
        if (typeof browser !== 'undefined') {
            var that = this
            browser.storage.sync.get(['domains'], function(result) {
                if('domains' in result){
                    that.setState({ domains: result.domains })
                }
            });
        }
    }

    saveInStorage(domains){
        if (typeof browser !== 'undefined') {
            browser.storage.sync.set({"domains": domains});
        }

        this.readFromStorage()
    }

    handleRemoveDomain(domain, index) {
        this.state.domains.splice(index, 1);
        this.saveInStorage(this.state.domains)
        this.forceUpdate();
    }

    handlChangeDomain(e) {
        this.setState({ entry: e.target.value })
    }

    handleSaveDomain() {
        var domain = this.state.entry
        this.state.domains.push(domain)
        this.saveInStorage(this.state.domains)
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        New Domain:
                        <input type="text" onChange={this.handlChangeDomain}/>
                        <button onClick={this.handleSaveDomain}>Add</button>
                    </p>
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