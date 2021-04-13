import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const StandardFunctionalComponent = (props) => {
  // eslint-disable-next-line no-unused-vars
  const variable = 'value';

  return (
      <Header>This is a component</Header>
  );
};

StandardFunctionalComponent.propTypes = {
  requiredData: PropTypes.array.isRequired,
  optionalData: PropTypes.string,
};

export default StandardFunctionalComponent;
