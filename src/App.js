import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "react-sidebar";
import Home from './containers/Home/';
import Send from './containers/Send/';
import History from './containers/History/';
import CreateAccount from './containers/CreateAccount';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false
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

    render() {
      return (

        <div>
        <Navbar bg="primary" variant="dark" fixed="top">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/send">Send New Messages</Nav.Link>
            <Nav.Link href="/history">View Message History</Nav.Link>
            <Nav.Link href="/">Events</Nav.Link>
          </Nav>
          <Nav pullright>
            <Nav.Link href="/createaccount">Create Account</Nav.Link>
          </Nav>
        </Navbar>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/send/" component={Send} />
              <Route path="/history/" component={History} />
              <Route path="/createaccount/" component={CreateAccount} />
            </Switch>
          </div>
        </Router>
        </div>

      // </Sidebar>
      // </Navbar>

      );
    }
  }

export default App;
