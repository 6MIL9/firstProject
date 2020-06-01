import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './App'; 
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    
    <MainApp/>, document.getElementById('root'));


serviceWorker.unregister();