import React from 'react';
import { makeStyles } from '@materia-ui/core.styles';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cx from 'classnames';
import Functions from './Functions.jsx';
import { GridColumn, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * A class of cards that will be used to display information on the dashboard.
 * This is a general overview of the cards that will be displayed. Each individual card will have its own data that extends from this class. 
 */
class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  /** Styling components **/
  render() {
    let {
        ghgReduced,
        vmtReduced,
        gasSaved,
        telecommute,
        bikedToWork
    } = this.props;

    const cardStyle = {
      "display": 'flex',
      "min-width": 'auto',
      "width": '24rem',
      "height": '14rem',
      "font-family": 'Roboto',
      "padding": '1cm',
    };

    return(
        <div style={cardStyle}>
          // <!-- Pretty sure this is an error, need to change the stackable content-->
        <Grid stackable={equal}>
          <Grid.Row>
            <div style={cardStyle}>
              <!-- This will be the amount of Green Houses Gases Reduced by the user-->
              <!-- Need to add the meta data that will pull from the GHG Reduced-->
              <Card
                header={GHGReduced}
                description={[
                    'This is the amount of green house gas you have reduced',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              <!-- This is the amount of vehicles miles traveled by the user -->
              <Card
                header={VMTReduced}
                description={[
                    'This is the amount of vehicle miles traveled you have reduced',
                ].join('')}
                />
            </div>
            <div style={cardStyle}>
              //This is the amount of gas saved by the user
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
                    'These are the days you chose to stay at home and teleworked'
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
};

export default Cards;
