import React from 'react';
import { Header, Grid, Container, Button, Icon, Divider, Modal } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import GhgCalculator from '../components/GhgCalculator';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
        <Container id='landing-page' fluid textAlign='center' centered stackable>
          <video autoPlay muted loop id='myVideo'>
            <source src='/images/traffic.mp4' type="video/mp4"/>
          </video>
          <Grid fluid verticalAlign='middle' centered textAlign='center' container>
            <div className='welcome-text'>
              <Grid fluid verticalAlign='middle' centered padded columns='equal'>

                <Grid.Row style={{ color: '#425170' }}>
                  <Grid.Column verticalAlign='middle'>
                    <Icon name='small arrow circle down'/>
                    <br/>
                    <h3>205,721lb of CO2 reduced</h3>
                  </Grid.Column>
                  <Divider hidden/>
                  <Grid.Column verticalAlign='middle'>
                    <Icon name='small road'/>
                    <br/>
                    <h3>10,500 gallons of gas saved</h3>
                  </Grid.Column>
                  <Divider hidden/>
                  <Grid.Column verticalAlign='middle'>
                    <Icon name='small taxi'/>
                    <br/>
                    <h3>231,547 VMT reduced</h3>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row id="text4">
                  What is your contribution?
                </Grid.Row>
                <Grid.Row>
                  {
                    this.props.currentUser &&
                    <div>
                      <Grid.Column centered verticalAlign='middle' className='get-started'>
                        <Header as='h2' inverted>GET STARTED</Header>
                        <Button className='landingButton' inverted as={NavLink} exact to="/dashboard" key='dashboard'>Go
                          to
                          Dashboard</Button>
                        <Button className='landingButton' inverted onClick={this.handleOpen}>GHG Calculator</Button>
                        <Modal
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            closeIcon
                        >
                          <Modal.Header>
                            GHG Calculator
                          </Modal.Header>
                          <Modal.Content>
                            <GhgCalculator handleClose={this.handleClose}/>
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                    </div>
                  }
                  {
                    !this.props.currentUser &&
                    <div>
                      <Grid.Column centered verticalAlign='middle' textAlign='center'>
                        <Button.Group size='huge'>
                          <Button className='landingButton' inverted as={NavLink} exact to="/signin"
                                  key='login'>Login</Button>
                          <Button.Or/>
                          <Button className='landingButton' inverted as={NavLink} exact to="/signup" key='signup'>Sign
                            up</Button>
                        </Button.Group>
                        <br/>
                        <Button className='landingButton' onClick={this.handleOpen}>Test out the GHG Calculator</Button>
                        <Modal
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            closeIcon
                        >
                          <Modal.Header>
                            GHG Calculator
                          </Modal.Header>
                          <Modal.Content>
                            <GhgCalculator handleClose={this.handleClose}/>
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                    </div>
                  }
                </Grid.Row>
              </Grid>
            </div>
          </Grid>
          <div>
            <Grid className='description-section' textAlign='left' container>
              <Grid.Row className='description-header'>
                What does Project Malama offer?
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
          </div>
        </Container>
    );
  }
}

/** Declare the types of all properties. */
Landing.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components.
 https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LandingContainer);
