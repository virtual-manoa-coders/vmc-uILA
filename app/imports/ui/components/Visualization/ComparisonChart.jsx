import React from 'react';
import { Container, Header, Segment, Grid, Icon, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

const ValueDifference = (props) => {
  const difference = props.userData - props.communityData;
  let color = 'yellow';
  let icon = 'circle';
  if (Math.sign(difference) > 0) {
    color = 'green';
    icon = 'arrow up';
  } else if (Math.sign(difference) < 0) {
    color = 'red';
    icon = 'arrow down';
  }

  return (
      <Grid textAlign='right' columns={2}>
        <Grid.Column floated='right'>
          <Grid.Row>
            <Header as='h1' textAlign='right' floated='right' style={props.textStyle} color={color}>
              <Icon fitted size='small' name={icon} color={color}/>
              <Header.Content>
                {Math.abs(difference)}
              </Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <TextHeader textSize={23} inverted={true} textAlign={'right'} textStyle={props.textStyle} as={'h3'}>
              vs community
            </TextHeader>
          </Grid.Row>
          <Grid.Row>
            <TextHeader textSize={12} inverted={true} textAlign={'right'} textStyle={props.textStyle} as={'h3'}>
              {props.communityData} {props.metric} average
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
};

class ComparisonChart extends React.Component {
  render() {
    return (
        <Grid container={this.props.container}>
          <Grid.Column>
            <Grid.Row>
              <Segment style={{ borderRadius: '20px 20px 0px 0px' }} size={'large'} inverted color='violet'>
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
                        {this.props.userData} {this.props.metric}
                      </TextHeader>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                      <Grid.Row>
                        <Grid.Column>
                          <Grid.Row>
                            <ValueDifference userData={this.props.userData} communityData={this.props.communityData}
                                             textStyle={this.props.textStyle} metric={this.props.metric}/>
                          </Grid.Row>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment padded style={{ borderRadius: '0px 0px 20px 20px' }}>
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
  userData: PropTypes.number.isRequired,
  communityData: PropTypes.number.isRequired,
  metric: PropTypes.string,
  container: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

export default ComparisonChart;
