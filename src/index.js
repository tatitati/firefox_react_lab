import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* global browser */
browser.tabs.onActivated.addListener(event => update(event.tabId));
browser.tabs.onUpdated.addListener(tabId => update(tabId));

const themes = {
    'live': {
        colors: {
            frame: "#CD3333"
        }
    }
};

var current = null;


async function update(tabId) {
    console.log('UPDATING.......')
    if (current == null) {
        current = await browser.theme.getCurrent();
    }

    let tab = await browser.tabs.get(tabId);
    let windowId = tab.windowId;
    var url = tab.url;
    console.log("URL.....");
    console.log(url);
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
