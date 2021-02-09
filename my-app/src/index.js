import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import { Header, Container, Menu, Image, Grid, Table } from 'semantic-ui-react';

class TopBar extends React.Component {
    render() {
        return (
                <Menu borderless>
                    <Container fluid className='topBar'>
                        <Menu.Item position='left'><Image className="logoimg" src="logo.png"/></Menu.Item>
                        <Menu.Item id='menuItem'>home</Menu.Item>
                        <Menu.Item id='menuItem'>compare cars</Menu.Item>
                        <Menu.Item id='menuItem'>about us</Menu.Item>
                        <Menu.Item id='menuItem'>donate</Menu.Item>
                        <Menu.Item id='menuItem'>my impact</Menu.Item>
                        <Menu.Item id='menuItem'>log out</Menu.Item>
                    </Container>
                </Menu>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className='body'>
                <Container className='cont1'>
                    <p id='header'>username1's emissions</p>
                    <Grid fluid column={3} className='emissionStats'>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <p id='number'>435</p>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <p id='number'>100,304</p>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <p id='number'>4.5</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={5}>
                                <header>average daily emissions</header>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <header>projected lifetime emissions</header>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <header>eco-friendliness rating</header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Container className='cont2'>
                    <p id='header'>emission history</p>
                    <table id="tableContent">
                        <tr>
                            <th>date</th>
                            <th>transportation</th>
                            <th>distance (miles)</th>
                            <th>emission</th>
                        </tr>
                        <tr>
                            <td>01/30/2021</td>
                            <td>personal car</td>
                            <td>1.2</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>01/29/2021</td>
                            <td>personal car</td>
                            <td>1.2</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>01/27/2021</td>
                            <td>car pool</td>
                            <td>3.8</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>01/27/2021</td>
                            <td>walking</td>
                            <td>0.8</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>01/26/2021</td>
                            <td>personal car</td>
                            <td>1.2</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>01/24/2021</td>
                            <td>bus</td>
                            <td>1.2</td>
                            <td>5</td>
                        </tr>
                    </table>
                </Container>
            </div>
        );
    }
}

class Content2 extends React.Component {
    render() {
        return (
            <div className='table'>
                <Table id='table' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>date</Table.HeaderCell>
                            <Table.HeaderCell>distance (miles)</Table.HeaderCell>
                            <Table.HeaderCell>transportation</Table.HeaderCell>
                            <Table.HeaderCell>emission</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>01/30/21</Table.Cell>
                            <Table.Cell>1.2</Table.Cell>
                            <Table.Cell>personal car</Table.Cell>
                            <Table.Cell>25</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>01/28/21</Table.Cell>
                            <Table.Cell>1.2</Table.Cell>
                            <Table.Cell>personal car</Table.Cell>
                            <Table.Cell>25</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>01/27/21</Table.Cell>
                            <Table.Cell>5.5</Table.Cell>
                            <Table.Cell>car pool</Table.Cell>
                            <Table.Cell>38</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>01/27/21</Table.Cell>
                            <Table.Cell>0.5</Table.Cell>
                            <Table.Cell>walking</Table.Cell>
                            <Table.Cell>0</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}



class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                FOOTER GOES HERE
            </div>
        );
    }
}


class PersonalImpact extends React.Component {
    render() {
        return(
            <div>
                <TopBar/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(
    <PersonalImpact/>
  , document.getElementById('root')
);
