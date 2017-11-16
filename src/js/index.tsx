import React from 'react';
import ReactDOM from 'react-dom';
import { App, initModel } from './components/App';

ReactDOM.render(
    <App model={initModel()}/>,
    document.getElementById('example'));
