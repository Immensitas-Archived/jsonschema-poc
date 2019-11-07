const originalSchema =  {
  type: "object",
  properties: {
    general: {
      type: "object",
      title: "1. General Settings",
      properties: {
        name:{
            title: "Name",
            type: "string",
              minLength: 6,
              maxLength: 25
        },
        message:{
            title: "Notification Message",
            type: "string"
        },
        senderId: {
          title: "Sender ID",
          type: "string",
          enum:[
              "citi",
              "hdfc"
          ],
          default:"citi"
        }
      },
      dependencies:{
        "senderId":{
            "oneOf":[
              {
                "properties":{
                  "senderId":{
                      "enum":[
                        "citi"
                      ]
                    }
                }
              },
              {
                "properties":{
                    "senderId":{
                      "enum":[
                        "hdfc"
                      ]
                    },
                    "messageType": {
                      "title": "Message Type",
                      "type": "string"
                    }
                }
              }
            ]
        }
      },
      required: ["name", "site_username"]
    },
    schedule: {
      type: "object",
      title: "2. Schedule Settings",
      properties: {
        log_enabled: {
          title: "LOG_ENABLED",
          type: "boolean",
          default: false
        }
      }
    }
  }
};
const originalUISchema = {
  general: {
    "ui:field": "collapsible",
    collapse: {
      collapsed: false,
      icon: {
        enabled: "glyphicon glyphicon-chevron-down"
      },
      field: "ObjectField",
    },
    message:{
        "ui:widget": "textarea"
    },
    senderId: {
      'ui:widget': 'select',
      'ui:options': {
        inline: true
      }
    },
    // messageType:{
    //     condition: "general[senderId] = hdfc"
    // }
  },
  schedule: {
    "ui:field": "collapsible",
    collapse: {
      field: "ObjectField"
    },
    log_enabled: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true
      }
    }
  }
};
const originalFormData = {};