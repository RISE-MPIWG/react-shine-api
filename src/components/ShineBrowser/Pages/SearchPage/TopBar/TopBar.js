import React, { Component } from "react";
import ExpandContents from "./ExpandContents";
import { upArrow } from '../../../../../img';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleExpand() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    let { isExpanded } = this.state;
    return (
      <div>
        <div style={this.styles.topbar}>
          <div style={this.styles.title} onClick={this.toggleExpand.bind(this)}>
            <strong>{this.props.selectedSections.length}</strong> <span style={this.styles.itemsSubtext}>items selected</span>
          </div>
          <div style={this.styles.loadButtonWrapper}>
            <div style={this.styles.inside}>
              <div class="shineButton" style={this.styles.loadButton} onClick={() => this.props.handleFileUpload()}>
                Load
              </div>
            </div>
          </div>
          <div style={this.styles.viewWrapper}>
            <div style={this.styles.inside} onClick={this.toggleExpand.bind(this)}>
              <span class="shineViewButton">
                {isExpanded ? "Hide" : "View"}
                <img src={upArrow} class={`shineViewButtonImage${this.state.isExpanded ? " expanded" : ""}`} />
              </span>
            </div>
          </div>
        </div>
        <div class={`selectedDocuments${isExpanded ? " expanded" : ""}`}>
          <ExpandContents
            handleCheckSection={this.props.handleCheckSection}
            selectedSections={this.props.selectedSections}
            toggleExpand={this.toggleExpand.bind(this)}
            styles={this.props.styles}
          />
        </div>
      </div>
    );
  }

  styles = {
    topbar: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      position: "relative",
      top: 0,
      left: 0,
      right: 0,
      boxSizing: "border-box",
      zIndex: 4,
      padding: 5,
      backgroundColor: this.props.styles.selectedItemsBackgroundColor
    },
    title: {
      flex: 0.6,
      textAlign: "center",
      textAlignVertical: "center",
      margin: 0,
      fontWeight: "normal",
      cursor: 'pointer'
    },
    itemsSubtext: {},
    loadButtonWrapper: {
      flex: 0.1,
      textAlign: "center",
      justifyContent: "center"
    },
    viewWrapper: {
      flex: 0.1,
      textAlign: "center"
    },
    inside: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%"
    },
    loadButton: {
      padding: 4,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: '1rem',
      backgroundColor: this.props.styles.primary,
      color: "white",
      borderRadius: this.props.styles.borderRadius
    }
  };
}

export default TopBar;
