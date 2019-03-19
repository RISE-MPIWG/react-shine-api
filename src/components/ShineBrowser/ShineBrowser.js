import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/LoginPage";
import Constants, { http } from "../../Constants";
import './styles.css'

class ShineBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      loading: true,
      styles: {
        primary: "#FF2979",
        headerBG: "#fff",
        lightBG: "#f5f5f5",
        text: "#191919",
        lightText: "rgba(0,0,0,.6)",
        lightGrey: "#dddddd",
        borderRadius: 2,
        fontFamily: "Calibri",
        selectedItemsBackgroundColor: "rgb(237, 242, 245)"
      },
      collections: []
    };
    // set user specified styles
    if (props.styles) {
      for (var key in props.styles) {
        this.state.styles[key] = props.styles[key];
      }
    }
  }

  getCollections() {
    //used by the search page filter select
    http({
      url: "collections?page=1&per_page=150",
      token: this.state.user ? this.state.user.token : null,
      method: "get"
    }).then(result => {
      this.setState({ collections: result });
    });
  }

  componentDidMount() {
    this.checkForLoggedInUser();
    this.getCollections();
  }

  // checkForLoggedInUser() {
  //   return new Promise(resolve => {
  //     localStorage.getItem("shineUser").then(user => {
  //       if (user) {
  //         user = JSON.parse(user);
  //         if (new Date(user.date).now() < (new Date().now() - (1000 * 60 * 24 * 3))) {
  //           // if date is more than x days ago, delete user and force re-login
  //           localStorage.removeItem("shineUser");
  //           this.setState({ loading: false }, () => resolve());
  //         } else {
  //           this.setState({ user, loading: false }, () => resolve());
  //         }
  //       } else {
  //         this.setState({ loading: false }, () => resolve());
  //       }
  //     });
  //   });
  // }

  checkForLoggedInUser() {
    let user = localStorage.getItem("shineUser");
    if (user) {
      user = JSON.parse(user);
      let userDate = new Date(user.date);
      let validForHours = 24 * 3;
      if (userDate.getTime() < Date.now() - 1000 * 60 * 60 * validForHours) {
        localStorage.removeItem("shineUser");
        this.setState({ loading: false });
      } else {
        this.setState({ user, loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  navigate(page, params) {
    if (page == "logout") return this.logout();
    this.setState({ page, params });
  }

  logout() {
    fetch(Constants.api + "sign_out", {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "rise-api-token": this.state.user.token
      }
    })
      .then(result => result.json())
      .then(result => {});
    localStorage.removeItem("shineUser");
    this.setState({ user: null, page: "home" });
  }

  updateUser(user) {
    this.setState({ user: user });
  }

  getPage() {
    let page = this.state.page;
    if (page == "home") {
      return <Homepage styles={this.state.styles} navigate={this.navigate.bind(this)} loggedInUser={this.state.user} />;
    }

    if (page == "search") {
      return (
        <SearchPage
          handleFileUpload={this.props.handleFileUpload}
          collections={this.state.collections}
          loggedInUser={this.state.user}
          styles={this.state.styles}
          token={this.state.user ? this.state.user.token : null}
          navigate={this.navigate.bind(this)}
          params={this.state.params}
        />
      );
    }

    if (page == "login") {
      return <LoginPage updateLoggedInUser={this.updateUser.bind(this)} styles={this.state.styles} navigate={this.navigate.bind(this)} />;
    }
  }

  render() {
    if (this.state.loading) return null;

    return (
      <div className="shineWrapper" style={{ fontFamily: this.state.styles.fontFamily }}>
        <Navbar
          styles={this.state.styles}
          loggedInUser={this.state.user}
          close={this.props.close}
          navigate={this.navigate.bind(this)}
          page={this.state.page}
        />
        <div className="shinePageWrapper">{this.getPage()}</div>
      </div>
    );
  }
}

export default ShineBrowser;
