import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { TextHeader } from './ComparisonChart';

export const SectionHeader = (props) => <Grid container={props.container}>
  <Grid.Row>
    <Grid.Column>
      <Segment style={{ borderRadius: '20px 20px 20px 20px' }} size={'large'} inverted color='violet'>
        <TextHeader textStyle={props.textStyle} inverted as='h1' textAlign='center' textSize={27}>
          {props.children}
        </TextHeader>
      </Segment>
    </Grid.Column>
  </Grid.Row>
</Grid>;

SectionHeader.propTypes = {
  container: PropTypes.bool,
  textStyle: PropTypes.object,
  children: PropTypes.any.isRequired,
};
