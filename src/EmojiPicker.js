import React, { Component, PureComponent } from "react";
// import 'emoji-mart/css/emoji-mart.css';
// import data from 'emoji-mart/data/all.json';
// import { Picker, Emoji } from 'emoji-mart';
import Emojis from 'react-emoji-component'
import {Input, Button} from 'antd';
import "antd/dist/antd.css";
class EmojiPicker extends React.Component {
    state = { 
        text: '',
        showEmojiPicker: false,
    };
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    addEmoji = (e) => {
            let emoji = e.native;
            this.setState({
                text: this.state.text + emoji
            });
    }
  render(){
    return (
        <div className="emoji_wrapper">
         <Emojis size={24}>
            You 👏🏻 should 👏🏻 be 👏🏻 using 👏🏻 <code>react-emoji-component</code>
         </Emojis>
        </div>
    );
  }
}
export default EmojiPicker;