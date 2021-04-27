import { Grid } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrap a component with a repeatable image background
 * @param heightVH fixed height of the section
 * @param background {imageURL} background image
 * @param topMargin {string} push the section down by topMargin
 * @param childMargin {string} internal margins within the section
 * @param children Components that will be placed inside the section.
 */
const SectionRepeatable = ({ heightVH, background, topMargin, childMargin, children }) => {
  const heightStyle = heightVH;
  const sectionStyle = {
    // Image effects
    backgroundImage: `url(${background})`,
    // center BG
    backgroundRepeat: 'repeat',
    // Misc attributes
    marginTop: topMargin,
  };
  return (
      <div style={sectionStyle}>
        <Grid style={{ height: heightStyle }} columns='equal' textAlign='center' verticalAlign='middle' container>
          <Grid.Row style={{ margin: childMargin }} columns={1}>
            <Grid.Column>
              {children}
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
