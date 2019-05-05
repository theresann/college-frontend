import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import './account.css';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button';

class Field extends Component {
  render(){
    return(
      <input
        className="formfield"
        id={this.props.id}
        type="text"
        placeholder={this.props.placeholder}
      />
    )
  }
}

class HalfField extends Component {
  render(){
    const classname = this.props.side=='left' ? "formfield halffield leftfield" : "formfield halffield rightfield";
    return(
      <input
        className= {classname}
        id={this.props.id}
        type="text"
        placeholder={this.props.placeholder}
      />
    )
  }
}

class CreateAccount extends Component {
  render() {
    return(
      <Grid container spacing={24}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{'margin': '25px'}}>
          <b>Create New Account</b> <br/>
          Please fill out all of the fields below. <br/><br/>

          <Grid container spacing={16}>
            <Grid item xs={6}><Field id="first" placeholder="first name" /></Grid>
            <Grid item xs={6}><Field id="last" placeholder="last name" /></Grid>
          </Grid>
          <Field id="email" placeholder="email address" />
          <Field id="phone" placeholder="phone number" />
          <Field id="school" placeholder="college affiliation" />
          <Field id="password" placeholder="enter new password here" />

          <Button variant="primary" className="submit">Create Account</Button> <br/>

          <a href="/">Already have an account? Click here to login </a>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    )

  }
}

export default CreateAccount;
