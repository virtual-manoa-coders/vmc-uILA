import React from 'react';
import { Button, Grid, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TransportMethodPieChart from './TransportMethodPieChart';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TransportPieChartWithDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeSpan: moment().subtract(1, 'months') };
  }

  onClick = (time) => {
    this.setState({
      timeSpan: moment().subtract(1, time),
    });
  }

  render() {

    return (
        <div>
          <Grid padded relaxed verticalAlign='middle' columns='equal'>
            <Grid.Row>
              <TransportMethodPieChart userTransportation={this.props.userTransportation} timeSpan={this.state.timeSpan}/>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column centered>
                <Button onClick={() => this.onClick('days')}>Day</Button>
                <Button onClick={() => this.onClick('w')}>Week</Button>
                <Button onClick={() => this.onClick('months')}>Month</Button>
                <Button onClick={() => this.onClick('years')}>Year</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
TransportPieChartWithDates.propTypes = {
  userTransportation: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default TransportPieChartWithDates;
