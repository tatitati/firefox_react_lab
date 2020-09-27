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
                    console.log("We have previous domains in storage.....")
                    that.setState({ domains: result.domains })
                } else {
                    console.log("Storage was empty, none domains stored")
                }
            });
        } else {
            console.log('Reading from storage: browser is not defined, likely the js app is not running like an addon, but as a normal js application')
        }
    }

    saveInStorage(domains){
        if (typeof browser !== 'undefined') {
            browser.storage.sync.set({"domains": domains}, function () {
                console.log('Value saved in browser');
            });
        } else {
            console.log('Saving in storage: browser is not defined, likely the js app is not running like an addon, but as a normal js application')
        }

        this.readFromStorage()
    }

    handleRemoveDomain(domain, index) {
        console.log('deleting domain.....');
        this.state.domains.splice(index, 1);
        this.saveInStorage(this.state.domains)
        this.forceUpdate();
    }

    handlChangeDomain(e) {
        console.log('changing domain.....');
        this.setState({ entry: e.target.value })
    }

    handleSaveDomain() {
        console.log('saving domain...');
        var domain = this.state.entry
        this.state.domains.push(domain)
        this.saveInStorage(this.state.domains)
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div>
                    New Domain:
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