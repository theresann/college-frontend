import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import Grid from '@material-ui/core/Grid';
import './events.css';

class Event extends Component {
  render() {
    return (
      <div className="event">
        <Grid container spacing={24}>
          <Grid item xs={4} md={2}>
            <div className="date">
              <b style={{'color': '#FF7F11'}}> {this.props.weekday.toUpperCase()} </b><br/>
              {this.props.date} <br/>
              {this.props.time}
            </div>
          </Grid>
          <Grid item xs={8} md={10}>
              <b>{this.props.name}</b> <br/>
              <i>{this.props.location}</i><br/>
              {this.props.description} <br/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

// class

const mql = window.matchMedia(`(min-width: 800px)`);

class Events extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false,
        height: 0,
        contactChosen: 0,
      };

      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
      mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
      mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    updateWindowDimensions() {
      this.setState({height: window.innerHeight });
    }

  render() {

    return (
            <div className='events'>
            <b style={{'fontSize': '45px', 'marginTop': '0px'}}> Events Near You </b><br/><br/>
            <Event  name="Phone Banking for Candidate"
                    location="Shorenstein Center"
                    weekday="Monday"
                    date="May 6, 2019"
                    time="5-7pm"
                    description="This is a short description of the event, which tells you
                    what the premise of the event is, and perhaps why you should go. It should also
                    include any other logistical details that you might need to know in order to attend." />

            <Event  name="Meet the Candidates for UC President"
                    location="Sever Hall 101"
                    weekday="Thursday"
                    date="May 9, 2019"
                    time="3-4pm"
                    description="This is a short description of the event, which tells you
                    what the premise of the event is, and perhaps why you should go. It should also
                    include any other logistical details that you might need to know in order to attend." />
            </div>
    )
  }
}

export default Events;
