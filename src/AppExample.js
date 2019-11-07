// const originalSchema = {
//   type: 'object',
//   properties: {
//     general: {
//       type: "object",
//       title: "1. General Settings",
//       properties: {
//         location: {
//           type: 'string',
//           title: 'Where do you live?',
//           enum: ['us', 'nordic', 'other'],
//           enumNames: ['US', 'Nordic country', 'Other']
//         },
//         state: {
//           type: 'string',
//           title: 'State',
//           enum: ['AL', 'AK', 'AZ'],
//           enumNames: ['Alabama', 'Alaska', 'Arizona']
//         },
//         nordicCountry: {
//           type: 'string',
//           title: 'Country',
//           enum: ['de', 'fi', 'is', 'no', 'sv'],
//           enumNames: ['Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden']
//         },
//         region: {
//           type: 'string',
//           title: 'Region'
//         },
//         country: {
//           type: 'string',
//           title: 'Country'
//         },
//         city: {
//           type: 'string',
//           title: 'City'
//         }
//       }
//     }
//   }
// };
// const originalUISchema = {
//    general: {
//     "ui:field": "collapsible",
//     collapse: {
//       collapsed: false,
//       icon: {
//         enabled: "glyphicon glyphicon-chevron-down"
//       },
//       field: "ObjectField"
//     },
//     'ui:order': ['location', 'state', 'nordicCountry', 'country', 'region', 'city'],
//     location: {
//       'ui:widget': 'radio',
//       'ui:options': {
//         inline: true
//       },
//       classNames: 'col-xs-12'
//     },
//     state: {
//       // Show state options only if "US" was selected
//       condition: 'general[location]=us',
//       classNames: 'col-xs-6'
//     },
//     nordicCountry: {
//       // Show list of Nordic countries if "Nordic country" was selected
//       condition: 'general[location]=nordic',
//       'ui:widget': 'radio',
//       classNames: 'col-xs-6'
//     },
//     country: {
//       // Show regular text field for other countries
//       condition: 'general[location]=other',
//       classNames: 'col-xs-6'
//     },
//     city: {
//       // Show city field for all countries but only if a location selection
//       // has been made, i.e. not initially. (It would be nice to be able to
//       // location!="" or something).
//       condition: 'general[location]=us,nordic,other',
//       classNames: 'col-xs-6'
//     },
//     region: {
//       // Show region field for all non-US countries, expect Iceland
//       // if it was selected from the Nordic country list.
//       condition: 'general[location]=other||general[nordicCountry]=fi,de,no,sv',
//       classNames: 'col-xs-6'
//     }
//    }
// };
// const originalFormData = {};

// Advanced conditional fields example
// 
// Control the visibility of any field by adding a "condition" property to the
// field's UI Schema. The condition should evaluate to either true or false
// based on the current value(s) of other field(s), e.g. someField=someValue.
// The evaluation is done dynamically upon any change in the form data.
//
// Supported conditions in this example are:
//   foo=bar
//   foo!=bar
//   foo=bar,baz
//   foo!=bar,baz
//   foo=bar&&bar=foo
//   foo=bar||bar=foo
//
//   ...and some permutations of these.
//
// Please note that complex conditions do not work, e.g.
// foo=bar||bar=foo&&baz=bar
//

const originalSchema = {
  title: 'Location',
  type: 'object',
  properties: {
    location: {
      type: 'string',
      title: 'Where do you live?',
      enum: ['us', 'nordic', 'other'],
      enumNames: ['US', 'Nordic country', 'Other']
    },
    state: {
      type: 'string',
      title: 'State',
      enum: ['AL', 'AK', 'AZ'],
      enumNames: ['Alabama', 'Alaska', 'Arizona']
    },
    nordicCountry: {
      type: 'string',
      title: 'Country',
      enum: ['de', 'fi', 'is', 'no', 'sv'],
      enumNames: ['Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden']
    },
    region: {
    	type: 'string',
      title: 'Region'
    },
    country: {
      type: 'string',
      title: 'Country'
    },
    city: {
      type: 'string',
      title: 'City'
    }
  }
};
const originalUISchema = {
  'ui:order': ['location', 'state', 'nordicCountry', 'country', 'region', 'city'],
  location: {
    'ui:widget': 'radio',
    'ui:options': {
    	inline: true
    },
    classNames: 'col-xs-12'
  },
  state: {
  	// Show state options only if "US" was selected
    condition: 'location=us',
    classNames: 'col-xs-6'
  },
  nordicCountry: {
    // Show list of Nordic countries if "Nordic country" was selected
    condition: 'location=nordic',
    'ui:widget': 'radio',
    classNames: 'col-xs-6'
  },
  country: {
    // Show regular text field for other countries
    condition: 'location=other',
    classNames: 'col-xs-6'
  },
  city: {
    // Show city field for all countries but only if a location selection
    // has been made, i.e. not initially. (It would be nice to be able to
    // location!="" or something).
    condition: 'location=us,nordic,other',
    classNames: 'col-xs-6'
  },
  region: {
    // Show region field for all non-US countries, expect Iceland
    // if it was selected from the Nordic country list.
    condition: 'location=other||nordicCountry=fi,de,no,sv',
    classNames: 'col-xs-6'
  },
};
const originalFormData = {};

// Process the initial state for the form.
// Without this step, all fields would be shown initially.
const initialState = processForm(originalSchema, originalUISchema, originalSchema, originalUISchema, originalFormData);

const Form = JSONSchemaForm.default;

class MyComp extends React.Component {
    constructor (props) {
        super(props);
        this.state = initialState;
    }

    handleChange (data) {
        const schema = { ...this.state.schema };
        const uiSchema = { ...this.state.uiSchema };
        const { formData } = data;

        const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);

        this.setState(newState);
    }

    render () {
        return (<Form
                schema={this.state.schema}
                uiSchema={this.state.uiSchema}
                formData={this.state.formData}
                onChange={this.handleChange.bind(this)}
            />);
    }
}

ReactDOM.render(<MyComp/>, document.getElementById('main'));


/**
 * Calculate new state for form based on UI Schema field conditions and current form data
 *
 * @param originalSchema - Original full schema containing all possible fields
 * @param originalUISchema - Original full UI Schema containing all possible fields
 * @param schema - Current schema
 * @param uiSchema - Current UI schema
 * @param formData - Current form data
 * @return {object} - Object containing new schema, uiSchema, and formData
 */
function processForm (originalSchema, originalUISchema, schema, uiSchema, formData) {
    let newSchema, newUISchema, newFormData;

    let conditionalFields = _.pickBy(uiSchema, (field) => field.hasOwnProperty('condition'));

    if (_.isEmpty(conditionalFields)) {
        return {
            schema,
            uiSchema,
            formData
        };
    }

    newSchema = _.assign({}, schema);
    newUISchema = _.assign({}, uiSchema);
    newFormData = _.assign({}, formData);

    _.each(conditionalFields, (dependantSchema, dependant) => {
        const { rules, allHaveToMatch } = getConditionRules(dependantSchema.condition);
        let matches = [];
        _.each(rules, (rule) => {
            const { field, values: stringValues, invert } = getConditionRule(rule);
            let visible = invert;

            const values = stringValues.map(value => {
                if (value === 'true') {
                  	value = true;
                } else if (value === 'false') {
                  	value = false;
                }
                return value;
            });

		    if (field && newFormData.hasOwnProperty(field)) {
                let currentValues = _.isArray(newFormData[field])
                		? newFormData[field]
                    : [ newFormData[field] ];
                _.each(values, (value) => {
                    if (invert) {
                      	visible = visible && _.indexOf(currentValues, value) === -1;
                    }
                    else {
                        visible = visible || _.indexOf(currentValues, value) !== -1;
                    }
                });
            }

            matches.push(visible);
        });

        // Add or remove conditional field from schema
        let shouldBeVisible = false;
        if (matches.length) {
            shouldBeVisible = allHaveToMatch
                // foo=bar && bar=foo
                ? _.every(matches, Boolean)
                // foo=bar || bar=foo
                : _.some(matches, Boolean);
        }

        if (shouldBeVisible) {
            newSchema.properties[dependant] = originalSchema.properties[dependant];
        } else {
            newSchema.properties = _.omit(newSchema.properties, [dependant]);
            newFormData = _.omit(newFormData, [dependant]);
        }
    });

    // Update UI Schema UI order
    // react-jsonschema-form cannot handle extra properties found in UI order
    newUISchema['ui:order'] = _.intersection(
        originalUISchema['ui:order'],
        _.keys(newSchema.properties)
    );
    // Update Schema required fields
    if (originalSchema.hasOwnProperty('required')) {
        newSchema.required = _.intersection(
            originalSchema.required,
            _.keys(newSchema.properties)
        );
    }

    return {
        schema: newSchema,
        uiSchema: newUISchema,
        formData: newFormData
    };
}

function getConditionRules (condition = '') {
    let rules = [];
    let allHaveToMatch = false;
    let visible = false;

    // foo=bar || bar=foo
    if (condition.indexOf('||') !== -1) {
        rules = condition.split('||');
        allHaveToMatch = false;
        visible = false;
    }
    // foo=bar && bar=foo
    else if (condition.indexOf('&&') !== -1) {
        rules = condition.split('&&');
        allHaveToMatch = true;
        visible = true;
    }
    // foo=bar
    else {
        rules = [condition];
        allHaveToMatch = true;
        visible = true;
    }

    return {
        rules,
        allHaveToMatch,
        visible
    };
}

function getConditionRule (conditionRule) {
    let rule = []
    let invert;

    // foo!=bar
    if (conditionRule.indexOf('!=') !== -1) {
        rule = conditionRule.split('!=');
        invert = true;
    }
    // foo=bar
    else if (conditionRule.indexOf('=') !== -1) {
        rule = conditionRule.split('=');
        invert = false;
    }

    if (rule.length !== 2) {
        return false;
    }

    let [field, values] = rule;

    values = values.split(',');

    return {
        field,
        values,
        invert
    };
}
