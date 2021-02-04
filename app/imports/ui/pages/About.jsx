import React from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    const aboutStyle = { marginTop: '10px' };
    return (
        <div>
          <Grid verticalAlign='middle' container style={aboutStyle}>
            <Grid.Row textAlign='center'>
                <Header textAlign='center' className='font-comfortaa' as='h4' inverted>
                  <b className='about-header'>Welcome to uILA!</b>
                  <br/>
                  <p className='font-comfortaa'>
                  uILA is designed by a team of computer science students at University of Hawaii – Manoa, with one goal
                    in mind: to slow the rate of climate change, starting with our local community.</p>
                </Header>
              <Image className='about-image' src='/images/about-background.png' centered/>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <p className='about-font'>
                Transportation related greenhouse gas (GHG) emissions account for 61% of fossil fuel use in Hawaii,
                where cars and light trucks are responsible for 53% of overall transportation related emissions. It is
                necessary for each of us to take more responsibility in our efforts to reduce these emissions that are
                harming our planet. We can start by being more aware of our daily commuting behaviors; instead of
                driving to and from work, consider carpooling, public transportation, bicycling, walking, or switching
                to an electric or hybrid vehicle.
                <br/>
                <br/>
                uILA is an application that allows you to track your daily GHG emissions from transportation related
                activities as well as the amount of saved vehicle miles traveled, saved fuel, and reduced CO2 from
                choosing more environmentally friendly alternatives. You can also compare costs of your current car to a
                greener alternative.
                <br/>
                <br/>
                You are encouraged to log your means of transportation daily (ICEV, EV, carpool, public transportation,
                bicycle, walk, etc.,) and track your weekly, monthly, and annual emissions/savings. Translated data of
                your GHG emissions, saved vehicle miles traveled, saved fuel, and reduced CO2 will be used to provide
                beneficial collective data to all registered users of uILA. Your personal information and logs will not
                be shared with the public.
              </p>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default About;
