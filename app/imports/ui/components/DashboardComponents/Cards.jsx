import React from 'react';
import Card from '@material-ui/core/Card';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * A class of cards that will be used to display information on the dashboard.
 * This is a general overview of the cards that will be displayed. Each individual card will have its own data that extends from this class. */
class Cards extends React.Component {

  /** Styling components */
  render() {
    const {
        GHGReduced,
        VMTReduced,
        GasSaved,
        Telecommute,
        BikedToWork,
    } = this.props;

    const cardStyle = {
      display: 'flex',
      'min-width': 'auto',
      width: '24rem',
      height: '14rem',
      'font-family': 'Roboto',
      padding: '1cm',
    };

    return (
        <div style={cardStyle}>
        <Grid stackable>
          <Grid.Row>
            <div style={cardStyle}>
              <Card
                header={GHGReduced}
                description={[
                    'This is the amount of green house gas you have reduced',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              <Card
                header={VMTReduced}
                description={[
                    'This is the amount of vehicle miles traveled you have reduced',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              <Card
                header={GasSaved}
                description={[
                    'This is the amount of gas you have saved',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              <Card
                header={Telecommute}
                description={[
                    'These are the days you chose to stay at home and teleworked',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              <Card
                header={BikedToWork}
                description={[
                    'This is how may days you biked to work',
                ].join('')}
                />
            </div>
          </Grid.Row>
        </Grid>
        </div>
        );
  }
}

Cards.propTypes = {
  userData: PropTypes.string,
  GHGReduced: PropTypes.string,
  VMTReduced: PropTypes.string,
  Telecommute: PropTypes.string,
  GasSaved: PropTypes.string,
  BikedToWork: PropTypes.string,
};

export default Cards;
