import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Store from './store/reducers';

const store = createStore(
  Store,
  compose(
    applyMiddleware(thunk),
    // composeWithDevTools()
  )
);

ReactDOM.render(<Provider store={store} children={<App />} />, document.getElementById('application'));
serviceWorker.unregister();
