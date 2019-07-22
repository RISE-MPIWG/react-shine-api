import React, { Component } from "react";
import TopBar from "./TopBar";
import Constants, { http } from "../../../../Constants";
import ContentSection from "./ContentSection/ContentSection";
import { search } from '../../../../img';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      includeName: true,
      includeAuthor: false,
      includeMetadata: true,
      selectedCollectionID: "all",
      selectedLanguage: "all",
      resources: [],
      activeNode: {},
      searchText: "",
      selectedSections: [],
      depth: 0,

      //Pagination
      currentPage: 1,
      totalPages: 1,
      perPage: 100,

      // animation values
      showSearchIcon: false,
      showSearchContents: true,
      searchFlex: ".26",
      searchOpacity: 1,
      searchIconOpacity: 0.3,
      searchContentFadeTransition: ".2s"
    };
  }

  componentDidMount() {
    if (this.props.params) {
      if (this.props.params.collection) {
        this.setState({ selectedCollectionID: this.props.params.collection }, () => {
          this.enterSearch();
        });
      }
    }
  }

  // depth controls which page in the search process we are on
  handleChangeDepth(x) {
    // navigate, and do the animations
    this.setState({
      depth: x,
      searchFlex: x === 0 ? 0.26 : 0.06,
      searchContentFadeTransition: x === 0 ? ".4s" : ".05s",
      showSearchIcon: x === 0 ? false : true,
      showSearchContents: x === 0 ? true : false
    });

    setTimeout(() => {
      this.setState({
        searchOpacity: x === 0 ? 1 : 0,
        searchIconOpacity: x === 0 ? 0 : 0.3
      });
    }, 190);
  }

  // returns flex size available for other boxes based on current search size
  getFlex() {
    return (1 - parseFloat(this.state.searchFlex)).toString();
  }

  handleMouseEnterSearch() {
    let n = parseFloat(this.state.searchFlex);
    let newFlex = (n * 1.06).toString();
    this.setState({
      // searchFlex: newFlex,
      searchIconOpacity: 0.7
    });
  }

  handleMouseLeaveSearch() {
    let n = parseFloat(this.state.searchFlex);
    let newFlex = (n / 1.06).toString();
    this.setState({
      // searchFlex: newFlex,
      searchIconOpacity: 0.3
    });
  }

  handleCheckboxChange(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  handleSelectChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileUpload() {
    //validate here and add files to function
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
    this.props.handleFileUpload(files);
  }

  enterSearch(resetPageNumber=false) {
    let doRest = () => {
      this.setState({ collectionLoading: true });
      if (this.state.selectedCollectionID == "all") {
        this.getResources("all");
      } else {
        this.getResources("collection");
      }
    }

    if(resetPageNumber) this.setState({currentPage: 1}, () => doRest());
    else doRest();
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

  getResources(type) {
    // create URLs
    let queryStrings = `?page=${this.state.currentPage}&per_page=${this.state.perPage}`;
    if(this.state.searchText){
      if(this.state.includeAuthor) queryStrings = queryStrings+`&author_filter=${this.state.searchText}`;
      if(this.state.includeName) queryStrings = queryStrings+`&filter=${this.state.searchText}`;
    }
    if(this.state.selectedLanguage && this.state.selectedLanguage!='all')
      queryStrings = queryStrings+`&language_filter=${this.state.selectedLanguage}`;

    let urls = {
      collection: Constants.api + `collections/${this.state.selectedCollectionID}/resources${queryStrings}`,
      all: Constants.api + `resources${queryStrings}`
    };
    fetch(urls[type], {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "rise-api-token": this.props.loggedInUser ? this.props.loggedInUser.token : null
      }
    }).then(result => {
      // access result.headers['keyname']  here
      let totalResources = result.headers.get("x-total");
      let perPage = result.headers.get("x-per-page");
      let currentPage = parseInt(result.headers.get("x-page"));

      result.json().then(result => {
        result = result.map(item => {
          item.typeOfData = "resource";
          return item;
        });
        this.setState({
          collectionLoading: false,
          resources: result,
          totalPages: Math.ceil(totalResources / perPage),
          totalResources,
          perPage,
          currentPage
        });
      });
    });
  }

  handleSelectPage(page) {
    return new Promise(resolve => {
      this.setState({ currentPage: page }, () => {
        this.enterSearch();
        resolve();
      });
    });
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

  render() {
    let searchWrapperStyles = {
      flex: this.state.searchFlex,
      padding: "8px",
      borderRight: "1px solid #cccccc",
      display: "flex",
      flexFlow: "column nowrap",
      transition: ".2s ease-out"
    };
    let searchFadeWrapper = {
      opacity: this.state.searchOpacity,
      transition: this.state.searchContentFadeTransition
    };
    let searchIconStyle = {
      transition: ".18s",
      opacity: this.state.searchIconOpacity,
      width: 40,
      alignSelf: "center",
      paddingTop: 10,
      cursor: "pointer"
    };
    return (
      <React.Fragment>
        <TopBar
          styles={this.props.styles}
          handleFileUpload={this.handleFileUpload.bind(this)}
          selectedSections={this.state.selectedSections}
          handleCheckSection={this.handleCheckSection.bind(this)}
        />
        <div style={this.styles.flexWrapper}>
          <div style={searchWrapperStyles}>
            {this.state.showSearchIcon ? (
              <div
                style={this.styles.searchIconButton}
                onMouseEnter={this.handleMouseEnterSearch.bind(this)}
                onMouseLeave={this.handleMouseLeaveSearch.bind(this)}
                onClick={() => this.handleChangeDepth(0)}
              >
                <img src={search} style={searchIconStyle} />
              </div>
            ) : null}
            {this.state.showSearchContents ? (
              <React.Fragment>
                <div style={searchFadeWrapper}>
                  <input
                    type="text"
                    placeholder="search..."
                    class="shineInput"
                    style={this.styles.searchInput}
                    value={this.state.searchText}
                    name="searchText"
                    onChange={x => this.setState({ searchText: x.target.value })}
                  />
                  <h4 style={this.styles.searchTitle}>Search For:</h4>
                  <div style={this.styles.checkboxRow}>
                    <div style={this.styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={this.state.includeName}
                        name="includeName"
                        onChange={this.handleCheckboxChange.bind(this)} />
                      Name
                    </div>
                    <div style={this.styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={this.state.includeAuthor}
                        name="includeAuthor"
                        onChange={this.handleCheckboxChange.bind(this)}
                      />
                      Author
                    </div>
                    {/* api doesnt support this filter yet */}
                    {/* <div style={this.styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={this.state.includeMetadata}
                        name="includeMetadata"
                        onChange={this.handleCheckboxChange.bind(this)}
                      />
                      Metadata
                    </div> */}
                  </div>
                  <div style={this.styles.selectWrapper}>
                    <div style={this.styles.selectLabel}>Collection</div>
                    <select
                      name="selectedCollectionID"
                      class="shineInput"
                      style={this.styles.select}
                      onChange={this.handleSelectChange.bind(this)}
                      value={this.state.selectedCollectionID}
                    >
                      <option value="all">All</option>
                      {this.props.collections.map(item => {
                        return (
                          <option value={item.uuid}>
                            {item.name} ({item.resourceCount})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div style={this.styles.selectWrapper}>
                    <div style={this.styles.selectLabel}>Language</div>
                    <select name="selectedLanguage" class="shineInput" style={this.styles.select} onChange={this.handleSelectChange.bind(this)}>
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
                  </div>
                  <div class="shineButton" style={this.styles.searchButton} onClick={() => this.enterSearch(true)}>
                    {this.state.loading ? "..." : "Search"}
                  </div>
                </div>
                {/* {this.props.loggedInUser ? null : (
                  <div style={this.styles.bottomMessage}>
                    To see more texts with private access rights,{" "}
                    <span class="shineLinkButton" onClick={() => this.props.navigate("login")}>
                      sign in
                    </span>
                  </div>
                )} */}
              </React.Fragment>
            ) : null}
          </div>
          <ContentSection
            handleCheckSection={this.handleCheckSection.bind(this)}
            styles={this.props.styles}
            selectedSections={this.state.selectedSections}
            resources={this.state.resources}
            totalResources={this.state.totalResources}
            collectionLoading={this.state.collectionLoading}
            changeDepth={this.handleChangeDepth.bind(this)}
            depth={this.state.depth}
            flex={this.getFlex()}
            totalPages={this.state.totalPages}
            handleSelectPage={this.handleSelectPage.bind(this)}
            currentPage={this.state.currentPage}
            loggedInUser={this.props.loggedInUser}
            isChecked={this.isChecked.bind(this)}
          />
        </div>
      </React.Fragment>
    );
  }
  styles = {
    flexWrapper: {
      // paddingTop: 40,
      display: "flex",
      flexDirection: "row",
      flex: 1,
      position: "relative",
      minHeight: 0 // dont change. for flexbox scrolling
    },
    searchIconButton: {
      flex: 1,
      textAlign: "center",
      cursor: "pointer"
    },
    checkboxWrapper: {
      // flex: 0.5,
      marginRight: 8
    },
    checkboxRow: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: 10
    },
    searchInput: {
      width: "100%",
      borderRadius: 50,
      padding: 8,
      paddingLeft: 16,
      borderColor: this.props.styles.lightGrey,
      marginBottom: 5
    },
    searchTitle: {
      margin: 0,
      marginBottom: 5,
      fontWeight: "normal",
      color: this.props.styles.lightText
    },
    bottomMessage: {
      opacity: 0.5,
      // flex: 1,
      justifySelf: "flex-end",
      alignSelf: "flex-end",
      marginTop: "auto"
    },
    select: {
      borderRadius: this.props.styles.borderRadius,
      borderColor: this.props.styles.lightGrey
    },
    selectLabel: {
      color: this.props.styles.lightText
    },
    selectWrapper: {
      marginTop: 15,
      marginBottom: 0
    },
    searchButton: {
      backgroundColor: this.props.styles.primary,
      color: "white",
      marginTop: 30,
      borderRadius: this.props.styles.borderRadius
    }
  };
}

export default SearchPage;
