import _ from "lodash";
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
    let headerFields = _.pickBy(uiSchema, (field) => {console.log(field);field.hasOwnProperty('ui:field')});
    let conditionalFields = _.pickBy(uiSchema, (field) => {console.log(field);field.hasOwnProperty('condition')});

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
function transformErrors (errors) {
    return errors.map(error => {
        if (error.name === "pattern") {
            error.message = "Only digits are allowed"
        }else if(error.property['lp'])(
            error.message = "Please enter valid url"
        )
        return error;
    });
}
export {processForm,transformErrors}