import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CommunityWhatIfCO2 = (props) => {
  const variable = 'value';

  return (
      <Header>This is a component</Header>
  );
};

CommunityWhatIfCO2.propTypes = {
  requiredData: PropTypes.array.isRequired,
  optionalData: PropTypes.string,
};

export default CommunityWhatIfCO2;
