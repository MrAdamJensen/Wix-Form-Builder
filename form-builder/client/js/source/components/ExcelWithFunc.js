/* @flow */

import Button from './Button';
import CRUDActions from '../flux-imm/CRUDActions';
import CRUDStore from '../flux-imm/CRUDStore';
import Excel from './Excel';
import React, {Component} from 'react';

/*
Defining function types to be used for the actions callbacks
*/
export type VoidMethod = () => any;
export type ActionMethods = (func: VoidMethod) => any;

/*
Special properties for ExcelWithFunc
-------------------------------
crudStore: the CRUD store from which to retrieve the data
crudActions: the CRUD actions with which to perform actions on the CRUD store
actions: the actions that are available by this component
verbose: dictating if to show all fields even if they are set to not show
*/
type Props = {
  crudStore: CRUDStore,
  crudActions: CRUDActions,
  actions: Array<ActionMethods>,
  actionsDefs: Array<string>,
  initialActivatedAction: number,
  verbose: boolean,
};

/*
ExcelWithFunc state fields
-------------------
actionActivated: the index of the activated action
count: number of rows in data
*/
type State = {
  actionActivated: number,
  count: number,
};

/*
ExcelWithFunc component which renders a excel table with optional functionality
*/
class ExcelWithFunc extends Component<Props, State> {
  // Component fields type definitions
  state: State;
  crudStore: CRUDStore;
  crudActions: CRUDActions;
  crudStoreListenToken: any

  // Setting the default values for the properties 
  static defaultProps = {
    actions: [],
    initialActivatedAction: -1,
    verbose: false,
  };

  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Retrieving the store and store actions objects
    this.crudStore = props.crudStore;
    this.crudActions = props.crudActions

    // Initializing component state
    this.state = {
      actionActivated: this.props.initialActivatedAction,
      count: this.crudStore.getCount(),
    };

    // Listening for table data change, when notified on a change, update component copy
    this.crudStoreListenToken =  this.crudStore.addListener('change', () => {
      this.setState({
        count: this.crudStore.getCount(),
      })
    });
  }
  
  /*
  Executed when the component is disconnecting from the DOM
  */
  componentWillUnmount() {
    // Since component is un mounting, remove listeners for data change
    this.crudStoreListenToken.remove()
  }

  /*
  Asserting a call to render is needed
  */
  shouldComponentUpdate(newProps: Object, newState: State): boolean {
    // If current activated action did not change and current number of rows in table did not change
    // don't call render
    return newState.actionActivated !== this.state.actionActivated || newState.count !== this.state.count;
  }
  
  /*
  Updating state on props change
  */
 componentWillReceiveProps(nextProps : Props) {
  // If props change, update state required fields based on new props
  if (nextProps.initialActivatedAction !== this.props.initialActivatedAction) {
    this.setState({actionActivated: nextProps.initialActivatedAction});
  }
}

  /*
  Setting action to be activated
  */
  _executeAction(action: number) {
    this.setState({actionActivated: action});
  }
  
  /*
  Finish action execution
  */
  _finishActionExecution() {
    this.setState({actionActivated: -1})
  }

  /*
  Rendering component
  */
  render() {
    return (
      <div className="ExcelWithFunc">           {/*Creating component*/}
        <div className="ExcelWithFuncToolbar">  {/*Creating component toolbar*/}
          {this._renderActions()}               {/*Creating component toolbar actions*/}
          {this._renderSearch()}                {/*Creating component toolbar search functionality*/}
        </div>
        <div className="ExcelWithFuncDatagrid"> {/*Creating component table*/}
          <Excel 
            crudStore={this.crudStore}
            crudActions={this.crudActions}  
            verbose={this.props.verbose}
          />
        </div>
        {this._renderAction()}                   {/*If an action is activated, render it*/}
      </div>
    );
  }

  /*
  Rendering toolbar
  */
  _renderActions() {
    return <div className="ExcelWithFuncToolbarAction">        {/*Creating all actions buttons*/}
              {
                this.props.actions.map((action, index) => {
                  // Creating an action button
                  return <Button 
                            // Setting a callback to declare on click which action is activated when button is clicked
                            onClick={this._executeAction.bind(this, index)} 

                            // Setting key because react demands it
                            key={index}

                            className="ExcelWithFuncToolbarButton">
                            {this.props.actionsDefs[index]}              {/* Setting button text */}
                          </Button>
                })
              }
            </div>
  }

  /*
  Rendering search functionality
  */
  _renderSearch() {
    return <div className="ExcelWithFuncToolbarSearch">                   {/*Creating search functionality*/}
              {/*Creating input field to receive the search query*/}
              <input                           
                // Setting the placeholder to declare how many rows there is to search                           
                placeholder={this.state.count === 1         
                  ? 'Search 1 record...'
                  : `Search ${this.state.count} records...`
                } 

                // Setting callback to activate table search upon focus and callback to 
                // initiate a new search upon input change
                onChange={this.crudActions.search.bind(this.crudActions)}
                onFocus={this.crudActions.startSearching.bind(this.crudActions)} />
            </div>
  }

  /*
  Rendering action
  */
  _renderAction() {
    // Asserting an acton is activated, if so calling given function to render action
    return this.state.actionActivated >= 0
          ? this.props.actions[this.state.actionActivated](this._finishActionExecution.bind(this))
          : null
  }
}

export default ExcelWithFunc
