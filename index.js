import React, { Component } from "react";

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import {I18nManager,Linking} from 'react-native';
I18nManager.allowRTL(false);
registerScreens(); // this is where you register all of your app's screens

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'com.koalasolution.fund.FirstTabScreen', // unique ID registered with Navigation.registerScreen
//          // title of the screen as appears in the nav bar (optional)
//         navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//         navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
//     }
// });
// start the app

Navigation.startSingleScreenApp({
    screen: {
        screen: 'FirstTabScreen', // unique ID registered with Navigation.registerScreen
         // override the navigator style for the screen, see "Styling the navigator" below (optional)
    },
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
// Navigation.startTabBasedApp({
//     tabs: [
//         {
//             label: 'One',
//             screen: 'com.koalasolution.fund.FirstTabScreen', // this is a registered name for a screen
//             title: 'Screen One'
//         }
//     ]
// });


