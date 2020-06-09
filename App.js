/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from "./src/redux/reducers";
import rootSaga from "./src/redux/sagas";
import {Provider} from "react-redux";
import MainNavigation from "./src/routes/MainNavigation";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends Component
{
    render() {
        return (
            <Provider store={store}>
                <MainNavigation/>
            </Provider>
        );
    }
}

export default App;
