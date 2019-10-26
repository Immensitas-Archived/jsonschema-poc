
import React, { Component, PureComponent } from "react";
import {Input, Button, Icon, Modal} from 'antd';
import "antd/dist/antd.css";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
class CodeArea extends React.Component {
  state = { 
      visible: false,
      codeAreaValue: '',
      codeMirrorValue: ''
  };

  showModal = () => {
    console.log("show modal");
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      codeAreaValue: this.state.codeMirrorValue
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  setCodeMirrorValue = (value) => {
      this.setState({
         codeMirrorValue: value
      })
  }
  render() {
    return (
        <div className="codearea_wrapper">
           <Input placeholder="Enter your html here" value={this.state.codeAreaValue}/>
           <Icon type="fullscreen" className="fullscreen" onClick={this.showModal}/>
           <Modal
            title="Enter Code"
            visible={this.state.visible}
            mask={true}
            maskClosable = {false}
            onOk={this.handleOk}
            okText="Save"
            onCancel={this.handleCancel}
            footer={[
                <Button key="submit" type="primary" onClick={this.handleOk}>
                    SAVE
                </Button>,
            ]}
            >
            <CodeMirror
                value=''
                options={{
                    mode: 'html',
                    theme: 'material',
                    lineNumbers: false
                }}
                onChange={(editor, data, value) => {
                    this.setCodeMirrorValue(value);
                }}
            />
           </Modal>
        </div>
    );
  }
}
export default CodeArea;