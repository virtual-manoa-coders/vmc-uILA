import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EVPercentage = () => {

};


// Return a CO2 produced graph that shows two lines; one is what if a percentage of the community uses this much EV
// Another is the actual CO2 produced in the timeSpan
const CommunityWhatIfCO2 = ({ transportData }) => {
  const variable = 'value';

  console.log(transportData);
  return ( // "As our community move towards EV, you can see the impact on the CO2 produced here"
      <Header>This is a component</Header>
  );
};

CommunityWhatIfCO2.propTypes = {
  transportData: PropTypes.array,
};

export default CommunityWhatIfCO2;
