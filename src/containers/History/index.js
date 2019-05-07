import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import {MdLiveHelp, MdSend} from 'react-icons/md';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button';
import './messages.css';

class Name extends Component {
  // changeName(props) {
  //   // document.getElementById("current-convo").innerHTML =  props.label;
  //   console.log("clicked");
  //   console.log(props.label);
  //
  // }
  render() {
    return (
      <div>
        <button className="contact paddingleft" onClick={this.props.onClick}
        value={this.props.label}>{this.props.label}</button>
        </div>
    )
  }
}

class Names extends Component {
  createTable(){
      let table = []

      // Outer loop to create parent
      for (let i = 0; i < 20; i++) {
        // let children = []
        // //Inner loop to create children
        // for (let j = 0; j < 5; j++) {
        //   children.push(<td>{`Column ${j + 1}`}</td>)
        // }
        // //Create the parent and add the children
        const labelname = "Contact Name " + i
        table.push(<Name label={labelname} onClick={this.props.onClick}/>)
      }
      return table
  }
  render() {

    return (
      <div>
        {this.createTable()}
        </div>
    )
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
    )
  }
}

class Conversation extends Component {
  render() {
    return (
      <header className="templates">
        <a href="#" class="float">
          <MdLiveHelp size="2em"/>
        </a>
        <a href="#" class="float2">
          <MdSend size="2em"/>
        </a>
        <input
          className="field"
          id='message'
          type="text"
          placeholder="type a message here or press the blue help button for some suggestions"
        />
        <div style={{'textAlign': 'right'}}>
        <div className="sent message">
        Hello this is the first message that was sent. It is a slightly longer message, but hopefully it should still
        look nice when displayed on the screen.
        </div>
        <br/>
        time stamp
        </div>
        <br/>
        <div className="received message">
        This is the response
        </div>
        <br/>
        <div className="received message">
        This is the followup response
        </div>

      </header>
    )
  }
}


const mql = window.matchMedia(`(min-width: 800px)`);

class History extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false,
        height: 0,
        contactChosen: "Contact Name",
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

    chooseContact(event) {
      this.setState({contactChosen: event.target.value});
    }
  render() {
    return(
      <Sidebar
      sidebar={ <Names onClick={this.chooseContact.bind(this)}/> }
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
          backgroundColor: 'white',
          color: 'grey'
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
      }}>

      <div className="App">
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <Conversation />
          </Grid>
          <Grid item xs={3} className="sideinfo">
            <div style={{'textAlign':'center', 'paddingLeft': '10px', 'paddingTop': '40px'}}>
              <div className="contact-icon" onClick={this.chooseContact.bind(this)}>FL</div> <br/>
              <b id="current-convo">{this.state.contactChosen}</b> <br/><br/>
              Registered to vote? <br/>
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
