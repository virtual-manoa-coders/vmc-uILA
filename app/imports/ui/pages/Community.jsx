import React from 'react';
import { Grid, Image, Divider} from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

            <Divider hidden/>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Grid.Row>
                            This is you vs. the average person in your city.
                        </Grid.Row>
                        <Divider hidden/>
                        <Grid.Row>
                            You are doing x% better than the average person in your city.
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Image src='/images/wireframe/centered-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Divider hidden/>

        </Grid>
    );
  }
}

export default Community;
