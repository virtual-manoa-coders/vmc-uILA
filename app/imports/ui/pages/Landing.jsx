import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
              <Button as={NavLink} exact to="/login" key='login' >Click here to get started</Button>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
