import React from 'react';
import { Bar } from '@reactchartjs/react-chart.js';
import PropTypes from 'prop-types';
import { travelPatternsFunction } from './Functions';

class TravelPatterns extends React.Component {
    /**
     * Change the chart's display based on a given preset
     * @param data The transport data from this.props
     * @param startDate Only select data from today to the timespan
     * @returns a data to use for the bar chart component
     */
    barChartPreset(data, startDate) {
        return {
            labels: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
            datasets: [
                {
                    label: '# of Transport',
                    data: travelPatternsFunction(data, startDate),
                    backgroundColor: [
                        'rgba(255, 110, 144, 0.2)',
                        'rgba(255, 189, 89, 0.2)',
                        'rgba(255, 245, 90, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                    ],
                    borderWidth: 1,
                }],
        };
    }

    render() {
        return (
                <Bar
                    data={this.barChartPreset(this.props.userTransportation, this.props.timeSpan)}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMax: 30,
                                },
                            }],
                        },
                        title: {
                            display: true,
                            text: 'Your Travel Patterns',
                            fontSize: 20,
                        },
                        legend: {
                            display: false,
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
