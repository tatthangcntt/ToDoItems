import React, { Component } from 'react'
import {
    Alert,
} from "react-native";
import {
    AsyncStorage
} from 'react-native'
// import I18n from 'react-native-i18n';

export default class TienIch {

    static removeItem(listData, itemRemove)
    {
        return listData.filter(item => item != itemRemove)
    }
    static removeItemId(listData,label,value)
    {
        var  index  = listData.findIndex(item=>item[label]==parseInt(value));
        var newarray  = [...listData];
        if(index != -1)
        {
            newarray.splice(index, 1)
        }
        return newarray;
    }
    static addTopItem(listData, itemAdd)
    {
        return [itemAdd,...listData]
    }
    static addBottomItem(listData, itemAdd)
    {
        return [...listData,itemAdd]
    }
    static updateItem(listData, oldItem, newItem)
    {
        var  index  = listData.indexOf(oldItem)
        var newarray  = [...listData];
        if(index != -1)
        {
         newarray[index] = newItem
        }
        return newarray;
    }
    static updateItemId(listData,label,value, newItem) //
    {
        var  index  = listData.findIndex(item=>item[label]==value)
        var newarray  = [...listData];
        if(index != -1)
        {
            newarray[index] = newItem
        }
        return newarray;
    }
    static GetLocation(lat1, lng1, lat2, lng2) {
        var dLng = (lng2 - lng1), dLat = (lat2 - lat1);
        var R = 6371;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) *
            Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;

        var distance = d * Math.PI / 180;

        return parseFloat(distance).toFixed(1);
    }

    static replaceText(text) {
        var textReplace = text.replace(/(?:\\[rnt]|[\r\n\t]+)+/g, " ");
        return textReplace;
    }

    static format_number(number, prefix, thousand_separator, decimal_separator) {
        var number = "" + number;
        var thousand_separator = thousand_separator || '.',
            decimal_separator = decimal_separator || ',',
            regex = new RegExp('[^' + decimal_separator + '\\d]', 'g'),
            number_string = number.replace(regex, '').toString(),
            split = number_string.split(decimal_separator),
            rest = split[0].length % 3,
            result = split[0].substr(0, rest),
            thousands = split[0].substr(rest).match(/\d{3}/g);

        if (thousands) {
            separator = rest ? thousand_separator : '';
            result += separator + thousands.join(thousand_separator);
        }
        result = split[1] != undefined ? result + decimal_separator + split[1] : result;
        return prefix == undefined ? result : (result ? result + prefix : '');
    };
    static un_format_number(number) {
        var result = number.split('.').join("").split(',').join("");
        return result;
    };
   
    static displayCalendar(){
        var dateNow = new Date();
        var month = dateNow.getMonth();
        var result = [];
        result = TienIch.formatDayWeek(month,result);
        result = TienIch.formatDayWeek(month + 1,result);
        result = TienIch.formatDayWeek(month + 2,result);
        result = TienIch.formatDayWeek(month + 3,result);
        result = TienIch.formatDayWeek(month + 4,result);
        result = TienIch.formatDayWeek(month + 5,result);
        return result;
    }
    
}
