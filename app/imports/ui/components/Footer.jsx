import React from 'react';
import { Container, Header, List, Grid, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
export default class Footer extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#54678F', padding: '5em 0em' };
   return (
        <Segment style={menuStyle}>
        <Container >
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Quick Links' />
                  <List link inverted>
                    <List.Item as={NavLink} activeClassName="active" exact to="/about" key='about'>About</List.Item>
                    <List.Item as={NavLink} activeClassName="active" exact to="/comparator" key='comparator'>Comparator</List.Item>
                    <List.Item as={NavLink} activeClassName="active" exact to="/community" key='community'>Community</List.Item>
                    <List.Item as={NavLink} activeClassName="active" exact to="/dashboard" key='dashboard'>Dashboard</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Related Links' />
                  <List link inverted>
                    <List.Item as='a' href='https://virtual-manoa-coders.github.io/'>Project GitHub page</List.Item>
                    <List.Item as='a' href='https://hei.com/home/default.aspx'>Hawaiian Electric Company</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Project Malama
                  </Header>
                  <p id='footer-text'>
                    We are a student-led group that is focused on using technology to make the world more eco-friendly.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
    );
  }
}
