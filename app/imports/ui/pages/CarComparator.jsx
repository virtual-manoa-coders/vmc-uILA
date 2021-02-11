import React from 'react';
import { Grid, Segment, Header, Image, GridColumn } from 'semantic-ui-react';
import Tilt from 'react-parallax-tilt';

/** Renders the Page for adding a document. */
export default class CarComparator extends React.Component {

  render() {
    const gridStyle = { height: '100vh' };
    const imageStyle = { size: 'large' };
    const align = {
      textAlign: 'center',
      color: 'white',
      filter: 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.2))',
      paddingRight: '25px',
      paddingLeft: '25px',
    };
    return (
        <div>
          <Header inverted as="h1" textAlign='center'>Compare Vehicles to Electric Vehicles</Header>
          <Grid style={gridStyle} textAlign='center' container columns={2}>
            <Grid.Row>
              <Grid.Column width={8}>
                <h1 textAlign='center'>Toyota Tacoma</h1>
                <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'8'} tiltMaxAngleY={'8'}
                      style={imageStyle}>
                  <Image height="80%" width="80%" src="/images/tacoma.png" centered/>
                </Tilt>
              </Grid.Column>
              <Grid.Column width={8}>
                <ul>
                  <li>Emissions</li>
                  <li>Gas Cost</li>
                  <li>Total Cost</li>
                </ul>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <h1 textAlign='center'>Tesla Model 3</h1>
                <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'8'} tiltMaxAngleY={'8'}
                      style={imageStyle}>
                  <Image height="80%" width="80%" src="/images/tesla.png" centered/>
                </Tilt>
              </Grid.Column>
              <Grid.Column width={8}>
                <ul>
                  <li>Emissions</li>
                  <li>Gas Cost</li>
                  <li>Total Cost</li>
                </ul>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}
