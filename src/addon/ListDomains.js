import React from 'react';

/* global browser */

class ListDomains extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRemoveDomain(idx) {
        this.props.ondelete(idx)
    }

    renderDomains(){
        return this.props.domains.map((domain, indexDomain) =>
            <li key={indexDomain} class="block p-3 hover:bg-red-100">
                <button className="bg-red-200 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-4 mx-2"
                        onClick={(event) => this.handleRemoveDomain(indexDomain)}>X</button>
                <span>{domain}</span>
            </li>
        );
    }

    render() {
        if(this.props.domains.length !== 0) {
            return (
                <ul>
                    {this.renderDomains()}
                </ul>
            )
        } else {
            return (
                <div className="p-4 box-border border-4 border-grey-300">
                    Seems that you still didn't add any domain.<br/>
                    You can add domains or substrings to identify your live domains.
                </div>
            )
        }
    }
}

export default ListDomains;