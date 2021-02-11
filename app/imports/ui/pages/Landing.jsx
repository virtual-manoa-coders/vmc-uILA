import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <div className='banner-image'>
                <div className='banner-image-row'>
                    <div className='welcome-text'>
                        <div>
                            Welcome to uILA
                        </div>
                    </div>
                    <div>
                        <Grid centered columns={4}>
                            <Grid.Column textAlign='center'>
                                <div>
                                    Already a Member?
                                </div>
                                <Button inverted>Login</Button>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <div>
                                    Not a Member?
                                </div>
                                <Button inverted>Sign up</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                    <div className='summary'>
                        <Grid columns={3}>
                            <Grid.Column>
                                <Icon name='handshake outline'/>
                                <div>
                                    Connect
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='clipboard outline'/>
                                <div>
                                    Log
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='sliders horizontal'/>
                                <div>
                                    Compare
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </div>
            <Grid className='description-section' textAlign='left'>
                <Grid.Row className='description-header'>
                    What does Uila offer
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Icon name='handshake outline'/>
                        <br/>
                        <div>
                            Connect
                        </div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Icon name='clipboard outline'/>
                        <br/>
                        <div>
                            Log
                        </div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Icon name='sliders horizontal'/>
                        <br/>
                        <div>
                            Compare
                        </div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Grid.Column>
                </Grid.Row>
            </Grid>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
              <Button as={NavLink} exact to="/login" key='login' >Click here to get started</Button>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
