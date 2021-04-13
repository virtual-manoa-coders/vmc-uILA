import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Header, Segment, Grid, Icon, Divider, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const checkForNoData = (data, metric) => {
  const returnString = '';
  if (data === 'No Data') {
    return returnString.concat('0', ' ', metric);
  }

  return returnString.concat(data.toString(), ' ', metric);
};

export const TextHeader = (props) => {
  const { textSize, textAlign, textStyle, textWeight, as, inverted, children } = props;
  const { fontFamily } = textStyle;
  const headerStyle = {
    fontFamily: fontFamily,
    fontSize: textSize,
    fontWeight: textWeight,
  };
  return <Header style={headerStyle} inverted={inverted || false} textAlign={textAlign || 'left'} as={as}>{children}</Header>;
};

// so this somehow works? i guess react didn't liked me today
TextHeader.propTypes = {
  textSize: PropTypes.number,
  textAlign: PropTypes.string,
  textStyle: PropTypes.object.isRequired,
  textWeight: PropTypes.any,
  as: PropTypes.string,
  inverted: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

const ValueDifference = ({ userData, communityData, textStyle, metric, inverted }) => {
  let difference = (userData - communityData).toFixed(2);
  let color = 'yellow';
  let icon = 'circle';
  if (Number.isNaN(difference)) {
    difference = 0;
  }

  let userGreaterThanCommunity = Math.sign(difference) > 0;

  if (userGreaterThanCommunity) {
    icon = 'arrow up';
  } else if (!userGreaterThanCommunity) {
    icon = 'arrow down';
  }

  if (inverted) {
    userGreaterThanCommunity = !userGreaterThanCommunity;
  }

  if (userGreaterThanCommunity) {
    color = 'green';
  } else if (!userGreaterThanCommunity) {
    color = 'red';
  }

  return (
      <Grid textAlign='right' columns={2}>
        <Grid.Column floated='right'>
          <Grid.Row>
            <Header as='h1' textAlign='right' floated='right' style={textStyle} color={color}>
              <Icon fitted size='small' name={icon} color={color}/>
              <Header.Content>
                {Math.abs(difference)}
              </Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <TextHeader textSize={21} inverted={true} textAlign={'right'} textStyle={textStyle} as={'h3'}>
              vs community
            </TextHeader>
          </Grid.Row>
          <Grid.Row>
            <TextHeader textSize={12} inverted={true} textAlign={'right'} textStyle={textStyle} as={'h3'}>
              { checkForNoData(communityData, metric) } average
            </TextHeader>
          </Grid.Row>
        </Grid.Column>
      </Grid>
  );
};

ValueDifference.propTypes = {
  textStyle: PropTypes.object.isRequired,
  userData: PropTypes.number.isRequired,
  communityData: PropTypes.number.isRequired,
  metric: PropTypes.string,
  inverted: PropTypes.bool,
};

class ComparisonChart extends React.Component {
  render() {
    return (
        <Grid container={this.props.container}>
          <Grid.Column>
            <Grid.Row>
              <Segment style={{ borderRadius: '20px 20px 0px 0px', backgroundColor: '#54678F', boxShadow: '0px 7px 10px 1px #A3A3A3' }} size={'large'} inverted>
                <Grid columns={3} verticalAlign='middle' padded='horizontally' container>
                  <Grid.Row>
                    <Grid.Column floated='left' verticalAlign='middle'>
                      <TextHeader textAlign={'left'} inverted={true} textStyle={this.props.textStyle} as={'h1'} textSize={40}>
                        <Icon name={this.props.icon}/> {this.props.metricName}
                      </TextHeader>
                    </Grid.Column>
                    <Grid.Column floated='left'>
                      <TextHeader textAlign={'left'} inverted={true} textStyle={this.props.textStyle} as={'h3'} textSize={22}>
                        Your Data This Week
                        <br/>
                        { checkForNoData(this.props.userData, this.props.metric) }
                      </TextHeader>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                      <Grid.Row>
                        <Grid.Column>
                          <Grid.Row>
                            <ValueDifference userData={this.props.userData} communityData={this.props.communityData}
                                             textStyle={this.props.textStyle} metric={this.props.metric}
                                             inverted={this.props.invertArrowColor}
                            />
                          </Grid.Row>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment padded style={{ borderRadius: '0px 0px 20px 20px', boxShadow: '0px 7px 10px 1px #A3A3A3' }}>
                {this.props.children}
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
  icon: PropTypes.string.isRequired,
  metricName: PropTypes.string.isRequired,
  userData: PropTypes.any.isRequired,
  communityData: PropTypes.any.isRequired,
  metric: PropTypes.string,
  container: PropTypes.bool,
  children: PropTypes.any.isRequired,
  invertArrowColor: PropTypes.bool,
};

export default ComparisonChart;
