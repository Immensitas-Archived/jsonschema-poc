import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "react-jsonschema-form";
//import JSONSchemaForm from "react-jsonschema-form";
import fields from "react-jsonschema-form-extras";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-4-theme/dist/bootstrap-theme.min.css";
import {processForm,transformErrors} from "./FormProcess";
const originalSchema = {
    "type": "object",
    "properties":{
      "general":{
         "name":{
            "title": "Name",
            "type": "string",
            "minLength": 6,
            "maxLength": 25
          },
         "chooseTemplate":{
            "title": "Choose Template",
            "type": "string",
            "enum":[
              "Code your own"
            ],
            "$defaultValue": "Code your own"
         },
         "label":{
           "type":"string",
           "title": "Label Settings"
         }
      },
      "template":{
         "codeArea":{
           "type": "string",
           "title": "Code Area"
         }
      },
      "additional":{

      },
      "schedule":{

      }
    }
};
const originalUISchema = {

};

const originalFormData = {};

// Process the initial state for the form.
// Without this step, all fields would be shown initially.
const initialState = processForm(originalSchema, originalUISchema, originalSchema, originalUISchema, originalFormData);
//const Form = JSONSchemaForm.default;
class App extends React.Component {
  constructor (props) {
      super(props);
      this.state = initialState;
  }

  // handleChange (data) {
  //     const schema = { ...this.state.schema };
  //     const uiSchema = { ...this.state.uiSchema };
  //     const { formData } = data;

  //     const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);

  //     this.setState(newState);
  // }
  render(){
    return (<div style={{ width: "40%"}}><Form
      schema={this.state.schema}
      fields={fields} 
      uiSchema={this.state.uiSchema}
      formData={this.state.formData}
      //onChange={this.handleChange.bind(this)}
    /></div>);
  }
    
}
export default App