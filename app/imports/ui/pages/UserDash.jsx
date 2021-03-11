import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
//Import the react pro sidebar components
import { Menu, Sidebar, SidebarProps, Dropdown, HeaderContent } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/**Updated dashboard */
class UserDash extends React.Component {
  /** Function that defines the states of the menu collapse */
   Header = () => {
     const menuCollapse = useState(false)
     const setMenuCollapse = useState(false)
   }
   /** Function that will set the menu collapse to be true or false */
  menuIconClick = () => {
    //Creation of the menu to collapse
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }
  };



  render() {
    return (

    );
}

/** Declare the types of all properties. */
UserDash.propTypes = {
  currentUser: PropTypes.string,
};

export default  withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserDash);

