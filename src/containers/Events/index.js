import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "./events.css";
import Client from "../../client";

class Event extends Component {
  render() {
    return (
      <div className="event">
        <Grid container spacing={24}>
          <Grid item xs={4} md={2}>
            <div className="date">
              <b style={{ color: "#FF7F11" }}>
                {" "}
                {this.props.weekday.toUpperCase()}{" "}
              </b>
              <br />
              {this.props.date} <br />
              {this.props.time}
            </div>
          </Grid>
          <Grid item xs={8} md={10}>
            <b>{this.props.name}</b> <br />
            <i>{this.props.location}</i>
            <br />
            {this.props.description} <br />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// class

const mql = window.matchMedia(`(min-width: 800px)`);

class Events extends Component {
  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      height: 0,
      contactChosen: 0,
      events: []
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    this.client.get("/events").then(events => {
      events.sort(function(a, b) {
        return moment(a.date).diff(b.date);
      });
      this.setState({ events });
    });
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
    this.setState({ height: window.innerHeight });
  }

  render() {
    console.log(this.state);
    const { events } = this.state;
    return (
      <div className="events">
        <b style={{ fontSize: "45px", marginTop: "0px" }}> Events Near You </b>
        <br />
        <br />
        {events.map(event => (
          <Event
            name={event.title}
            location={event.location}
            weekday={moment(event.date)
              .format("dddd")
              .toString()}
            date={moment(event.date)
              .format("MMMM Do YYYY")
              .toString()}
            time={event.time}
            description={event.description}
          />
        ))}
      </div>
    );
  }
}

export default Events;
