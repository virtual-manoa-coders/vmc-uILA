import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const StandardFunctionalComponent = (props) => {
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
