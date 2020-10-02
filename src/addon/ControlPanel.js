import React from 'react';
import ReactDOM from 'react-dom';
import ServiceStorage from "./ServiceStorage";

/* global browser */

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveDomain = this.handleSaveDomain.bind(this);
        this.handleRemoveDomain = this.handleRemoveDomain.bind(this);
        this.handlChangeDomain = this.handlChangeDomain.bind(this);
        this.serviceStorage = new ServiceStorage()
        this.state = {
            date: new Date(),
            entry: null,
            domains: []
        };
    }

    componentDidMount() {
        this.readDomainsToHighlightFromStorage()
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

    readDomainsToHighlightFromStorage(){
        if (typeof browser !== 'undefined') {
            var that = this
            browser.storage.sync.get(['domains'], function(domainsInStorage) {
                if('domains' in domainsInStorage){
                    that.setState({ domains: domainsInStorage.domains })
                }
            });
        }
    }

    saveInStorage(domains){
        if (typeof browser !== 'undefined') {
            browser.storage.sync.set({"domains": domains});
        }

        this.readDomainsToHighlightFromStorage()
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
        var domain = this.state.entry.trim()
        if(domain !== "") {
            this.state.domains.push(domain)
            this.saveInStorage(this.state.domains)
            this.forceUpdate();
        }
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