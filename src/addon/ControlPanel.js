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
        this.readDomainsToHighlightFromStorage()
        this.forceUpdate()
    }

    readDomainsToHighlightFromStorage(){
        if (typeof browser !== 'undefined') {
            var that = this
            browser.storage.sync.get(['domains'], function(domainsInStorage) {
                if('domains' in domainsInStorage){
                    that.setState({ domains: domainsInStorage.domains })
                }
            });
        } else {
            this.setState({ domains: ["asdfasdf", "aaaaadsfasdfasdfasfasfadsf"] })
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

    renderDomains() {
        return this.state.domains.map((domain, index) =>
            <li key={index} class="block p-3 hover:bg-red-100">
                <button class="bg-red-200 hover:bg-red-500 py-2 px-4 mx-2" onClick={() => this.handleRemoveDomain(domain, index)}>X</button>
                <span>{domain}</span>
            </li>
        );
    }

    render() {
        return (
            <div class="container">
                <div class="block bg-gray-400 p-3">
                    <button class="bg-blue-200 hover:bg-blue-500 py-2 px-4 mx-2" onClick={this.handleSaveDomain}>Add domain</button>
                    <input type="text" class="py-2 px-4 mx-2" onChange={this.handlChangeDomain}/>
                </div>
                <div class="block p-3">
                    <ul>{this.renderDomains()}</ul>
                </div>
            </div>
        );
    }
}

export default ControlPanel;