import React from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
import fields from "react-jsonschema-form-extras";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-4-theme/dist/bootstrap-theme.min.css";
import { glyphicon} from 'react-bootstrap';
import Mentio from "./mentio";
import CodeArea from "./CodeArea";
import DatePickerComponent from "./DatePicker";
import TimePickerComponent from "./TimePicker";

class App extends React.Component {
   constructor() {
      super();
      this.schema =  {
        "type": "object",
        "properties":{
            "general":{
              "type": "object",
              "title": "1. General Settings",
              "properties":{
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
                    "default": "Code your own",
                    "readOnly":true
                },
                "label":{
                  "type":"string",
                  "title": "Label Settings",
                  "enum":[
                      "Credit Card",
                      "Personal Loan",
                      "Auto Loan"
                  ]
                }
              },
              "required":["name","label"]
            },
            "template":{
              "type": "object",
              "title": "2. Template Settings",
              "properties":{
                "codeArea":{
                  "type": "string",
                  "title": "Code Area"
                }
              },
              "required":["codeArea"]
            },
            "additional":{
              "type": "object",
              "title": "3. Additional Settings",
              "properties":{
                "from":{
                  "type":"string",
                  "title": "From",
                  "enum": [
                    "test@lemnisk.co"
                  ]
                },
                "replyTo":{
                  "type":"string",
                  "title": "Reply To",
                  "enum": [
                    "test@lemnisk.co"
                  ]
                },
                "previewText":{
                  "type":"string",
                  "title": "Preview Text"
                },
                "subject":{
                  "type":"string",
                  "title": "Subject"
                }
              }
            },
            "schedule":{
              "type": "object",
              "title": "4. Schedule Settings",
              "properties":{
                "scheduleJson":{
                  "type":"string",
                  "title": "Schedule",
                  "enum": [
                    "Later",
                    "Trigger"
                  ],
                  "default": "Later"
                },
                "date":{
                  "type":"string",
                  "title": "Send Date"
                },
                "time":{
                  "type":"string",
                  "title": "Time"
                }
              }
            }
        }
      };
      this.uiSchema = {
        "general": {
          "ui:field": "collapsible",
           "collapse": {
            "collapsed": false,
            "icon": {
              "enabled": "plus",
              "disabled": "minus"
            },
            "field": "ObjectField"
          }
        },
        "template":{
          "ui:field": "collapsible",
          "collapse": {
            "field": "ObjectField"
          },
          "codeArea":{
            "ui:widget": CodeArea
          }
        },
        "additional":{
          "ui:field": "collapsible",
          "collapse": {
            "field": "ObjectField"
          },
          "subject":{
            "ui:widget": "textarea",
            "ui:options": {
              "rows": 3
            }
          }
        },
        "schedule": {
          "ui:field": "collapsible",
          "collapse": {
            "field": "ObjectField"
          },
          "date":{
            "ui:widget": DatePickerComponent
          },
          "time":{
            "ui:widget": TimePickerComponent
          }
        }
      };
      this.transformErrors = function (errors) {
            return errors.map(error => {
                if (error.name === "pattern") {
                    error.message = "Only digits are allowed"
                }else if(error.property['lp'])(
                    error.message = "Please enter valid url"
                )
                return error;
            });
        }
   }
    render(){
      return (<div class="schemaContainer"style={{ width: "30%"}}>
        <Form schema={this.schema} 
              uiSchema={this.uiSchema} 
              fields={fields} 
              liveValidate={true} 
              transformErrors={this.transformErrors} 
              showErrorList={false}/>
      </div>);
  };
}
export default App