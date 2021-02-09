import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' container>

            <Grid padded relaxed verticalAlign='middle'>
                <Grid.Row id='space-row'>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} verticalAlign='middle'>
                        Your monthly emission
                        <Divider hidden/>
                        <img src="/images/emission-example.png" className="ui fluid image"/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Monthly emission in Honolulu
                        <Divider hidden/>
                        <img src="/images/emission-example.png" className="ui fluid image"/>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Divider hidden/>

        </Grid>
    );
  }
}

export default Community;
