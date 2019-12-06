'use strict';

import React, { Component,useState,useEffect } from 'react';
import {View, Text,StyleSheet, StatusBar, Image,Dimensions,TouchableOpacity,SafeAreaView, TextInput,ScrollView } from "react-native";
// import SplashScreen from 'react-native-splash-screen';
import { scale, moderateScale, verticalScale } from "../utils/Scale";
import LinearGradient from 'react-native-linear-gradient';
import BoNhoRieng from '../utils/BoNhoRieng';
// import { ScrollView } from 'react-native-gesture-handler';
import ItemTask from '../component/ItemTask';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import DetailTask from '../component/DetailTask';
import reactotron from 'reactotron-react-native';
import AlertCustom from '../utils/AlertCustom';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
import TienIch from '../utils/TienIch';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
   const  KEY_SAVE_LIST_ITEM = 'KEY_SAVE_LIST_ITEM';
  const { Popover } = renderers
  const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
  const DEVICE_WIDTH = Dimensions.get('window').width
  const DEVICE_HEIGHT = Dimensions.get('window').height
class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: "en",
            filterId:3,
            listItems: [],
            openMenu:false,
            dataEdit:undefined,
            isEdit:false
        };
        
    }

   
    async onSignIn() {
        
        // const ref = database().ref(`/users/ThangntDB`);
        // ref(`/users/ThangntDB`).on('value', onRoleChange);
        // reactotron.log( {userData:ref});
        // ref.once('value', onSnapshot);
        // const snapshot = await database().ref('/');
        // reactotron.log({exist:snapshot.exists()});
       
        // Fetch the data snapshot
        // const snapshot = await ref.once('value');
        // reactotron.log( {userData:snapshot.val()});
      }
    async getData(){
        try {
            const datas = await BoNhoRieng.layDuLieu(KEY_SAVE_LIST_ITEM,undefined);
            if(datas){
                this.setState({listItems: JSON.parse(datas)});
            }
        } catch (error) {
            this.setState({listItems: []});
        }
      
    }
    componentWillMount = () => {
        reactotron.log( {componentWillMount:'signin'});
        this.getData();
        // this.state.listItems = this.state.listItems.sort((a, b)=>{
        //     return (b.priority.level - a.priority.level);
        // });
    };
    onPressRemoveTask(item){
        AlertCustom.AlertOptionConfirm('Alert', 'Are you sure?','cancle','ok',()=>{},()=>{
            this.state.listItems = this.state.listItems.filter(i => i !== item)
            this.setState({listItems:this.state.listItems});
            this.saveData();
        })
    }
    renderItemTask=(item, index) =>{
        return (
            <ItemTask data={item}
            onPressEdit={()=>{this.onPressEdit(item)}}
            onRemoveItem={(data)=>{this.onPressRemoveTask(item)}}
            />
        )
    }
    onPressEdit(item){
        this.detailTask.open();
        this.setState({dataEdit:item, isEdit:true});
    }
    addNewTask(item){
        this.detailTask.close();
        this.state.listItems.push(item);
        reactotron.log({item:item,listItems:this.state.listItems})
        if(this.state.filterId == 3)
        {
            this.state.listItems = this.state.listItems.sort((a, b)=>{
                return b.priority.level - a.priority.level;
              });
        }else {
            this.state.listItems = this.state.listItems.sort((a, b)=>{
                return (a.priority.level - b.priority.level);
              });
        }
        reactotron.log({listItems:this.state.listItems})
        this.setState({listItems:this.state.listItems})
        this.saveData()
    }
    updateTask(item){
        this.detailTask.close();
        this.state.listItems = this.state.listItems.map(obj =>{
            if(obj.id == item.id)
            {
                return item;
            }else{
                return obj;
            }
        })
        reactotron.log({listItems:this.state.listItems})
        this.setState({listItems:this.state.listItems})
        this.saveData()
    }
    onPressFilterHight(){
        this.state.listItems = this.state.listItems.sort((a, b)=>{
            return (b.priority.level - a.priority.level);
          });
        this.setState({filterId:3,listItems:this.state.listItems, openMenu:false})
    }
    // onPressFilterMedium(){

    // }
    onPressFilterLow(){
        this.state.listItems = this.state.listItems.sort((a, b)=>{
            return (a.priority.level - b.priority.level);
          });
        this.setState({filterId:1,listItems:this.state.listItems, openMenu:false})
    }

    saveData(){
        BoNhoRieng.luuDuLieu(KEY_SAVE_LIST_ITEM,JSON.stringify(this.state.listItems)).then().catch(
            (error)=>{ 
                setTimeout(() => {
                    BoNhoRieng.luuDuLieu(KEY_SAVE_LIST_ITEM,JSON.stringify(this.state.listItems))
                }, 200);
            }
        )
    }
    renderMenu(){
        return(
            <MenuOptions optionsContainerStyle={styles.menuOptions}>
            <View style={styles.styleMenu}>
            <TouchableOpacity onPress={()=>{this.onPressFilterHight()}}
            style={styles.row}>
                <Image 
                source={this.state.filterId ==3?require('../resources/image/icon_slection.png'):require('../resources/image/icon_priority.png')}
                style={[styles.sIconMenu]}></Image>
                <Text allowFontScaling={false}  numberOfLines={1} ellipsizeMode={'tail'} style={[styles.sTitle,{ }]}>{'hight to low'}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>{this.onPressFilterMedium()}}
            style={styles.row}>
                <Image 
                source={this.state.filterId ==2?require('../resources/image/icon_slection.png'):require('../resources/image/icon_priority.png')}
                style={[styles.sIconMenu]}></Image>
                <Text allowFontScaling={false}  numberOfLines={1} ellipsizeMode={'tail'}  style={[styles.sTitle,{ }]}>{'Medium'}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{this.onPressFilterLow()}}
            style={[styles.row,{borderBottomWidth:0}]}>
                <Image 
                source={this.state.filterId ==1?require('../resources/image/icon_slection.png'):require('../resources/image/icon_priority.png')}
                style={[styles.sIconMenu]}></Image>
                <Text allowFontScaling={false}  numberOfLines={1} ellipsizeMode={'tail'}  style={[styles.sTitle,{}]}>{'low to hight'}</Text>
            </TouchableOpacity>
            </View>
            </MenuOptions>
        )
    }
    renderHeader(){
        return(
            <SafeAreaView style={styles.styleHeader}>
                <StatusBar backgroundColor={'rgba(255,255,255,0.0)'} translucent={true} />
                <View style={styles.view_flex_row}>
                    <Text allowFontScaling={false} style={styles.titleText}>{'To Do List'}</Text>
                    <Menu opened={this.state.openMenu}
                        onOpen={() => { }}
                        onBackdropPress={() => { this.setState({ openMenu: false }) }}
                        renderer={Popover} rendererProps={{
                            preferredPlacement: 'bottom', placement: 'bottom',
                            anchorStyle: { backgroundColor: '#eaeaea' }
                        }}>
                        <MenuTrigger onPress={() => { this.setState({ openMenu: true }) }}
                            style={{ padding: 5 }} >
                            <Image
                                source={require('../resources/image/icon_sort.png')}
                                style={styles.sIcon}
                            />
                        </MenuTrigger>
                        {this.renderMenu()}
                    </Menu>
                    {/* <TouchableOpacity>
                        <Image source={require('../resources/image/icon_sort.png')}
                            style={styles.sIcon}>
                        </Image>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        )
    }
    render=()=> {
        return (
            <View style={{ flex: 1, backgroundColor:'white'}}>
                {this.renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                    {this.state.listItems.map(this.renderItemTask)}
                    <View style={{height: verticalScale(100)}}></View>
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)"
                onPress={()=>{
                    this.detailTask.open();
                    this.setState({isEdit:false})
                }}
                style={{marginBottom:verticalScale(20)}}    
                ></ActionButton>
                <SafeAreaView/>
                <DetailTask refTask={item => this.detailTask = item}
                    isEdit={this.state.isEdit}
                    data={this.state.dataEdit}
                    lengthValue={this.state.listItems.length}
                    actionTaskDone={(item, isEdit) =>{
                        reactotron.log({item, isEdit})
                        if(isEdit == false ){
                            this.addNewTask(item)
                        }else {
                            this.updateTask(item)
                        }
                    }}
                />
            </View>
        );
    }
  
}
const styles = StyleSheet.create({
    sIconMenu:{
        marginRight: verticalScale(10),
        width: verticalScale(10),
        height: verticalScale(10),
        resizeMode:'contain',
        tintColor: "#142038"
      },
    row:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: verticalScale(5),
        marginHorizontal:verticalScale(5),
        borderBottomWidth:0.5, borderBottomColor:'gray',
    },
    menuOptions: {
        // padding: verticalScale(10),
        width: DEVICE_WIDTH*2/5,
        borderRadius:verticalScale(5),
      },
    styleMenu:{
        // padding:verticalScale(5),
    },
    sIcon:{
      marginRight: verticalScale(0),
      width: verticalScale(20),
      height: verticalScale(20),
      resizeMode:'contain',
      tintColor: "#142038"
    },
    titleText: {
        color: "#142038",
        fontSize: verticalScale(16),
        fontWeight: "bold",
        textAlign: 'center',
        flex:1,
    },
    view_flex_row:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        padding: verticalScale(5),
        // backgroundColor: 'blue',
        minHeight:verticalScale(40),
    },
    contentHeader:{
      
    },
    styleHeader: {
        alignSelf: 'stretch',
        // zIndex: 10, 
        flexDirection: "column",
        paddingTop: Platform.OS == "android" ? verticalScale(20) : 0,
        justifyContent: 'flex-start'
    },
    
    languageText: {
        color: "#a5a8b0",
        fontSize: verticalScale(18),
        marginBottom: verticalScale(20)
    },
    language: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: verticalScale(20)
    },
    flag: {
        borderRadius: verticalScale(5),
        width: verticalScale(60),
        height: verticalScale(30),
        marginRight: verticalScale(15)
    },
    flagText: {
        flex: 1,
        fontSize: verticalScale(18)
    },
    checked: {
        width: verticalScale(30),
        height: verticalScale(20),
        marginRight: verticalScale(30)
    },
    linearGradient: {
        width: Dimensions.get("window").width - verticalScale(60),
        height: verticalScale(50),
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: verticalScale(80)
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
const listItems = [
    // {
    //     id: 1,
    //     title: 'task1',
    //     content: 'Làm việc chăm chỉ đi ',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '2019-12-6',
    //     time_done_task: '19:00',
    // }
    // ,
    // {
    //     id: 2,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 2, name: 'hight' },
    //     date_done_task: '2019-12-6',
    //     time_done_task: '19:00',
    // },
    // {
    //     id: 3,
    //     title: 'task3',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 1, name: 'hight' },
    //     date_done_task: '2019-12-7',
    //     time_done_task: '19:00',
    // }, 
    // {
    //     id: 4,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 5,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 6,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 7,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 8,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 9,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // }, {
    //     id: 10,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 11,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 12,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 13,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 14,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 15,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 16,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },
    // {
    //     id: 17,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 18,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },{
    //     id: 19,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
    // },
]
export default (WelcomeScreen);



