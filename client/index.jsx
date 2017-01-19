import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/Editor';

require('../common/main.scss');
require('./assets/favicon.ico');

ReactDOM.render(<App />, document.getElementById('App'));
