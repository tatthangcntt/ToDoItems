import { AppRegistry,StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import React, { Component } from 'react';
import {
    Text, View, SafeAreaView, Alert, NetInfo, Dimensions,
    BackHandler, AsyncStorage, StatusBar
} from 'react-native';
import * as AppReducer from './src/reducers';
import { WellComeRoot } from './src/screens/NavManageScreen';
// import * as firebase from 'react-native-firebase';
// import AppWithNavigationState from './src/utils/AppNavigator';
//import { middleware } from './src/utils/redux';
import { NavigationActions,createAppContainer } from "react-navigation";
const AppContainer = createAppContainer(WellComeRoot);

import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import {I18n} from './src/language/i18n'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
// redux related book keeping
const logger = createLogger();
const reducer = combineReducers(AppReducer);
const store = createStore(reducer,
    applyMiddleware(thunk, logger),
);
import DropdownAlert from 'react-native-dropdownalert';
import Reactotron from 'reactotron-react-native';
// import { Base } from './src/screens/BaseScreen';
import { MenuProvider } from 'react-native-popup-menu';
import AlertCustom from './src/utils/AlertCustom';
const TIME_DELAY_TO_NAVIGATION = 3000;
class App extends Component {
    //static NOTIFICATION = undefined
    constructor(props) {
        super(props)
       
        console.disableYellowBox = true;
    }

    async componentWillMount() {
      // const language = await Base.BoNhoRieng.layDuLieu('LANGUAGE', 'ja');
      // Base.LANGUAGE = language;
      I18n.locale = 'vi';
      Reactotron.log({language:language})
    }
    componentDidMount() {
        Reactotron.log("componentDidMount")
        // this.checkPermission();
        // this.createNotificationListeners();
        AlertCustom.TopAlert = this.dropdown;

        // const notification = new firebase.notifications.Notification().ios.setBadge(0);
        // firebase.notifications().displayNotification(notification);
        
    };
    componentWillUnmount = () => {

        this.notificationOpenedListener();
    };

    shownotifi = (smg) => {
    }
    render() {
        return (
            <Provider store={store}>
               <MenuProvider customStyles={menuProviderStyles}>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <DropdownAlert 
                    // updateStatusBar={false} 
                    infoImageSrc={require('./src/resources/image/icon_logo.jpg')} 
                    messageNumOfLines={120} closeInterval={4000} zIndex={100000} ref={ref => this.dropdown = ref} />   
                    <AppContainer ref={nav => { this.navigator = nav; }} />
                </View>
                </MenuProvider>
            </Provider>
        );
    }
    moveScreen(data){
      Base.Reactotron.log({dataNotification:data});
      switch (data.type) {
        case 'ADMIN_CANCEL_CERTIFICATION':
          this.navigator.dispatch(NavigationActions.navigate({routeName:Base.SCREEN.IDCertificateScreen,params:{}}))
          break;
        case 'ADMIN_CANCEL_TOUR':
          this.navigator.dispatch(NavigationActions.navigate({routeName:"NotificationManageToursScreen",params:{}}))
          break;
        case 'USER_ORDER':
          this.navigator.dispatch(NavigationActions.navigate({routeName:"NotificationNeedConfirm",params:{}}))
          break;
          case 'GUIDE_ADD_FEEDBACK':
            this.navigator.dispatch(NavigationActions.navigate({routeName:"NotificationGuideFeedback",params:{}}))
            // this.props.navigation.navigate("NotificationGuideFeedback");
          break;
        case 'USER_ADD_FEEDBACK':
            this.navigator.dispatch(NavigationActions.navigate({routeName:"NotificationUserFeedback",params:{}}))
            // this.props.navigation.navigate("NotificationUserFeedback");
          break;
        default:
            this.alertNotification(data.title, data.body);
          break;
      }
    }
    createNotificationListeners = async () => {
        var title = "";
        var body = "";
        // Trường hợp đang mở app
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // const { title, body } = notification;
            Reactotron.log({ 'notification open AppJS': notification });
            this.dropdown.alertWithType(
                'info',
                notification._data.title,
                notification._data.body
            );
        });
        // Trường hợp ấn home(app vẫn đang chạy)
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const notification = notificationOpen.notification;
            Reactotron.log({ 'notification home': notification });
            this.moveScreen(notification._data)
           
        });
        // Trường hợp đã kill app
        firebase.notifications().getInitialNotification()
            .then((notificationOpen) => {
                Reactotron.log({ 'notification close': notificationOpen });
                if (notificationOpen) {
                    const notification = notificationOpen.notification;
                      setTimeout(() => {
                        this.moveScreen(notification._data)
                      }, TIME_DELAY_TO_NAVIGATION);
                 
                }
            });
    }

    alertNotification(title, body) {
        Reactotron.log({ TITLE: title });
        if (title != "") {
            setTimeout(() => {
                Alert.alert(
                    title,
                    body,
                    [
                        { text: I18n.t('dong'), onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            }, 500);
        }
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        Reactotron.log({ checkPermission: enabled })
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                Reactotron.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
                firebase.messaging().subscribeToTopic("travel-all-devices");
            }
        }
        Base.TOKEN_NOTIFI = fcmToken;
        Reactotron.log('fcmToken:', fcmToken);
        console.log("token::", fcmToken);
        //alert(Base.TOKEN_NOTIFI)
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            Reactotron.log('permission rejected');
        }
    }

}


// function mapDispatchToProps(dispatch) {
//     return {
//         fetchData: () => dispatch(fetchData())
//     }
// }

// export default connect(mapStateToProps,
//     mapDispatchToProps)(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const menuProviderStyles = {
  menuProviderWrapper: styles.container,
  backdrop: styles.backdrop,
};