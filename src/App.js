import React from 'react';
import Form from "react-jsonschema-form";
import CollapsibleFieldTemplate from "./CollapsibleFieldTemplate";
import MentionTextArea from "./mentionsTextArea";
import Accordion from "./accordian";
import Mentio from "./mentio";
import CodeArea from "./CodeArea";
import EmojiPicker from "./EmojiPicker";

const log = (type) => console.log.bind(console, type);
class App extends React.Component {
  constructor() {
    super();
    this.macros = [
      {
        "placeholder": "ANDROID_FCM_ID",
        "alias": "ANDROID_FCM_ID",
        "type": "NbaPlaceHolder"
      },
      {
        "placeholder": "GEOFENCE_ID",
        "alias": "GEOFENCE_ID",
        "type": "NbaPlaceHolder"
      },
      {
        "placeholder": "GEOFENCE_LOCATION",
        "alias": "GEOFENCE_LOCATION",
        "type": "NbaPlaceHolder"
      }
    ];
    this.userMentionData = this.macros.map(placeholders => ({
      id: placeholders.placeholder,
      display: `${placeholders.alias}`
    }));
  
    this.schema = {
      type: "object",
      classNames: "mmmm",
      properties: {
        webPushGeneralSettings: {
          type: "object",
          title: "1. General Settings",
          properties: {
            name: {
              type: "string",
              title: "Name",
              readOnly: true
            },
            title: {
              type: "string",
              title: "Title"
            },
            message: {
              type: "string",
              title: "Message"
            }
          },
          required: ["name", "title"]
        },
        webPushOptionalSettings: {
          type: "object",
          title: "2. Optional Settings",
          properties: {
            name: {
              type: "string",
              title: "Name",
              placeholder: "Enter engagment name here"
            },
            title: {
              type: "string",
              title: "Title"
            },
            message: {
              type: "string",
              title: "Message"
            }
          },
          required: ["name", "title"]
        },
        listOfStrings: {
          type: "array",
          title: "A list of strings",
          items: {
            type:"object",
            properties:{
              ctaText:{
                type: "string",
                title:"CTA TEXT",
                default: "bazinga"
              }
            }
          }
        }
      }
    };
    this.uiSchema = {
      webPushGeneralSettings:{
        message:{
            "ui:widget": Mentio,
            "ui:options": {
              macros: this.userMentionData,
              singleLine: true,
              handleChange:function(event){
                console.log(event.target.value);
              }
            }
        },
        title:{
            "ui:widget": EmojiPicker
        }
      },
      webPushOptionalSettings:{
        title:{
          "ui:widget": CodeArea
        }
      }
    };
    this.formData = {
      webPushGeneralSettings:{
        name: "Engagement Name",
        title: "Title Goes here",
        message: "Message goes here"
      },
      listOfStrings:[
        {
           ctaText: "Helloo"
        }
      ]
    };
  }
  
  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    console.log(newValue, newPlainTextValue, mentions)
    this.setState({
      value: newValue,
      mentionData: {newValue, newPlainTextValue, mentions}
    })
  }

  handleChangeSingle = (e, newValue, newPLainTextValue, mentions) => {
    this.setState({
      singleLineValue: newValue
    })
  }
  render(){
    return (<div style={{ width: "30%"}}>
      <Form
        schema={this.schema}
        formData={this.formData}
        uiSchema={this.uiSchema}
        FieldTemplate={CollapsibleFieldTemplate}
        formContext={{ hideAll: false }}
        className="accordian-widget"
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </div>);
 };
}
export default App;


// import React from "react";
// import Form from "react-jsonschema-form";
// //import fields from "react-jsonschema-form-extras-ben";
// //import otherFields from "other-fields";
// import {fields, collapsible} from "react-jsonschema-form-extras";
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import "react-day-picker";
// //let allFields = Object.assign({}, fields, otherFields);
// class App extends React.Component {
//   constructor(){
//     super();
//       this.schema = {
//         type: "object",
//         classNames: "mmmm",
//         properties: {
//           webPushGeneralSettings: {
//             type: "object",
//             title: "1. General Settings",
//             properties: {
//               name: {
//                 type: "string",
//                 title: "Name",
//                 readOnly: true
//               },
//               title: {
//                 type: "string",
//                 title: "Title"
//               },
//               message: {
//                 type: "string",
//                 title: "Message"
//               }
//             },
//             required: ["name", "title"]
//           },
//           webPushOptionalSettings: {
//             type: "object",
//             title: "2. Optional Settings",
//             properties: {
//               name: {
//                 type: "string",
//                 title: "Name",
//                 placeholder: "Enter engagment name here"
//               },
//               title: {
//                 type: "string",
//                 title: "Title"
//               },
//               message: {
//                 type: "string",
//                 title: "Message"
//               }
//             },
//             required: ["name", "title"]
//           },
//           listOfStrings: {
//             type: "array",
//             title: "A list of strings",
//             items: {
//               type:"object",
//               properties:{
//                 ctaText:{
//                   type: "string",
//                   title:"CTA TEXT",
//                   default: "bazinga"
//                 }
//               }
//             }
//           }
//         }
//       };
//       this.uiSchema = {
//          "ui:field": "collapsible",
//         "collapse": {
//           "field": "table"
//         },
//         webPushGeneralSettings:{
//           message:{
//               "ui:widget": Mentio,
//               "ui:options": {
//                 macros: this.userMentionData,
//                 singleLine: true,
//                 handleChange:function(event){
//                   console.log(event.target.value);
//                 }
//               }
//           }
//         }
//       };
//       this.formData = {
//         webPushGeneralSettings:{
//           name: "Engagement Name",
//           title: "Title Goes here",
//           message: "Message goes here"
//         },
//         listOfStrings:[
//           {
//             ctaText: "Helloo"
//           }
//         ]
//       };
//     // this.schema = {
//     //   type: "object",
//     //   properties: {
//     //     firstName: { type: "string" },
//     //     lastName: { type: "string" },
//     //     age: { type: "boolean" }
//     //   }
//     // }

//     // this.uiSchema = {
//     //   firstName: {
//     //       "ui:field": "collapsible",
//     //       collapse: {
//     //         field: "StringField",
//     //         legend: {
//     //           component: "LanguageLegend",
//     //           props: {
//     //             language: "EN"
//     //           }
//     //         }
//     //       }
//     //   },
//     //   lastName: {
//     //       "ui:field": "collapsible",
//     //       collapse: {
//     //         field: "StringField",
//     //         legend: {
//     //           component: "LanguageLegend",
//     //           props: {
//     //             language: "EN"
//     //           }
//     //         }
//     //       }
//     //   }
//     // }

//     this.formContext = {
//       legends: {
//         LanguageLegend: (props) => (<h1>Expected {props.language} characters</h1>)
//       }
//     }
//   }
//     render(){
//         return (<div style={{ width: "30%"}}>
//             <Form formContext={this.formContext} schema={this.schema} uiSchema={this.uiSchema} fields={fields}/>

//         </div>);
//     }
// }
// export default App;