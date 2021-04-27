import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * NOTE: Will work on this component later
 */
class SideBar extends React.Component {
  render() {
    return (
        <Menu.Item>
          Dashboard
        </Menu.Item>

    );
  }
}

SideBar.propTypes = {
  user: PropTypes.string,
};

export default withTracker(() => {
  const user = PropTypes.string.isRequired; // Need to grab the total user information from here
  return {
    user,
  };
})(SideBar);
