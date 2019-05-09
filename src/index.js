import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { store } from './store.js';
import * as serviceWorker from './serviceWorker';

// TEMPORARY FIX TO DEAL WITH CHROME 73
// CHROME 73 MAKES WHEEL EVENTS PASSIVE BY DEFAULT FOR ROOT ELEMENTS
// THIS BREAKS MANY REACT CUSTOM WHEEL EVENTS, INCLUDING VICTORYZOOM
const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel'];

const originalAddEventListener = document.addEventListener.bind();
document.addEventListener = (type, listener, options, wantsUntrusted) => {
  let modOptions = options;
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      };
    } else if (typeof options === 'object') {
      modOptions = {
        passive: false,
        ...options,
      };
    }
  }

  return originalAddEventListener(type, listener, modOptions, wantsUntrusted);
};

const originalRemoveEventListener = document.removeEventListener.bind();
document.removeEventListener = (type, listener, options) => {
  let modOptions = options;
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      };
    } else if (typeof options === 'object') {
      modOptions = {
        passive: false,
        ...options,
      };
    }
  }
  return originalRemoveEventListener(type, listener, modOptions);
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App path="/" component={App}/>
    </Router>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
