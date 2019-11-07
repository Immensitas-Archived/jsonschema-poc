import React, { Component, PureComponent } from "react";
import { Mentions } from 'antd';
import "antd/dist/antd.css";
import { TimePicker } from 'antd';
import moment from 'moment';
const format = 'HH:mm';
var time = moment();
time = time.add(moment.duration(1, 'hours'))
class TimePickerComponent extends React.Component{
    render(){
        return(
            <div>
                <TimePicker defaultValue={time} format={format} />
            </div>
        );
    }
}
export default TimePickerComponent;