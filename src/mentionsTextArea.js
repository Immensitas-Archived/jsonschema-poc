import React, { Component, PureComponent } from "react";
import { MentionsInput, Mention } from 'react-mentions';
function MentionTextArea(props){
    const {options} = props;
    return(
        <MentionsInput className='textarea' placeholder='Add Message' value="">
            <Mention
                trigger="@"
                data={props.options.userMentionData}
            />
        </MentionsInput>
    );
}
function setState(e){
    console.log(e);
}
export default MentionTextArea;