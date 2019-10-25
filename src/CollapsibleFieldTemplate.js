import React, { Component, PureComponent } from "react";
import get from "lodash/get";
import { Button, Glyphicon  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class CollapsibleFieldTemplate extends PureComponent{
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

  isThisFormGroupElement = () => {
    const {classNames} = this.props;
    return classNames === "form-group field field-object" || classNames === "form-group field field-array";
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

    let legend = null;
    console.log(this.props);
    if (type !== "object" && type !== "array") {
      legend = label ? `${label}${required ? "*" : ""}` : null;
    } else if (collapsed) {
      legend = (
        <fieldset className="field field-array field-array-of-object">
          {label ? <legend>{`${label}${required ? "*" : ""}`}</legend> : null}
        </fieldset>
      );
    }

    let contentToRender = null;

    if (!collapsed) {
      contentToRender = (
        <React.Fragment>
          {type !== "object" && type !== "array" ? description : null}
          {children}
          {errors}
          {help}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {hidden ? null : (
          <div className={classNames}>
            <React.Fragment>
              {((!this.isThisTheTopmostElement()) && this.isThisFormGroupElement()) ? (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    style={{
                      display: "inline-block",
                      float: "right",
                      fontSize: "large"
                    }}
                    onClick={() => this.setState({ collapsed: !collapsed })}
                  >
                    {collapsed ? (
                      <React.Fragment>
                        +
                        {get(errors, "props.errors", []).length ? (
                          <span style={{ fontSize: "small" }}>
                            {" "}
                            (Contains errors)
                          </span>
                        ) : null}
                      </React.Fragment>
                    ) : (
                      "-"
                    )}
                  </Button>
              ) : null}
              {legend ? <React.Fragment> {legend}</React.Fragment> : null}
              {contentToRender}
            </React.Fragment>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default CollapsibleFieldTemplate;