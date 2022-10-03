import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactSSLRedirect from "react-ssl-redirect";

ReactSSLRedirect();
ReactDOM.render(<App />, document.getElementById('root'));
