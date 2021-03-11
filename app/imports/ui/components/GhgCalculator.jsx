import React from 'react';
import { Container, Segment, Form } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class GhgCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputMPG: '',
      inputVMT: '',
    };
    this.handleMPGChange = this.handleMPGChange.bind(this);
    this.handleVMTChange = this.handleVMTChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** Function that calculates gallons of fuel consumed and CO2 emissions */
  calculateGHG = function () {
    const gasConsumed = ((this.state.inputVMT) / (this.state.inputMPG)).toFixed(6);
    return (gasConsumed * 19.59).toFixed(2);
  }

  calculateResults = () => {
    this.setState({
      show: true,
    });
  }

  handleSubmit = (e) => {
    // eslint-disable-next-line no-console
    console.log('inputMPG:', this.state.inputMPG);
    console.log('inputVMT:', this.state.inputVMT);
    console.log('input GHG:', this.calculateGHG());
    e.preventDefault();
  }

  handleMPGChange = (e) => {
    this.setState({
      inputMPG: e.target.value,
    });
  }

  handleVMTChange = (e) => {
    this.setState({
      inputVMT: e.target.value,
    });
  }

  render() {
    return (
        <Container>
          {/* <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2' inverted>GHG Calculator</Header> */}
          <Segment className='ghg-form'>
            <Form onSubmit={this.handleSubmit} size='small'>
              <Form.Group>
                <Form.Input
                    placeholder='Enter miles per gallon'
                    value={this.state.inputMPG}
                    onChange={this.handleMPGChange}
                    width={4}
                />
                <br/>
                <Form.Input
                    placeholder='Enter miles traveled'
                    value={this.state.inputVMT}
                    onChange={this.handleVMTChange}
                    width={4}
                />
                <Form.Button onClick={this.calculateResults} content='Calculate'/>
              </Form.Group>
            </Form>
            {this.state.show &&
            (
                <p className='ghg-results'>{this.calculateGHG()} pounds of CO2 is emitted from
                  traveling {this.state.inputVMT} miles with a vehicle
                  averaging {this.state.inputMPG} MPG.</p>
            )}
          </Segment>
        </Container>
    );
  }
}

/** Require an array of userInfo documents in the props. */
GhgCalculator.propTypes = {
  currentUser: PropTypes.string,
};

const GhgCalculatorContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GhgCalculator);

export default withRouter(GhgCalculatorContainer);
