import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { verticalScale } from '../utils/Scale';
import reactotron from 'reactotron-react-native';
import moment from 'moment';


const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const WINDOW_HEIGHT_NO_STATUS_BAR = DEVICE_WIDTH - STATUS_BAR_HEIGHT

export default class ItemTask extends Component {

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
            isPassed: false,
        }
    }
    componentWillMount() {
      // reactotron.log({data:this.state.data})
      this.checkToCountdown(this.state.data)
    }
    checkToCountdown(data){
      if(data && this.compareTime(data) > 0){
        this.setState({isPassed:true})
      }else {
        this.setState({isPassed:false})
        if(this.interval){
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          if(this.compareTime(data) > 0){
            this.setState({isPassed:true})
            clearInterval(this.interval);
          }
        }, 1000);
      }
    }
    compareTime(data){
      const currentTime = moment();
      const deadLine = moment(`${data.date_done_task} ${data.time_done_task}`,"YYYY-MM-DD HH:mm");
      // reactotron.log({compareTime:currentTime.diff(deadLine, 'minutes'), currentTime, deadLine})
      return currentTime.diff(deadLine, 'minutes');
    }
    componentWillUnmount(){
      // reactotron.log("componentWillUnmount")
      clearInterval(this.interval)
  
  }
    componentWillReceiveProps(nextProps) {
      if(nextProps.data != this.props.data){
        this.checkToCountdown(nextProps.data)
        this.setState({data:nextProps.data});
      }
    }
    
    renderColor(item){
      if(item.priority){
        return item.priority.level == 3?'red':(item.priority.level == 2?'blue':'gray')
      }else {
        return 'grey'
      }
    }
    renderColorPassed(item){
      // var currentTime = moment();

    }
  //  icon_priority
    render() {
     const { data } = this.state;
        return (
            <TouchableOpacity
              onPress={()=>{this.props.onPressEdit(data)}}
             style={styles.styleItem}>
              <View style={styles.styleViewTitle}>
                <Image 
                source={require('../resources/image/icon_priority.png')}
                style={[styles.sIcon,{tintColor:this.renderColor(data)}]}></Image>
                <Text allowFontScaling={false}  numberOfLines={1} ellipsizeMode={'tail'} style={styles.sTitle}>{data.title}</Text>
              </View>
              <View style={[styles.styleViewTitle,{marginLeft: verticalScale(20),marginTop: verticalScale(5)}]}>
                <Image 
                source={require('../resources/image/icon_calendar.png')}
                style={[styles.iconSmall,{tintColor:this.state.isPassed?'darkgray':'orange'}]}></Image>
                <Text allowFontScaling={false}  numberOfLines={1} ellipsizeMode={'tail'} 
                style={[styles.sTitle,{fontSize:verticalScale(12),color: this.state.isPassed?'darkgray':'orange'}]}>
                  { data.date_done_task + `  `+ data.time_done_task +` `} {this.state.isPassed?'Passed':'Near'}
                </Text>
                
                <TouchableOpacity onPress={()=>{this.props.onRemoveItem(data)}}>
                  <Image 
                  source={require('../resources/image/icon_trash.png')}
                  style={[styles.sIcon,{tintColor:'darkgray', marginRight:verticalScale(0)}]}></Image>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    iconSmall:{
      marginRight: verticalScale(5),
      width: verticalScale(10),
      height: verticalScale(10),
      resizeMode:'contain',
    },
    sIcon:{
      marginRight: verticalScale(5),
      width: verticalScale(16),
      height: verticalScale(16),
      resizeMode:'contain',
    },
    sTitle:{
      // color: "blue",
      fontSize: verticalScale(14),
      // fontWeight: "bold",
      textAlign: 'left',
      flex:1,
    },
    styleViewTitle:{
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
