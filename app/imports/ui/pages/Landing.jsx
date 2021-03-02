import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import GhgCalculator from '../components/GhgCalculator';

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

export default Landing;
