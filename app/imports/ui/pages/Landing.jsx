import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Button, Icon, Input, Dropdown } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <div className='banner-image'>
                <div className='banner-image-row'>
                    <div className='welcome-text'>
                        <div>
                            How did YOU impact Hawai'i today?
                        </div>
                    </div>
                    {
                        !this.props.currentUser &&
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
                    }
                    {
                        this.props.currentUser &&
                        <div>
                            <Grid centered columns={3}>
                                <Grid.Column textAlign='center'>
                                    <div>
                                        Get started
                                    </div>
                                    <Button inverted as={NavLink} exact to="/login" key='login'>Go to Dashboard</Button>
                                </Grid.Column>
                            </Grid>
                        </div>
                    }
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
            <div className={'trial-converter'}>
                <Grid.Row>
                    <h3>
                        Try out our converter
                    </h3>
                </Grid.Row>
                <Grid>
                    <Grid.Row columns={4}>
                        <Grid.Column width={8}>
                            <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                Distance Traveled
                                <Input placeholder='How far did you travel?' />
                            </div>
                            <div>
                                Method of Travel (Optional)
                                <Dropdown
                                    placeholder={'How did you travel?'}
                                    selection
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8} verticalAlign={'middle'}>
                            XX Lbs of Carbon Emitted
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Grid>
    );
  }
}

/** Declare the types of all properties. */
Landing.propTypes = {
    currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LandingContainer);
