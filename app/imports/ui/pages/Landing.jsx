import React from 'react';
<<<<<<< Updated upstream
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
=======
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Button, Icon, Input, Dropdown, Transition } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
>>>>>>> Stashed changes

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
          <video autoPlay muted loop id="myVideo">
            <source src="traffic.mp4" type="video/mp4"/>
          </video>
            <div className='banner-image'>
                <div className='banner-image-row'>
                    <div className='welcome-text'>
                        <Grid centered padded column={3}>
                          <Grid.Row>
                            <Grid.Column id="text1" width={5}>24,000lb of CO2 today</Grid.Column>
                            <Grid.Column id="text2" width={5}>75,500lb of CO2 this week</Grid.Column>
                            <Grid.Column id="text3" width={5}>1,000,000lb of CO2 this year</Grid.Column>
                          </Grid.Row>
                          <Grid.Row id="text4">
                            What is your contribution?
                          </Grid.Row>
                        </Grid>
                    </div>
                    <div>
                        <Grid centered columns={4}>
                            <Grid.Column textAlign='center'>
                                <div>
                                    Already a Member?
                                </div>
                                <Button inverted as={NavLink} exact to="/login" key='login'>Login</Button>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <div>
                                    Not a Member?
                                </div>
                                <Button inverted as={NavLink} exact to="/login" key='signup'>Sign up</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </div>

            <Grid className='description-section' textAlign='left'>
                <Grid.Row className='description-header'>
                    What does Project Malama offer
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
                        Connect with the community and see how you are helping reduce emissions.
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Icon name='clipboard outline'/>
                        <br/>
                        <div>
                            Track
                        </div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Log in your distance traveled alongside your method of transportation to track your emissions
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
                        Compare your current emission options to other options
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid>
    );
  }
}

export default Landing;
