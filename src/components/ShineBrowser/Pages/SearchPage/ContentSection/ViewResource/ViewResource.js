import React, { Component } from "react";
import { http } from "../../../../../../Constants";
import ViewContentUnit from "../ViewContentUnit";
import Loading from "../../../../Components/Loading";
import TreeView from "./TreeView/TreeView";

class ViewResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: {},
      sections: [],
      selectedSection: {},
      loadingSections: true,
      loadingMetadata: true
    };
  }

  componentWillMount() {
    this.setMetadata();
    this.setSections();
  }

  handleSelectSection(item) {
    this.setState({ selectedSection: item });
  }

  handleCheckSection(item, value, e) {
    // e.stopPropagation();
    // value is true/false - is item being checked or unchecked
    this.props.handleCheckSection(item, value);
  }

  setMetadata() {
    http({
      url: `resources/${this.props.resource.uuid}/metadata`,
      method: "get",
      token: this.props.loggedInUser ? this.props.loggedInUser.token : null
    }).then(response => {
      this.setState({
        loadingMetadata: false,
        metadata: response
      });
    });
  }

  setSections() {
    http({
      url: `resources/${this.props.resource.uuid}/sections`,
      method: "get",
      token: this.props.loggedInUser ? this.props.loggedInUser.token : null
    }).then(response => {
      this.setState({
        sections: response,
        loadingSections: false
      });
    });

    // // TEST CODE - for testing nested sections
    // alert("TEST loading nested secton resource");
    // http({
    //   url: "resources/a13889e5-377c-47c9-9683-b65593845bed/sections",
    //   token: this.props.loggedInUser ? this.props.loggedInUser.token : null,
    //   method: "get"
    // }).then(response => {
    //   this.setState({
    //     sections: response,
    //     loadingSections: false
    //   });
    // });
  }

  setActiveNode(node) {
    this.handleSelectSection(node);
  }

  render() {
    let { year, author, language, book_type, content_unit_type, description } = this.state.metadata;

    return (
      <React.Fragment>
        <div style={this.styles.resourceWrapper}>
          <div style={this.styles.inside}>
            {/* <span onClick={this.props.goBack} style={this.styles.back} class="shineBackButton">
            <img src={require("../../../../../../img/up-arrow.png")} style={this.styles.backImage} /> back
          </span> */}
            <br />
            <br />
            <h3 style={this.styles.title}>{this.props.resource.name}</h3>
            {this.state.loadingMetadata ? <Loading /> : null}
            <table style={{ marginLeft: "auto", marginRight: "auto" }}>
              <tbody>
                {year ? (
                  <tr>
                    <td style={this.styles.label}>Year:</td>
                    <td>{year}</td>
                  </tr>
                ) : null}
                {author ? (
                  <tr>
                    <td style={this.styles.label}>Author:</td>
                    <td>{author}</td>
                  </tr>
                ) : null}
                {language ? (
                  <tr>
                    <td style={this.styles.label}>Language:</td>
                    <td>{language}</td>
                  </tr>
                ) : null}
                {book_type ? (
                  <tr>
                    <td style={this.styles.label}>Type:</td>
                    <td>{book_type}</td>
                  </tr>
                ) : null}
                {content_unit_type ? (
                  <tr>
                    <td style={this.styles.label}>Content Type:</td>
                    <td>{content_unit_type}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            {description ? (
              <p>
                <strong>Description: </strong>
                {description}
              </p>
            ) : null}
            <h3 style={{ marginBottom: 5 }}>Sections</h3>
            {this.state.loadingSections ? <Loading /> : null}
            <TreeView
              resources={this.state.sections}
              setActiveNode={this.setActiveNode.bind(this)}
              handleCheckSection={this.handleCheckSection.bind(this)}
              isChecked={this.props.isChecked}
            />
            {/*   
          {this.state.sections.map(item => {
            let selected = item.uuid == this.state.selectedSection.uuid;
            let isChild = item.parentUuid ? true : false;
            return (
              <p
                class="shineSectionItem"
                style={{...(selected ? this.styles.selectedSection : this.styles.section), ...(isChild ? {paddingLeft: 15} : {})}}
                onClick={() => this.handleSelectSection(item)}
                key={item.uuid}
              >
                <input
                  type="checkbox"
                  checked={this.isChecked(item.uuid)}
                  name={item.uuid}
                  onChange={e => this.handleCheckSection(item, !this.isChecked(item.uuid))}
                />
                {item.name}
              </p>
            );
          })} */}
            <br />
          </div>
        </div>
        <ViewContentUnit
          styles={this.props.styles}
          flex={this.props.flex}
          section={this.state.selectedSection}
          loggedInUser={this.props.loggedInUser}
        />
      </React.Fragment>
    );
  }
  styles = {
    label: {
      paddingRight: 10,
      color: this.props.styles.lightText
    },
    resourceWrapper: {
      flex: this.props.flex * 0.5,
      display: "flex",
      flexFlow: "column",
      minHeight: 0,
      overflow: "auto",
      position: "relative"
    },
    inside: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 8,
      paddingRight: 0
    },
    section: {
      margin: 0,
      borderRadius: this.props.styles.borderRadius,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingRight: 8
    },
    selectedSection: {
      backgroundColor: this.props.styles.lightBG,
      margin: 0,
      borderRadius: this.props.styles.borderRadius,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingRight: 8
    },
    title: {
      margin: 0,
      width: "100%",
      textAlign: "center"
    },
    back: {
      marginBottom: 10,
      marginTop: 10
    },
    backImage: {
      transform: "rotate(270deg)",
      height: 10,
      width: 10
    }
  };
}

export default ViewResource;
