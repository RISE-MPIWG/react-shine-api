import React, { Component } from "react";
import ExpandContents from "./ExpandContents";
import { upArrow} from '../../../../../img';



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

  handeleBack(){
    this.props.handleBack()
  }


  render() {
    let { isExpanded } = this.state;
    let { filesContentLoading } = this.props;
    return (
      <div>
        <div style={this.styles.topbar}>
          {this.props.page == 'search' &&
            <div style={this.styles.backButton}>
              <div style={this.styles.inside}>
                <button  class="shineButton" style={this.styles.loadButton} onClick={this.handeleBack.bind(this)}>
                  <span>
                    <img src={upArrow} class="shineViewButtonImage expanded" style={this.styles.rotated} />
                  </span>
                Back</button>
              </div>
            </div>
          }
          <div style={this.styles.viewWrapper}>
            <div style={this.styles.inside} onClick={this.toggleExpand.bind(this)}>
              {/*<span class="shineViewButton">
                {isExpanded ? "Hide" : "View"}
                <img src={upArrow} class={`shineViewButtonImage${this.state.isExpanded ? " expanded" : ""}`} />
              </span>*/}
              <div style={this.styles.title} onClick={this.toggleExpand.bind(this)}>
                <div style={this.shoppingCartWrapper}>
                <div class="CSSBadge">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18 CSSBadge-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                  </svg>
                  <div  style ={{background:  this.props.styles.primary }}class="CSSBadge-number">{this.props.selectedSections.length}</div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div style={this.styles.loadButtonWrapper}>
            <div style={this.styles.inside}>
              <button
                class="shineButton"
                style={this.styles.loadButton}
                onClick={filesContentLoading ? () => null : () => this.props.handleFileUpload()}
                disabled={filesContentLoading}>
                {filesContentLoading ? 'Loading...' : 'Load'}
              </button>
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
      justifyContent: "center",

    },
    viewWrapper: {
      flex: 0.1,
      textAlign: "center"
    },
    inside: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    },
    backButton: {
      position: 'absolute',
      left: 5,
      display: 'flex',
      width: 100
    },
    loadButton: {
      padding: 4,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: '1rem',
      backgroundColor: this.props.styles.primary,
      color: "white",
      borderRadius: this.props.styles.borderRadius
    },
    rotated: {
      filter: "invert(1)",
      transform: 'rotate(-90deg)',
      marginRight: '5px'
    }
  };
}

export default TopBar;
