import React from 'react';
import { Grid, Table, Divider} from 'semantic-ui-react';

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
                        <Table basic definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>You</Table.HeaderCell>
                                    <Table.HeaderCell>Average</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Today</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Week</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Month</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Annual</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                    <Table.Cell>#g</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Divider hidden/>

        </Grid>
    );
  }
}

export default Community;
