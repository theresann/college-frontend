import React, { Component } from 'react';
import '../CreateAccount/account.css';
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
      />
    )
  }
}

class LogIn extends Component {
  render() {
    return(
      <Grid container spacing={24}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{'margin': '25px'}}>
          <b>Log In</b> <br/>
          <a href="/">Don't have an account yet? <br/> Click here to make one </a>
          <br/><br/>
          <Field id="email" placeholder="email address" />
          <Password id="password" placeholder="enter password"/>

          <Button variant="primary" className="submit">Log In</Button> <br/>


        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    )

  }
}

export default LogIn;
