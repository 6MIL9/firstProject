import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import store from './redux/reduxStore'
import { Provider } from 'react-redux';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App store={store} />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));


serviceWorker.unregister();