import React, { Component } from "react";
import Sidebar from "react-sidebar";
import Button from "react-bootstrap/Button";
import Client from "../../client";

class CheckBox extends Component {
  render() {
    return (
      <div className="form-check contact">
        <label>
          <input
            type="checkbox"
            name="react-tips"
            value="option1"
            // checked={this.state.selectedOption === "option1"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <b> {this.props.label} </b> <br />
          <i className="tab">{this.props.number}</i>
          <br />
        </label>
      </div>
    );
  }
}

class Contacts extends Component {
  createTable() {
    let table = [];
    table = this.props.contacts.map(contact => {
      const labelname = contact.first + " " + contact.last;
      return <CheckBox label={labelname} number={contact.number} />;
    });
    return table;
  }
  render() {
    return <div>{this.createTable()}</div>;
  }
}

const mql = window.matchMedia(`(min-width: 800px)`);

class Send extends Component {
  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      message: "",
      messagecust: "",
      selected: "",
      contacts: [],
      checked: []
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
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handleOptionChange = event => {
    this.setState({ selected: event.target.value });
    if (event.target.value === "option1") {
      this.setState({
        message:
          "Hey! This is Theresa. I'm texting to ask you whether or not you have registered to vote, or have a plan to vote. The deadline is coming up soon!"
      });
    } else if (event.target.value === "option2") {
      this.setState({
        message:
          "Hey there! This is Joon. Have you registered to vote yet? Let me know if you have, and if you haven't I can send you some resources to help you register. The deadline is coming up soon!"
      });
    }
  };

  handleInputchange = event => {
    this.setState({ messagecust: event.target.value });
  };

  updatefunc = update => this.setState({ update });

  handleSubmit = () => {
    if (this.state.selected === "option3") {
      const message = {message: {sender: "7864530707", recepient: "7863955474", content: this.state.messagecust}}
      this.client.post('/twilio/send', message).then(message => {
        if (message.id) {
          window.alert("Message Successfully Sent!")
        }
      })
    } else {
      const message = {message: {sender: "7864530707", recepient: "7863955474", content: this.state.message}}
      this.client.post('/twilio/send', message).then(message => {
        if (message.id) {
          window.alert("Message Successfully Sent!")
        }
      })
    }
  };

  render() {
    const { contacts, selected, message, messagecust } = this.state;
    return (
      <Sidebar
        sidebar={
          <Contacts
            contacts={contacts}
            onchange={this.handleOptionChange.bind(this)}
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
          <header className="templates">
            <b style={{ color: "#FF7F11", textAlign: "center" }}>
              Choose from one of the templates below, or write your own custom
              message:
            </b>
            <br /> <br />
            <div className="form-check contact template">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="option1"
                  checked={selected === "option1"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                Hey! This is Theresa. I'm texting to ask you whether or not you
                have registered to vote, or have a plan to vote. The deadline is
                coming up soon!
              </label>
            </div>
            <div className="form-check contact template">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="option2"
                  checked={selected === "option2"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                Hey there! This is Joon. Have you registered to vote yet? Let
                me know if you have, and if you haven't I can send you some
                resources to help you register. The deadline is coming up soon!
              </label>
            </div>
            <div className="form-check contact template">
              <label>
                <input
                  type="radio"
                  name="react-tips"
                  value="option3"
                  checked={selected === "option3"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                Enter your custom message here: <br /> <br />
                <input
                  style={{ width: "500px", height: "250px" }}
                  type="text"
                  value={messagecust}
                  onChange={this.handleInputchange}
                />
              </label>
            </div>
            <div className="right">
              <Button variant="outline-primary" onClick={this.handleSubmit}>
                {" "}
                Send to {this.state.numChosen} people
              </Button>
            </div>
          </header>
        </div>
      </Sidebar>
    );
  }
}

export default Send;
