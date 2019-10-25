
import React, { Component, PureComponent } from "react";
import get from "lodash/get";
import { Collapse } from 'antd';
import "antd/dist/antd.css";
const { Panel } = Collapse;
let contentToRender = null;

class Accordion extends PureComponent{
    state = {
        openPanel: "1"
    };

    onChange = key => {
        this.setState({
            openPanel: key
        });
    };
    constructor(props) {
        super(props);

        const { formContext } = props;

        const topmostElement = this.isThisTheTopmostElement();

        this.state = {
            collapsed: topmostElement ? false : formContext.hideAll,
            topmostElement,
            hideAll: formContext.hideAll
        };
    }
    static getDerivedStateFromProps(nextProps, state) {
        const { formContext } = nextProps;
        const { hideAll, topmostElement } = state;

        if (hideAll !== formContext.hideAll) {
        return {
            collapsed: topmostElement ? false : formContext.hideAll,
            hideAll: formContext.hideAll
        };
        }

        return null;
    }

    isThisTheTopmostElement = () => {
        const { id } = this.props;
        console.log(this.props);
        return id === "root";
    };
    render() {
        const {
            label,
            help,
            required,
            description,
            errors,
            classNames,
            children,
            hidden,
            schema
        } = this.props;
        const { collapsed, hideAll } = this.state;
        const type = get(schema, "type", undefined);
        console.log(this.props);
        contentToRender = (
            <React.Fragment>
                {type !== "object" && type !== "array" ? description : null}
                    {Object.keys(schema.properties).map((key, value) => 
                        <Panel header={schema.properties[key].title} key={value}>
                           {Object.keys(children[0].props).map(childKey=>(
                               children[0].props[childKey]
                           ))}
                        </Panel>      
                    )}
            </React.Fragment>
        );
        return(
            <React.Fragment>
                <Collapse accordion>
                    {contentToRender}
                </Collapse>
            </React.Fragment>
        );
    }
}
export default Accordion;