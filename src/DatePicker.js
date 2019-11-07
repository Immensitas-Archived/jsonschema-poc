import React, { Component, PureComponent } from "react";
import { Mentions } from 'antd';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';

class DatePickerComponent extends React.Component{
    render(){
        return(
            <div>
                <DatePicker onChange={onChange} />
            </div>
        );
    }
}
export default DatePickerComponent;
function onChange(date,dateString){
    console.log(date);
    console.log(dateString);
}