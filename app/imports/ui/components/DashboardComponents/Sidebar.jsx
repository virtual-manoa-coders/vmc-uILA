import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Image, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * NOTE: Will work on this component later
 */
class Sidebar extends React.Component{
  render() {
    return(
        <!-- Home -->
        <Menu.Item>
          Dashboard
        </Menu.Item>

    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.string,
}

export default withTracker(() => {
  const user = PropTypes.string.isRequired; //Need to grab the total user information from here
  return {
    user,
  }
})(Sidebar)