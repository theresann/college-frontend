import React, { Component } from 'react';
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

class Password extends Component {
  render(){
    return(
      <input
        className="formfield"
        id={this.props.id}
        type="password"
        placeholder={this.props.placeholder}
        minlength="8"
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
          <a href="/">Already have an account? Click here to login </a>
          <br/><br/>
          <Grid container spacing={16}>
            <Grid item xs={6}><Field id="first" placeholder="first name" /></Grid>
            <Grid item xs={6}><Field id="last" placeholder="last name" /></Grid>
          </Grid>
          <Field id="email" placeholder="email address" />
          <Field id="phone" placeholder="phone number" />
          <Field id="school" placeholder="college affiliation" />
          <Grid container spacing={16}>
            <Grid item xs={6}><Password id="password" placeholder="new password" /></Grid>
            <Grid item xs={6}><Password id="password" placeholder="confirm password" /></Grid>
          </Grid>

          Password must be a minimum of 8 characters. <br/>

          <Button variant="primary" className="submit" value="submit">Create Account</Button> <br/>

        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    )

  }
}

export default CreateAccount;
