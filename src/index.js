// @flow
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store';

// import './index.css';
import App from './App';

const appDiv = document.getElementById('app')

appDiv && render(
    <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
    </Provider>
    , appDiv);
