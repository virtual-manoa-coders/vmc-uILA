import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import Tilt from 'react-parallax-tilt';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/** Renders the Page for adding a document. */
export default class CarComparator extends React.Component {

  render() {
    const gridStyle = { height: '100vh',
      minWidth: '90vw' };
    const imageStyle = { size: 'large' };
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const align = {
      textAlign: 'center',
      color: 'white',
      filter: 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.2))',
      paddingRight: '200px',
      paddingLeft: '200px',
    };

    return (
        <div>
          <Header inverted as="h1" textAlign='center'>Gasoline vs Electric/Hybrid</Header>
          <Grid style={gridStyle} textAlign='center' container columns={2} padded='vertically'>
            <Grid.Column floated='left' width='7' >
              <Slider {...settings}>
                <div>
                  <h2>Toyota Tacoma</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="80%" width="80%" src="/images/tacoma.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Vehicle Cost: $26,250</Header>
                  <Header inverted as="h3">Emissions made: 8.2 tons per year</Header>
                  <Header inverted as="h3">Annual Fuel Cost: $2,050</Header>
                </div>
                <div>
                  <h2>Volkswagen Beetle</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="80%" width="80%" src="/images/buggy.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Vehicle Cost: $24,020</Header>
                  <Header inverted as="h3">Emissions made: 5.1 tons per year</Header>
                  <Header inverted as="h3">Annual Fuel Cost: $1,250</Header>
                </div>
                <div>
                  <h2>Toyota Camry</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="95%" width="95%" src="/images/camry.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Vehicle Cost: $19,395</Header>
                  <Header inverted as="h3">Emissions made: 6.4 tons per year</Header>
                  <Header inverted as="h3">Annual Fuel Cost: $1,600</Header>
                </div>
              </Slider>
            </Grid.Column>
            <div></div>
            <Grid.Column floated='right' width='7'>
              <Slider {...settings}>
                <div>
                  <h2>Tesla Model 3</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="80%" width="80%" src="/images/tesla.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Electric Vehicle Cost: $35,000</Header>
                  <Header inverted as="h3">Fuel Saved Per Year: $850</Header>
                  <Header inverted as="h3">State Discounts: N/A</Header>
                </div>
                <div>
                  <h2>Toyota Prius</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="80%" width="80%" src="/images/prius.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Electric Vehicle Cost: $27,600 </Header>
                  <Header inverted as="h3">Fuel Saved Per Year: $750</Header>
                  <Header inverted as="h3">State Discounts: Possible Tax Break</Header>
                </div>
                <div>
                  <h2>Nissan Leaf</h2>
                  <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={'10'} tiltMaxAngleY={'10'}
                        style={imageStyle}>
                    <Image height="80%" width="80%" src="/images/leaf.png" centered/>
                  </Tilt>
                  <Header inverted as="h3">Electric Vehicle Cost: $29,990 </Header>
                  <Header inverted as="h3">Fuel Saved Per Year: $750</Header>
                  <Header inverted as="h3">State Discounts: Possible Tax Break</Header>
                </div>
              </Slider>
            </Grid.Column>
            {/* <Grid.Column> */}
            {/*  <div style={align}> */}
            {/*    <Header inverted as="h3">Electric Vehicle Cost</Header> */}
            {/*    <p> */}

            {/*    </p> */}
            {/*    <Header inverted as="h3">Fuel saved</Header> */}
            {/*    <p> */}

            {/*    </p> */}
            {/*    <Header inverted as="h3">State Discounts</Header> */}
            {/*    <p> */}

            {/*    </p> */}
            {/*  </div> */}
            {/* </Grid.Column> */}
          </Grid>
        </div>
    );
  }
}
