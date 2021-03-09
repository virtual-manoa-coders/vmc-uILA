import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const state = {
  labels: ['VMT Saved (Miles)',
    'Fuel Saved (Gallons)',
    'CO2 Reduced (Pounds)'
      ],
  datasets: [
    {
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [3]
    }
  ]
}

