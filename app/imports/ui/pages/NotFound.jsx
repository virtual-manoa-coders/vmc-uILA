import React from 'react';
import { Container, Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
        <Container id='page-style'>
          <Header as="h2" textAlign="center" inverted>
            <p>Page not found</p>
          </Header>
        </Container>
    );
  }
}

export default NotFound;
