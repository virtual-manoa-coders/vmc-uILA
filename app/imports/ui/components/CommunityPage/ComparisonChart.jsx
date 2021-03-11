import React from 'react';
import { Container, Header, Segment, Grid, Icon, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TransportationMethodPieChart from '../TransportMethodPieChart';

const curvedStyle = { borderRadius: 20 };

const TextHeader = (props) => {
  const { textSize, textAlign, textStyle, textWeight, as, inverted, children } = props;
  const { fontFamily } = textStyle;
  const headerStyle = {
    fontFamily: fontFamily,
    fontSize: textSize,
    fontWeight: textWeight,
  };
  return <Header style={headerStyle} inverted={inverted || false} textAlign={textAlign || 'left'} as={as}>{children}</Header>;
};

// so this somehow works? i guess react god didn't liked me today
TextHeader.propTypes = {
  textSize: PropTypes.number,
  textAlign: PropTypes.string,
  textStyle: PropTypes.object.isRequired,
  textWeight: PropTypes.any,
  as: PropTypes.string,
  inverted: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

class ComparisonChart extends React.Component {
  render() {
    return (
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Segment style={{ borderRadius: '20px 20px 0px 0px' }} size={'large'} inverted color='violet'>
                <Grid columns={3} verticalAlign='middle' padded='horizontally' container>
                  <Grid.Row>
                    <Grid.Column floated='left' verticalAlign='middle'>
                      <TextHeader textAlign={'left'} inverted={true} textStyle={this.props.textStyle} as={'h1'} textSize={40}>
                        <Icon name='cloud'/> GHG GAS
                      </TextHeader>
                    </Grid.Column>
                    <Grid.Column floated='left'>
                      <TextHeader textAlign={'left'} inverted={true} textStyle={this.props.textStyle} as={'h3'} textSize={22}>
                        Your Data This Week
                        <br/>
                        # pounds
                      </TextHeader>
                    </Grid.Column>
                    <Grid.Column floated='right'>

                      <Grid.Row>
                        <TextHeader textSize={22} inverted={true} textAlign={'right'} textStyle={this.props.textStyle} as={'h3'}>
                          <Icon fitted name='arrow up'/> # vs community
                        </TextHeader>
                      </Grid.Row>
                      <Grid.Row>
                        <TextHeader textSize={16} inverted={true} textAlign={'right'} textStyle={this.props.textStyle} as={'h3'}>
                          # pounds average
                        </TextHeader>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment padded style={{ borderRadius: '0px 0px 20px 20px' }}>
                <Grid columns={2} container>
                  <Grid.Column>
                    <Grid.Row>
                      <TransportationMethodPieChart userTransportation={ this.props.userTransportation } timeSpan={moment().subtract(1, 'months')}/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <TextHeader textSize={18} textStyle={this.props.textStyle} as={'h3'}>
                        This is an explanatory text that explains stuff about this metric.
                        Perhaps one could talk about how this metric has impact on the island of
                        Hawaii or discuss a fun fact about
                      </TextHeader>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as={'h4'} style={this.props.textStyle} color='blue'>Learn more</Header>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid>
    );
  }
}

// Problem: prop types check receive undefined if using a functional component
ComparisonChart.propTypes = {
  textStyle: PropTypes.object.isRequired,
};

export default ComparisonChart;
