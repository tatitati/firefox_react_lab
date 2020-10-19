import React from 'react';

/* global browser */

class NewDomain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entry: null
        };
    }

    addDomain = (event) =>  {
        this.props.onsave(this.state.entry)
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.onsave(this.state.entry)
        }
    }

    render() {
        return <div className="flex mb-4 bg-gray-400 p-3">
            <button
                className="w-1/5 bg-blue-200 hover:text-white border border-blue-300 hover:bg-blue-500 py-2 px-4 mx-2"
                onClick={this.addDomain}>Add domain
            </button>
            <input type="text" className="w-4/5 py-2 px-4 mx-2"
                   onChange={(event) => this.setState({entry: event.target.value.trim()})}
                   onKeyPress={this.handleKeyPress}
                   value={this.state.entry}
            />
        </div>
    }
}

export default NewDomain;