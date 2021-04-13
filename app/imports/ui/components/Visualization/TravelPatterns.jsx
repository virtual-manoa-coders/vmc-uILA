import React from 'react';
import { Bar } from '@reactchartjs/react-chart.js';
import PropTypes from 'prop-types';

class TravelPatterns extends React.Component {
    /**
     * Change the chart's display based on a given preset
     * @param data The transport data from this.props
     * @param timeSpan Only select data from today to the timespan
     * @returns a data to use for the pie chart component
     */
    barChartPreset(data, timeSpan) {
        return {
            labels: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
            datasets: [
                {
                    label: '# of Transport',
                    data: this.travelPatternsFunction(data, timeSpan),
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                },
            ],
        };
    }

    render() {
        return (
                <Bar
                    data={this.barChartPreset(this.props.userTransportation, this.props.timeSpan)}
                    options={{
                        title: {
                            display: true,
                            text: 'Your Travel Patterns',
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        },
                    }}
                />
        );
    }
}

TravelPatterns.propTypes = {
    userTransportation: PropTypes.array.isRequired,
    timeSpan: PropTypes.object.isRequired,
};

export default TravelPatterns;
