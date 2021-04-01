import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Sticky } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  state = {
    navbarColor: 'transparent',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll= () => {
    if (window.scrollY > 80) {
      this.setState({ navbarColor: '#54678F' });
    } else {
      this.setState({ navbarColor: 'transparent' });
    }
  };

  render() {
    const { navbarColor } = this.state;
    // const menuStyle = { marginBottom: '10px', backgroundColor: '#54678F' };

    return (
        <div className='navbar'>
          {/*<Sticky>*/}
          <Menu secondary stackable fixed='top' borderless inverted
                style={{ backgroundColor: navbarColor, boxShadow: 'none', borderBottom: 'none', fontFamily: 'Merriweather' }}
          >
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Image size='small' src='images/logo2.png'/>
            </Menu.Item>
            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} activeClassName="active" exact to="/comparator"
                            key='comparator'>Comparator</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/community"
                             key='community'>Community</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/dashboard"
                             key='dashboard'>Dashboard</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
            ) : ''}
            <Menu.Item position="right">
              {this.props.currentUser === '' ? (
                  <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                                     to="/signin"/>
                      <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                                     to="/signup"/>
                    </Dropdown.Menu>
                  </Dropdown>
              ) : (
                  <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="user-profile" icon="car" text="Profile" as={NavLink} exact to="/user-profile"
                                     key='user-profile'/>
                      <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                     to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>
              )}
            </Menu.Item>
          </Menu>
          {/*</Sticky>*/}
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
