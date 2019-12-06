import React from 'react';
import { Dimensions, Animated,
    Easing} from "react-native";
import WellComeScreen from "./WellComeScreen";

const DEVICE_WIDTH = Dimensions.get('window').width;

import { TabNavigator, TabBarBottom,
     createDrawerNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
let drawerLockMode = 'unlocked';

 export const WellComeRoot = createStackNavigator(
    {
        WellCome: {
            screen: WellComeScreen,
        },
  
    }, {
        initialRouteName: 'WellCome',
        headerMode: 'none',
        //  header: null,
         navigationOptions: {
            header:null,
        },
    });

 