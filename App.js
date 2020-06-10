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
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageName from "./src/libraries/constants/AsyncStorageName";
import { Platform } from 'react-native';

// Redux saga
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends Component
{
    componentDidMount = () => {
        this.checkPermissionFirebase();
    }

    componentWillUnmount = () => {
        if (this.notificationDisplayedListener) this.notificationDisplayedListener();
        if (this.notificationListener) this.notificationListener();
        if (this.openNotification) this.openNotification();
    }

    checkPermissionFirebase = () => {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // user has permissions
                    this.getToken().then((res) => {}).catch((err) => console.log(err));
                    this.onListenerNotification();
                } else {
                    // user doesn't have permission
                    this.requestPermissionFirebase();
                }
            });
    }

    requestPermissionFirebase = () => {
        firebase.messaging().requestPermission()
            .then(() => {
                // User has authorised
                this.getToken().then((res) => {}).catch((err) => console.log(err));
                this.onListenerNotification();
                console.log('ok, request ok');
            })
            .catch(error => {
                // User has rejected permissions
                console.log('you have been rejected');
            });
    }

    onListenerNotification = () => {
        console.log('listen notification')
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            console.log(notification, 'received notification');
            this.onDisplayNotification(notification);
        });

        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            console.log(notification, 'display notification');
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });

        this.openNotification = firebase.notifications().onNotificationOpened((notificationOpen) => {
            console.log(notificationOpen, 'open notification');
        });
    }

    async getToken() {
        try {
            let fcmToken = await AsyncStorage.getItem(AsyncStorageName.FCM_TOKEN);
            console.log(fcmToken, 'fcmToken');
            if (!fcmToken) {
                fcmToken = await firebase.messaging().getToken();
                if (fcmToken) {
                    console.log(fcmToken, 'fcmToken');
                    // user has a device token
                    AsyncStorage.setItem(AsyncStorageName.FCM_TOKEN, fcmToken);
                }
            }
        } catch (error) {
            console.log(error, 'cannot get fcmtoken');
        }
    }

    onDisplayNotification = (received_notification) => {
        this.onCreateChannel();

        const notification = new firebase.notifications.Notification(received_notification)
            .setSound('default');

        if (Platform.OS === 'android') {
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
        }

        // Display the notification
        firebase.notifications().displayNotification(notification);
    }

    onCreateChannel = () => {
        if (Platform.OS === 'android') {
            // Build a channel
            const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');

            // Create the channel
            firebase.notifications().android.createChannel(channel);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <MainNavigation/>
            </Provider>
        );
    }
}

export default App;
