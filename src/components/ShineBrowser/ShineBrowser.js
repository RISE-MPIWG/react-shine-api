import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/LoginPage";
import TopBar from "./Pages/SearchPage/Topbar";
import Constants, { http } from "../../Constants";
import './styles.css'

import { TopBarContext } from '../topbar-context'

class ShineBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      loading: true,
      selectedSections: [],
      filesContentLoading: false,
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

  checkForLoggedInUser() {
    return new Promise(resolve => {
      localStorage.getItem("shineUser").then(user => {
        if (user) {
          user = JSON.parse(user);
          if (new Date(user.date).now() < (new Date().now() - (1000 * 60 * 24 * 3))) {
            // if date is more than x days ago, delete user and force re-login
            localStorage.removeItem("shineUser");
            this.setState({ loading: false }, () => resolve());
          } else {
            this.setState({ user, loading: false }, () => resolve());
          }
        } else {
          this.setState({ loading: false }, () => resolve());
        }
      });
    });
  }

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

  back() {
    if(this.state.page == 'home') {
      this.setState({page: 'search'})
    }
    if(this.state.page == 'search') {
      this.setState({page: 'home'})
    }
  }

  // figure out if this sections uuid is selected and return it true/false
  isChecked(node) {
    let uuid = node.uuid;
    let selected = false;
    this.state.selectedSections.forEach(section => {
      if (section.uuid == uuid) selected = true;
    });
    return selected;
  }

  handleCheckSection(newItem, value, e, checkChildren = true) {
    let newSelections = this.state.selectedSections;
    let exists = false;
    let existingIndex = null;
    newSelections.forEach((item, index) => {
      if (item.uuid == newItem.uuid) {
        exists = true;
        existingIndex = index;
      }
    });

    let hasChildren = newItem.children ? true : false;

    if (hasChildren) {
      // if any child is checked, uncheck them all. otherwise check them all
      newItem.children.forEach(child => {
        if (this.isChecked(child)) checkChildren = false;
      });
      newItem.children.forEach(child => {
        this.handleCheckSection(child, checkChildren, e, checkChildren);
      });
    }

    if (!exists && value === true && !hasChildren) newSelections.push(newItem);
    if (value === false && exists) newSelections.splice(existingIndex, 1);
    this.setState({ selectedSections: newSelections });

  }

  async handleFileUpload() {
    this.setState({filesContentLoading: true});
    //validate here and add files to function
    // nested looping - flatten all children
    let getChildren = function(array) {
      let returnArray = [];
      array.forEach(child => {
        if (child.children) {
          returnArray.concat(getChildren(child));
        } else {
          returnArray.push(child);
        }
      });
      return returnArray;
    };
    let files = getChildren(this.state.selectedSections);

    // grab all the content for each "file" from API and add it to the object as a big string of text
    files = await Promise.all(files.map(async (item) => {
      let content = await this.getContentBySectionId(item.id);
      item.content = content;
      return item;
    }));
    this.props.handleFileUpload(files);
    this.setState({filesContentLoading: false});
  }

  // returns all content as a string for the section id. makes as many API calls as necessary
  async getContentBySectionId(id){
    let metadata = await http({
      url: `sections/${id}`,
      method: "get",
      token: this.props.loggedInUser ? this.props.loggedInUser.token : null
    });
    let page = 1;
    let totalPages = Math.ceil(metadata.contentUnitCount/20);
    let contents = [];

    while(page <= totalPages){
      contents.push(
        new Promise(resolve => {
          http({
            url: `sections/${id}/content_units?per_page=20&page=${page}`,
            method: "get",
            token: this.props.loggedInUser ? this.props.loggedInUser.token : null
          }).then(r => resolve(r) );
        })
      )
      page++;
    }

    contents = await Promise.all(contents);

    // concat all content strings together into 1
    let content = '';
    contents.forEach(contentPage => {
      contentPage.forEach(contentUnit => {
        content += contentUnit.content;
      })
    })

    return content;
  }

  // logout() {
  //   fetch(Constants.api + "sign_out", {
  //     method: "delete",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "rise-api-token": this.state.user.token
  //     }
  //   })
  //     .then(result => result.json())
  //     .then(result => {});
  //   localStorage.removeItem("shineUser");
  //   this.setState({ user: null, page: "home" });
  // }

  updateUser(user) {
    this.setState({ user: user });
  }

  getPage() {
    let page = this.state.page;
    if (page == "home") {
      return <Homepage styles={this.state.styles} navigate={this.navigate.bind(this)} loggedInUser={this.state.user} handleFileUpload={this.handleFileUpload.bind(this)} filesContentLoading={this.state.filesContentLoading} page={this.state.page}/>;
    }

    if (page == "search") {
      return (
        <SearchPage
          collections={this.state.collections}
          loggedInUser={this.state.user}
          styles={this.state.styles}
          token={this.state.user ? this.state.user.token : null}
          navigate={this.navigate.bind(this)}
          params={this.state.params}
          handleCheckSection={this.handleCheckSection.bind(this)}
          isChecked={this.isChecked.bind(this)}
          handleFileUpload={this.handleFileUpload.bind(this)}
          filesContentLoading={this.state.filesContentLoading}
          page={this.state.page}
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

        <div className="shinePageWrapper">
          <TopBarContext.Provider value={this.state.selectedSections }>
            {this.getPage()}
          </TopBarContext.Provider>
        </div>
      </div>
    );
  }
}

export default ShineBrowser;
