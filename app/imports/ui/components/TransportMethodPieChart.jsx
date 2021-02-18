import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Pie } from '@reactchartjs/react-chart.js';
import moment from 'moment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TransportMethodPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  userTransportAggregate(timeSpan) {
    // filter data to today's date
    const afterDateAndCar = this.props.userTransportation.filter(doc => doc.date > timeSpan);
    if (afterDateAndCar.length === 0) {
      return 'No Data';
    }
    // reduce array to the transport property
    const transportMethod = afterDateAndCar.map(doc => doc.transport);
    // count the occurance of each type of transport
    const dataArray = [0, 0, 0, 0, 0, 0]; // gosh darn imutable data paradigm
    transportMethod.forEach(doc => {
      console.log(dataArray);
      switch (doc) {
        case 'Telecommute':
          dataArray[0] += 1;
          break;
        case 'Walk':
          dataArray[1] += 1;
          break;
        case 'Bike':
          dataArray[2] += 1;
          break;
        case 'Carpool':
          dataArray[3] += 1;
          break;
        case 'Bus':
          dataArray[4] += 1;
          break;
        case 'Car':
          dataArray[5] += 1;
          break;
        default:
          console.log('Error: Unexpected transport type');
          break;
      }
    });
    // return an array of the number of each transport
    const result = dataArray;
    return result;
  }

  render() {
    // console.log(this.props.userTransportation);
    // console.log(this.userTransportAggregate(moment().subtract(1, 'years')));
    const data = {
      labels: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
      datasets: [
        {
          label: '# of Transport',
          data: this.userTransportAggregate(this.props.timeSpan),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };

    return (
          <Pie data={data} />
    );
  }
}

/** Require a document to be passed to this component. */
TransportMethodPieChart.propTypes = {
  userTransportation: PropTypes.array.isRequired,
  timeSpan: PropTypes.object.isRequired,
};

export default TransportMethodPieChart;
