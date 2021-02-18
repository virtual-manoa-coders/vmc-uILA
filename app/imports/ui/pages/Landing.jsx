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
