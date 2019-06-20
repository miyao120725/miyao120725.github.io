import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/base.css';
import './style/common.css';
import './api/responsive';
import RouterMap from './router/Router';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Global from './api/global';

axios.interceptors.response.use((response) => {
    if (response.data.code === 100006 || response.data.code === 100007) {
        Global.delCookie('APIToken', window.location.hostname);
    }
    return response;
}, () => {
    const error = 'error';
    return Promise.reject(error);
});

ReactDOM.render(<RouterMap/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
