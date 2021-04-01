import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import GhgCalculator from '../components/GhgCalculator';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
          <video autoPlay muted loop id="myVideo">
            <source src="/images/traffic.mp4" type="video/mp4"/>
          </video>
          <div className='welcome-text'>
            <Grid fluid centered padded column={3}>
              {/*<Grid.Row>*/}
              {/*  <Grid.Column id="text1" width={5}>24,000lb of CO2 today</Grid.Column>*/}
              {/*  <Grid.Column id="text2" width={5}>75,500lb of CO2 this week</Grid.Column>*/}
              {/*  <Grid.Column id="text3" width={5}>1,000,000lb of CO2 this year</Grid.Column>*/}
              {/*</Grid.Row>*/}
              <Grid.Row id="text4">
                What is your contribution?
              </Grid.Row>
            </Grid>
          </div>
             {
                !this.props.currentUser &&
                <div>
                  <Grid className='signUp' centered columns={4}>
                    <Grid.Column textAlign='center'>
                      <div>
                        Already a Member?
                      </div>
                      <Button inverted as={NavLink} exact to="/signin" key='login'>Login</Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <div>
                        Not a Member?
                      </div>
                      <Button inverted as={NavLink} exact to="/signup" key='signup'>Sign up</Button>
                    </Grid.Column>
                  </Grid>
                </div>
              }
              {
                this.props.currentUser &&
                <div className='get-started'>
                  <div>Get started</div>
                      <Button className='landingButton' inverted as={NavLink} exact to="/dashboard" key='dashboard'>Go to Dashboard</Button>
                </div>
              }
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
          <Grid container>
            <Grid.Row centered className='ghg-landing'>
              Not ready to become a member yet? Test out the emissions calculator here!
            </Grid.Row>
            <Grid.Row className='about-font' centered style={{ fontSize: '0.75em' }}>
              Enter your vehicle&apos;s MPG and distance traveled to calculate the amount of CO2 emitted.
            </Grid.Row>
            <Grid.Row>
              <GhgCalculator/>
            </Grid.Row>
          </Grid>
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
