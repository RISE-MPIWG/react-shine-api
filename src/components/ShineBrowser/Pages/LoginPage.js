import React, { Component } from "react";
import Constants from "../../../Constants";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  login() {
    this.setState({loading: true});
    fetch(`${Constants.api}sign_in`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(result => result.json())
      .then(result => {
        this.setState({loading: false})
        if (result.auth_token) {
          this.setState({errorMessage: ''})
          let user = {
            email: this.state.email,
            token: result.auth_token,
            date: new Date()
          };
          this.props.updateLoggedInUser(user);
          localStorage.setItem("shineUser", JSON.stringify(user));
          this.props.navigate('search')
        }else if(result.errors){
          if(result.errors[0]){
            this.setState({errorMessage: result.errors[0].detail})
          }
        }
      });
  }

  render() {
    return (
      <div>
        <div style={this.styles.inputWrapper}>
          <h2 style={this.styles.title}>Log in using your SHINE credentials</h2>
          <div>
            <span style={this.styles.inputLabel}>Email</span>
            <input type="email" class="shineInput" value={this.state.email} onChange={x => this.setState({ email: x.target.value })} />
          </div>
          <div>
            <span style={this.styles.inputLabel}>Password</span>
            <input type="password" class="shineInput" value={this.state.password} onChange={x => this.setState({ password: x.target.value })} />
          </div>
          <br />
          <div class="shineButton" style={this.styles.loginButton} onClick={this.login.bind(this)}>
            {this.state.loading ? '...' : 'Login'}
          </div>
          {this.state.errorMessage ? <p style={this.styles.errorMessage}>{this.state.errorMessage}</p> : null}
        </div>
      </div>
    );
  }
  styles = {
    inputWrapper: {
      paddingTop: 50,
      maxWidth: 300,
      margin: "auto"
    },
    errorMessage: {
      padding: 15,
      textAlign: 'center',
      boxSizing: 'border-box',
      width: '100%',
      color: '#FF3B30',
      // backgroundColor: '#FF3B3030',
    },
    inputLabel: {
      opacity: 0.5
    },
    loginButton: {
      width: '100%',
      backgroundColor: this.props.styles.primary,
      color: 'white'
    },
    title: {
      width: '100%',
      textAlign: 'center',
      fontWeight: 'normal'
    }
  };
}

export default LoginPage;
