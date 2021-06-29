/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import App1 from './App1';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { createStore, CombineReducers, combineReducers } from 'redux';
import { TotalReducer, ThemeColor } from './src/redux/reducer';

const CombinedReducer = combineReducers({ TotalReducer, ThemeColor })
const store = createStore(CombinedReducer);

const MainApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => MainApp);
