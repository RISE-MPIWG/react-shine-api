import React, { Component } from "react";
import Constants, { http } from "../../../Constants";
import CollectionCard from "../Components/CollectionCard";
import Loading from "../Components/Loading";
import TopBar from "./SearchPage/TopBar"
import { TopBarContext } from '../../topbar-context'

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      searchText: "",
      selectedLanguage: 'all',
      loading: true,
      selectedSections: [],
      filesContentLoading: false
    };
  }

  componentDidMount() {
    this.getCollections();
  }

  handleSelectChange(e) {
    this.setState({ [e.target.id]: e.target.value }, () => {
      this.getCollections();
    });
  }

  viewCollection(id) {
    this.props.navigate("search", { collection: id });
  }



  getCollections() {
    let url = `collections?page=1&per_page=150`;
    if(this.state.selectedLanguage!='all') url = url + `&language_filter=${this.state.selectedLanguage}`;
    this.setState({loading: true});
    http({
      url,
      token: this.props.loggedInUser ? this.props.loggedInUser.token : null,
      method: "get"
    }).then(result => {
      this.setState({ collections: result, loading: false });
    });
  }

  render() {
    let shownCollections = this.state.collections;
    if (this.state.searchText.length > 0) {
      shownCollections = shownCollections.filter(x => {
        return x.name.toLowerCase().includes(this.state.searchText.toLowerCase());
      });
    }
    return (
      <div style={this.styles.wrapper}>
      {this.state.loading ? <Loading /> : null}
        {/* <div>
          <h1 style={{ margin: 0, fontWeight: "normal" }}>Welcome to RISE MPIWG</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit.
          </p>
          <br />
        </div> */}
        <div>
        <TopBarContext.Consumer>
          { selectedSections => (
            <TopBar
              styles={this.props.styles}
              selectedSections={selectedSections}
              handleFileUpload={this.props.handleFileUpload.bind(this)}
              filesContentLoading={this.props.filesContentLoading}
              page={this.props.page}
            />
          )}
        </TopBarContext.Consumer>
          <div style={{ padding:10 }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
              <h2 style={{ margin: 0, padding: 0, display: "flex" }}>Collections</h2>
              {/*}{this.props.loggedInUser ? null : (
                <div style={{ display: "flex", opacity: 0.5 }}>
                  To see more texts with private access rights,
                  <span class="shineLinkButton" style={{ marginLeft: 3 }} onClick={() => this.props.navigate("login")}>
                    sign in
                  </span>
                </div>
              )}*/}
              </div>
              <p style={{ margin: 0, padding: 0 }}>Showing {shownCollections.length} Collections</p>
            </div>
          <div style={this.styles.inputRow}>
            <div style={this.styles.searchWrapper}>
              <div style={this.styles.selectLabel}>
                <br />
              </div>
              <input
                type="text"
                class="shineInput"
                style={this.styles.search}
                placeholder="search..."
                value={this.state.searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
              />
            </div>
            {/* language filter not working right now. uncomment this and it should be good to go */}
            {/* <div style={this.styles.selectWrapper}>
              <div style={this.styles.selectLabel}>Language</div>
              <select name="selectedLanguage" class="shineInput" style={this.styles.select} id='selectedLanguage' onChange={this.handleSelectChange.bind(this)}>
                <option value="all">All</option>
                <option value="bo">Tibetan</option>
                <option value="ar">Arabic</option>
                <option value="zh-Hant">Traditional Chinese</option>
                <option value="lat">Latin</option>
                <option value="grc">Greek</option>
                <option value="en-GB">English</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
              </select>
            </div> */}

            {/* <div style={this.styles.selectWrapper}>
              <div style={this.styles.selectLabel}>Organization</div>
              <select name="selectedOrganizationID" class="shineInput" style={this.styles.select} onChange={this.handleSelectChange.bind(this)}>
                <option value="all">All</option>
                <option value="all">All</option>
                <option value="all">All</option>
              </select>
            </div> */}

          </div>
        </div>
        <div style={this.styles.collectionRow}>
          {shownCollections.map(item => {
            return <CollectionCard item={item} viewCollection={this.viewCollection.bind(this)} styles={this.props.styles} />;
          })}
        </div>
      </div>
    );
  }

  styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      position: "relative",
      overflow: "auto",
      minHeight: 0, // dont change. for flexbox scrolling
      // padding: 10
    },
    inputRow: {
      display: "flex",
      // marginTop: 25,
      marginLeft: 10,
      marginRight: 10,
      clear: "both",
      flexDirection: "row",
    },
    search: {
      borderRadius: 50,
      paddingLeft: 16,
      // marginLeft: 15,
      // width: '100%'
    },
    searchWrapper: {
      flex: 1,
      // paddingRight: 20
    },
    selectWrapper: {
      flex: 0.25,
      paddingLeft: 20
    },
    collectionRow: {
      display: "flex",
      // justifyContent: 'space-between',
      flexDirection: "row",
      flexWrap: "wrap"
    }
  };
}

export default Homepage;
