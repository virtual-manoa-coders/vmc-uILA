// eslint-disable-next-line no-unused-vars
import { Header, Grid } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const Section = (props) => {
  const heightStyle = props.heightVH;
  const sectionStyle = {
    // Image effects
    backgroundImage: `url(${props.background})`,
    // center BG
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
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

Section.propTypes = {
  heightVH: PropTypes.string,
  background: PropTypes.string,
  topMargin: PropTypes.string,
  childMargin: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Section;
