import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './home.css';
import sd_voting from "../../images/stonemandouglas_voting.jpeg";
import h_divest from "../../images/harvard_divest.jpg";
import usc_protests from "../../images/usc_protests.jpg";
import texting from "../../images/texting.jpg";
import dems_event from "../../images/dems_event.jpeg";

class Home extends Component {
  render() {
    return (
      <>

      <Grid container spacing={24} className="landing blue" >
          <Grid item xs={8}>
            <div >
              <h1 className="heading">Student Votes <br/>Can Effect Change</h1>
              <div className="subheading">However, less than a third of college students go to the polls.
              <br/> <i>Together we can change that.</i></div>
            </div>
          </Grid>

          <Grid item xs={3} style={{'paddingLeft' : '30px'}}>
            <img src={sd_voting} style={{'width': '100%', 'margin': '5px'}}/>
            <img src={h_divest} style={{'width': '100%', 'margin': '5px'}}/>
            <img src={usc_protests} style={{'width': '100%', 'margin': '5px'}}/>
          </Grid>
          <Grid item xs={1}></Grid>
      </Grid>

      <Grid container spacing={0} style={{"height":"100vh"}}>
        <Grid item xs={4} style={{"background": "#FF7F11", 'padding': "5em", 'color': 'white', "marginRight": "None"}}>
          <b style={{'fontSize':'20px'}}>We believe that colleges need to have a culture of voting.</b>
          <br/><br/>
          The only way that this culture can be promoted is through the actions of individual college
          students, working together to cultivate a spirit of excitement about participating in
          our democracy.
          <br/><br/>
          Learn what you can do through <b>*insert name here*</b> to help us with that goal.
        </Grid>
        <Grid item xs={4}>
          <div style={{'height':"48%", "padding": "none", 'background': '#FFB06B'}}>
            <img src={texting} style={{"width": "100%"}} />
          </div>
          <div style={{'height':"52%", "padding": "2.5em", 'background': '#FFB06B'}}>
            <b>Text your friends</b> <br/><br/>
            Send out reminders
            to all of your contacts, reminding them of upcoming
            deadlines, resources available to help them get to the polls, and more!
            <br/>
            Our product allows you to both start the conversation and continue it, all on one easy
            and convenient platform.
          </div>


        </Grid>
        <Grid item xs={4}>

            <div style={{'height':"53%", "padding": "2.5em", 'background': '#FF9942', "paddingTop":"3.5em"}}>
              <b>Attend Events in your Community</b> <br/><br/>
              Browse through a compiled list of events in your community, ranging from talks with local
              elected officials, to information sessions about canvassing trips, to debates over
              relevant pressing issues, and more. These events are intended to help people participate
              more fully in the democratic process, and be more informed voters.<br/><br/>


            </div>
            <div style={{'height':"47%", "padding": "none", 'background': '#FF9942', 'positition': 'relative', 'bottom': '0px'}}>
              <img src={dems_event} style={{"width": "100%"}} />
            </div>

        </Grid>
      </Grid>

      </>

    );
  }
}

export default Home;
