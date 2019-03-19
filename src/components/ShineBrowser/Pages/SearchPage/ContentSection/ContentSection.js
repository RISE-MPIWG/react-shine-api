import React, { Component } from "react";
import ViewResource from "./ViewResource";
import ViewCollection from "./ViewCollection";

class ContentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedResource: {}
    };
  }

  handleSelectResource(item) {
    this.changeDepth(this.props.depth + 1);
    this.setState({
      selectedResource: item
    });
  }

  changeDepth(x) {
    this.props.changeDepth(x);
  }

  getContentSection(index) {
    if (index === 0) {
      return (
        <ViewCollection
          flex={this.props.flex}
          loading={this.props.collectionLoading}
          handleSelectResource={this.handleSelectResource.bind(this)}
          resources={this.props.resources}
          styles={this.props.styles}
          currentPage={this.props.currentPage}
          handleSelectPage={this.props.handleSelectPage}
          totalPages={this.props.totalPages}
          totalResources={this.props.totalResources}
        />
      );
    }
    if (index === 1) {
      return (
        <ViewResource
          flex={this.props.flex}
          selectedSections={this.props.selectedSections}
          handleCheckSection={this.props.handleCheckSection}
          loggedInUser={this.props.loggedInUser}
          resource={this.state.selectedResource}
          goBack={() => this.changeDepth(0)}
          styles={this.props.styles}
          isChecked={this.props.isChecked}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <div style={this.styles.wrapper}> */}
        {/* <h3 style={this.styles.title}>{this.getBreadcrumbs()}</h3> */}
        {/* <div style={this.styles.scrollContainer}> */}
        {this.getContentSection(this.props.depth)}
        {/* </div> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
  styles = {
    wrapper: {
      // flex: 0.74,
      flex: this.props.flex,
      display: "flex",
      // transition: '.2s',
      flexFlow: "column",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 0
    },
    scrollContainer: {
      overflow: "auto",
      // flex: 1,
      paddingLeft: 8
      // marginTop: 30
      // overflowX: "hidden",
      // position: "relative"
    },
    title: {
      margin: 0,
      marginTop: 5,
      paddingLeft: 8
    },

    breadcrumbLink: {
      marginLeft: 10
    }
  };
}

export default ContentSection;
