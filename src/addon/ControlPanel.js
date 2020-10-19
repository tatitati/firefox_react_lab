import React from 'react';
import ListDomains from './ListDomains'
import NewDomain from './NewDomain'

/* global browser */

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveDomain = this.handleSaveDomain.bind(this);
        this.deleteDomain = this.deleteDomain.bind(this);
        this.state = {
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
            this.setState({ domains: [] })
        }
    }

    saveInStorage(domains){
        if (typeof browser !== 'undefined') {
            browser.storage.sync.set({"domains": domains});
        }

        this.readDomainsToHighlightFromStorage()
    }

    deleteDomain(index) {
        this.state.domains.splice(index, 1);
        this.saveInStorage(this.state.domains)
    }

    handleSaveDomain(domain) {
        if(domain !== "") {
            this.state.domains.push(domain)
            this.saveInStorage(this.state.domains)
        }
    }

    render() {
        return (
            <div className="container">
                <NewDomain onsave={this.handleSaveDomain}/>
                <div className="block p-3">
                    <ListDomains domains={this.state.domains} ondelete={this.deleteDomain}/>
                </div>
            </div>
        )
    }
}

export default ControlPanel;