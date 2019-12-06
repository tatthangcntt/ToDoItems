import React, { Component,useState }from 'react'
import PropTypes from 'prop-types';
import {
    View,TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { verticalScale } from '../utils/Scale';
import reactotron from 'reactotron-react-native';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
var moment = require('moment');

const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const WINDOW_HEIGHT_NO_STATUS_BAR = DEVICE_WIDTH - STATUS_BAR_HEIGHT
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownAlert from 'react-native-dropdownalert';
 // id: 19,
    //     title: 'task2',
    //     content: 'Đã làm việc chăm chỉ rồi',
    //     priority: { level: 3, name: 'hight' },
    //     date_done_task: '10/11/2019',
    //     time_done_task: '19:00',
export default class DetailTask extends Component {

    static propTypes = {
      data: PropTypes.object,
       
    }

    static defaultProps = {
      data:{}
    }

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            priorityChoose:3,
            selected:moment().format('YYYY-MM-DD'),
            isDatePickerVisible: false,
            time:'',
            title:'',
            isEdit:false,
        }
    }
  
    showDatePicker(){
      // reactotron.log({showDatePicker:'showDatePicker'});
      this.setState({isDatePickerVisible:true})
    };

    hideDatePicker(){
      this.setState({isDatePickerVisible:false})
    };

    handleConfirm=(date)=>{
      // reactotron.log({date:moment(date).format('HH:mm')});
      this.setState({time:moment(date).format('HH:mm'), isDatePickerVisible:false})
      // this.hideDatePicker();
    };
    componentWillMount() {
      // reactotron.log({DetailTaskcomponentWillMount:this.props.data})
    }
    onDayPress=(day)=>{
      this.setState({
        selected: day.dateString
      });
    }
    onPressAddItem(){
      if(!this.state.title){
        this.dropdown.alertWithType('error', 'Alert', 'please, input title to add new task');
        return;
      } 
      if(!this.state.time){
        this.dropdown.alertWithType('error', 'Alert', 'please, input time to add new task');
        return;
      }
     
      var obj = {
        id: this.state.isEdit?this.state.data.id:parseInt(this.props.lengthValue) + 1,
        title:this.state.title,
        content:'',
        priority: this.getPriority(this.state.priorityChoose),
        date_done_task: this.state.selected,
        time_done_task:this.state.time,
      }
      // reactotron.log({DetailTaskcomponentWillMount:this.props.data})
      // this.dropdown.alertWithType('success', 'Alert', 'add new task success');
      // this.props.refTask.close();
      if(this.state.isEdit){

      }else {
        this.setState({priorityChoose:3,
          selected:moment().format('YYYY-MM-DD'),
          //isDatePickerVisible: false,
          time:'',
          title:'',})
      }
      this.props.actionTaskDone(obj, this.state.isEdit)
    }

    onClose() {
      reactotron.log({DetailTask:'onClose'})

    }
    componentWillReceiveProps(nextProps){
      if(nextProps.isEdit){
        reactotron.log({DetailTaskDatat:'edit', data:nextProps.data})
        if(nextProps.data != this.props.data){
          var data = nextProps.data;
          if(data){
            this.setState({
              data: data,
              priorityChoose:data.priority.level,
              selected:moment(data.date_done_task,'YYYY-MM-DD').format('YYYY-MM-DD'),
              time:moment(data.time_done_task,'HH:mm').format('HH:mm'),
              title:data.title,
              isEdit:true})
            }
        }
        // this.setState
      }else{
        reactotron.log({DetailTaskDatat:'new'})
        this.setState({priorityChoose:3,
          selected:moment().format('YYYY-MM-DD'),
          time:'',
          title:'',
          isEdit:false})
      }
      // 
    }
    onOpen() {
      var data = this.props;
      reactotron.log({DetailTask:'onOpen',data:data})
      // if(data){
      //   this.setState({priorityChoose:data.priority.level,
      //     selected:moment(`$`).format('DD-MM-YYYY'),
      //     isDatePickerVisible: false,
      //     time:'',
      //     title:'',})
      // }
    }
  
    onClosingState(state) {
      // reactotron.log({DetailTask:`onClosingState ${this.props.data}`})
    }
    getPriority(level){
      if(level == 1){
        return {level:1, name:'Low', color:'gray'}
      }else if(level == 2){
        return {level:2, name:'Melium', color:'blue'}
      }else{
        return {level:3, name:'Hight', color:'red'}
      }
    }
    renderViewPriority(){
      return(<View style={[styles.styleViewRow,{marginLeft:verticalScale(5)}]}>
      <TouchableOpacity onPress={()=>{this.setState({priorityChoose:3})}}
        style={[styles.priority,
        {backgroundColor:this.state.priorityChoose == 3?'red':'white',
          borderColor:this.state.priorityChoose == 3?'red':'grey',}]}>
        <Text style={{color:this.state.priorityChoose == 3?'white':'black'}}>{'Hight'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.setState({priorityChoose:2})}}
        style={[styles.priority,
        {backgroundColor:this.state.priorityChoose == 2?'blue':'white',
          borderColor:this.state.priorityChoose == 2?'blue':'grey',}]}>
        <Text style={{color:this.state.priorityChoose == 2?'white':'black'}}>{'Medium'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.setState({priorityChoose:1})}}
        style={[styles.priority,
        {backgroundColor:this.state.priorityChoose == 1?'gray':'white',
          borderColor:this.state.priorityChoose == 1?'gray':'grey',}]}>
        <Text style={{color:this.state.priorityChoose == 1?'white':'black'}}>{'Low'}</Text>
      </TouchableOpacity>
    </View>)
    }

    renderSchedule(){
      return (
        <View>
          <View style={styles.styleViewRow}>
            <Text style={styles.sTitle}>{'Schedule'}</Text>
            <TouchableOpacity onPress={()=>this.showDatePicker()}
              style={[styles.priority,
              {borderColor:'#ff6600'}]}>
              {this.state.time?<View style={styles.styleViewRow}>
                <Image source={require('../resources/image/icon_edit.png')}
                style={styles.sIcon}></Image>
                <Text style={{color:'#ff6600'}}>{this.state.time}</Text>
                </View>:<Text style={{color:'#ff6600'}}>{'add time'}</Text>
              }
              
            </TouchableOpacity>
          </View>
          <View>
          <Calendar
              onDayPress={this.onDayPress}
              style={styles.calendar}
              minDate={moment().format('YYYY-MM-DD')}
              hideExtraDays
              markedDates={{[this.state.selected]: {selected: true, color: '#ff6600', disableTouchEvent: true, selectedDotColor: '#ff6600'}}}
            />
          </View>
        </View>
      )
    }
    renderAlert(){
      return(
        <View>
           <DropdownAlert
                    // updateStatusBar={false} 
                    // wrapperStyle={{position: 'absolute', top:0, left:0}}
                    // infoImageSrc={require('../resources/image/icon_logo.jpg')} 
                    messageNumOfLines={120} closeInterval={4000} zIndex={100000} ref={ref => this.dropdown = ref} /> 
        </View>
      )
    }
    render() {
     const { data } = this.state;
        return (
          <Modal  {... this.props}
          ref={this.props.refTask}
          swipeArea={50}
          keyboardTopOffset={50}
          swipeToClose={true}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          style={[styles.modal, styles.modal4]}
          entry={'bottom'}
          backdropContent={this.renderAlert()}
          position={"bottom"}>
             
          <View style={styles.topView}></View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            
              <TextInput 
              placeholder={`Task name`}
              style={[styles.title]}
              value={this.state.title}
              onChangeText={(text)=>{
                this.setState({title:text.trim()})
              }}
              />
              <Text style={styles.sTitle}>{'Priority'}</Text>
              {this.renderViewPriority()}
              {this.renderSchedule()}
          </ScrollView>
          <SafeAreaView>
          <TouchableOpacity onPress={()=>{this.onPressAddItem()}}
          style={styles.button}>
                <Text style={[{color:'white', fontSize:verticalScale(14), fontWeight:'bold'}]}>{this.state.isEdit?'Update task':'Add task'}</Text>
          </TouchableOpacity>
          </SafeAreaView>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="time"
            is24Hour={true}
            onConfirm={this.handleConfirm}
            onCancel={()=>this.setState({isDatePickerVisible:false})}
          />
          </Modal>
          
        )
    }
}

const styles = StyleSheet.create({
  button:{
    width: verticalScale(100),
    // minHeight:verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#142038',
    marginVertical:verticalScale(10),
    paddingVertical: verticalScale(5),
    borderRadius:verticalScale(5),
  },
  calendar: {
    // borderTopWidth: 1,
    paddingTop: 5,
    // borderBottomWidth: 1,
    // borderColor: '#eee',
    height: verticalScale(300)
  },
    priority:{
      paddingHorizontal:verticalScale(10),
      paddingVertical:verticalScale(5),
      borderRadius: verticalScale(5),
      marginRight: verticalScale(10),
      borderWidth:0.5,
      marginVertical:verticalScale(5),
    },
    text:{
      color:'black',
    },
    scroll:{
      width: DEVICE_WIDTH,
      paddingHorizontal:verticalScale(5)
    },
    title:{
      marginTop:verticalScale(5),
      alignSelf: 'stretch',
      minHeight: verticalScale(35),
      paddingHorizontal: verticalScale(5),
      // borderBottomColor: 'grey',
      // borderBottomWidth:0.5,
    },
    topView:{
      width: verticalScale(50),
      height:verticalScale(5),
      borderRadius: verticalScale(10),
      backgroundColor:'darkgrey',
      marginVertical:verticalScale(5),
    },
    modal: {
        height: DEVICE_HEIGHT*2/3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: verticalScale(10),
        borderTopLeftRadius: verticalScale(10),
      },
    sIcon:{
      marginRight: verticalScale(5),
      width: verticalScale(10),
      height: verticalScale(10),
      resizeMode:'contain',
      tintColor:'darkgrey'
    },
    sTitle:{
      // color: "blue",
      marginLeft: verticalScale(5),
      // fontSize: verticalScale(14),
      fontWeight: "bold",
      textAlign: 'left',
      flex:1,
    },
    styleViewRow:{
      alignSelf:'stretch',
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    styleItem: {
      //  backgroundColor:'blue',
      borderColor: 'grey',
      borderBottomWidth:0.5,
        // borderWidth:0.5,
       alignItems: 'center',
       borderRadius:verticalScale(5),
       alignSelf: 'stretch',
      //  minHeight:verticalScale(40),
       padding: verticalScale(5),
       paddingVertical: verticalScale(10),
      //  marginVertical: verticalScale(3),
       marginHorizontal:verticalScale(10)
    },
})
