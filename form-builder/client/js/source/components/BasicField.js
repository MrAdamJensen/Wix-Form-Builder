/* @flow */

import React, {Component} from 'react';

/*
Special properties for BasicField
-------------------------------
defaultValue: the default value
readOnly: does the value can be edited
*/
export type Props = {
  defaultValue: (number | string),
  readOnly: boolean,
  id: string,
  ref: string,
  defaultValue: string,
  readOnly: boolean,
  disabled?: boolean
};

/*
BasicField state fields:
------------------------
value: current given value in input
*/
export type State = {
  value: string,
};

/*
BasicField component for basic input field
*/
class BasicField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;

  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Initializing component state
    if (typeof props.defaultValue !== 'undefined' && props.defaultValue != null) {
      this.state = {value: props.defaultValue.toString()};
    }
    else {
      this.state = {value: ""};
    }
  }

  /*
  Updating state on props change
  */
  componentWillReceiveProps(nextProps : Props) {
    // If props change, update state required fields based on new props
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({value: nextProps.defaultValue.toString()});
    }
  }

  /*
  Callback for change in input to update state
  */
  _onChange(e: {target: {value: any}}) {
    this.setState({value: e.target.value})
  }

  /*
  Returning value
  */
  getValue(): (string | number) {
    return this.state.value;
  }

  /*
  If field is in read only mode, render it as a simple span and a hidden input for the label,
  otherwise, render the given element
  */
  _renderWithReadOnlyCheck(notReadOnlyComp: any) {
    // Asserting field is read only, if yes render it as a simple span with a hidden input for the label,
    // otherwise, render it as input
    if (this.props.readOnly) {
      return <div>
              <span>
                {this.state.value}                            {/*Setting seen value*/}
              </span>
              <input 
              id={this.props.id}                             // Setting id for label
              disabled={this.props.disabled}                 // Setting disabled to disable input field if requested
              defaultValue={this.props.defaultValue}          // Setting input default value
                type="hidden" 
              />
            </div>
    }
    else {
      return notReadOnlyComp
    } 
  }
}

export default BasicField
