import { Grid } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const SectionRepeatable = (props) => {
  const heightStyle = props.heightVH;
  const sectionStyle = {
    // Image effects
    backgroundImage: `url(${props.background})`,
    // center BG
    backgroundRepeat: 'repeat',
    // Misc attributes
    marginTop: props.topMargin,
  };
  return (
      <div style={sectionStyle}>
        <Grid style={{ height: heightStyle }} columns='equal' textAlign='center' verticalAlign='middle' container>
          <Grid.Row style={{ margin: props.childMargin }} columns={1}>
            <Grid.Column>
              {props.children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
  );
};

SectionRepeatable.propTypes = {
  heightVH: PropTypes.string,
  background: PropTypes.string,
  topMargin: PropTypes.string,
  childMargin: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default SectionRepeatable;
