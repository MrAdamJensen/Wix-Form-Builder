/* @flow */

import React from 'react';
import {BasicField, Props} from './BasicField'

/*
EmailField component for picking an email
*/
class EmailField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "johndo@gmail.com",
    readonly: false,
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Rendering component
  */
  render() {
    // Rendering
    return <input 
                type="email"                           {/*Setting the required type for this input */}
                {...props}                             {/*Setting all given properties to input*/}
                {props.readonly ? "disabled" : null}   {/*If readonly, disable input*/}
            />    
  }
}

export default EmailField