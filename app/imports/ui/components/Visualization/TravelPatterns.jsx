import React from 'react';
import { Bar } from '@reactchartjs/react-chart.js';

const state = {
    labels: ['Telecommute', 'Walk', 'Bike',
        'Carpool', 'Bus', 'Car'],
    datasets: [
        {
            label: 'Mode of Travel',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 3, 7, 5, 6, 8],
        },
    ],
};

class TravelPatterns extends React.Component {
    render() {
        return (
            <div>
                <Bar
                    data={state}
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
            </div>
        );
    }
}
export default TravelPatterns;
