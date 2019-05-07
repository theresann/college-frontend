import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { MdLiveHelp, MdSend } from "react-icons/md";
import Grid from "@material-ui/core/Grid";
import Button from "react-bootstrap/Button";
import "./messages.css";
import Client from "../../client";

class Name extends Component {
  render() {
    return (
      <div>
        <button
          className="contact paddingleft"
          onClick={() => this.props.update(this.props.identify)}
        >
          {this.props.label}
        </button>
      </div>
    );
  }
}

class Names extends Component {
  createTable() {
    const table = this.props.contacts.map(contact => (
      <Name
        label={contact.first + " " + contact.last}
        onClick={this.props.onClick}
        identify={contact.number}
        update={this.props.updatefunc}
      />
    ));
    return table;
  }
  render() {
    return <div>{this.createTable()}</div>;
  }
}

class RadioButton extends Component {
  render() {
    return (
      <div className="form-check">
        <label>
          <input
            type="radio"
            name="react-tips"
            value="option1"
            // checked={this.state.selectedOption === "option1"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          {this.props.content}
        </label>
      </div>
    );
  }
}

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = {
      filteredmessages: [],
      number: ''
    }
  }

  componentDidMount() {
    if (this.props.chosen !== "") {
      const filtered = this.props.messages.filter(message => {
        return message.sender === this.props.chosen || message.recepient === this.props.chosen
      })
      this.setState({filteredmessages: filtered})
    }
  }
  
  render() {
    return (
      <header className="templates">
        <a href="#" class="float">
          <MdLiveHelp size="2em" />
        </a>
        <a href="#" class="float2">
          <MdSend size="2em" />
        </a>
        <input
          className="field"
          id="message"
          type="text"
          placeholder="type a message here or press the blue help button for some suggestions"
        />
        <div style={{ textAlign: "right" }}>
          <div className="sent message">
            Hello this is the first message that was sent. It is a slightly
            longer message, but hopefully it should still look nice when
            displayed on the screen.
          </div>
          <br />
          time stamp
        </div>
        <br />
        <div className="received message">This is the response</div>
        <br />
        <div className="received message">This is the followup response</div>
      </header>
    );
  }
}

const mql = window.matchMedia(`(min-width: 800px)`);

class History extends Component {
  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      height: 0,
      contactChosen: "",
      contacts: [],
      messages: []
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

  componentDidMount() {
    this.client.get("/contacts").then(contacts => this.setState({ contacts }));
    this.client.get("/messages").then(messages => this.setState({ messages }));
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

  chooseContact(event) {
    console.log(event.target.value);
    this.setState({ contactChosen: event.target.value });
  }

  updatefunc = chosen => this.setState({ contactChosen: chosen });

  render() {
    
    const { contactChosen, contacts, messages } = this.state;
    return (
      <Sidebar
        sidebar={
          <Names
            updatefunc={this.updatefunc}
            contacts={contacts}
            onClick={this.chooseContact.bind(this)}
          />
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: {
            zIndex: 2,
            position: "absolute",
            top: 0,
            bottom: 0,
            transition: "transform .3s ease-out",
            WebkitTransition: "-webkit-transform .3s ease-out",
            willChange: "transform",
            overflowY: "auto",
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 51,
            backgroundColor: "white",
            color: "grey"
          },
          content: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            transition: "left .3s ease-out, right .3s ease-out"
          }
        }}
      >
        <div className="App">
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Conversation chosen={contactChosen} messages={messages} />
            </Grid>
            <Grid item xs={3} className="sideinfo">
              <div
                style={{
                  textAlign: "center",
                  paddingLeft: "10px",
                  paddingTop: "40px"
                }}
              >
                <div
                  className="contact-icon"
                  onClick={this.chooseContact.bind(this)}
                >
                  FL
                </div>{" "}
                <br />
                <b id="current-convo">{this.state.contactChosen}</b> <br />
                <br />
                Registered to vote? <br />
                <RadioButton content="yes" />
                <RadioButton content="no" />
              </div>
            </Grid>
          </Grid>
        </div>
      </Sidebar>
    );
  }
}

export default History;
