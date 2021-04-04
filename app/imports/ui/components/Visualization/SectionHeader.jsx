import React from 'react';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { TextHeader } from './ComparisonChart';

export const SectionHeader = ({ container, textStyle, children, inverted }) => <Grid container={container}>
  <Grid.Row>
    <Grid.Column>
      <Divider inverted={inverted} horizontal style={{ color: 'black' }}>
        <TextHeader inverted={inverted} textStyle={textStyle} as='h1' textAlign='center' textSize={27}>
          {children}
        </TextHeader>
      </Divider>
    </Grid.Column>
  </Grid.Row>
</Grid>;

SectionHeader.propTypes = {
  container: PropTypes.bool,
  textStyle: PropTypes.object,
  inverted: PropTypes.string,
  children: PropTypes.any.isRequired,
};
