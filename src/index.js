import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ControlPanel from './addon/ControlPanel.js';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './css/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
        <ControlPanel />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
