import React, { Component } from "react";
import Loading from "../../../Components/Loading";
import Pagination from "../../../Components/Pagination";

class ViewCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 55
    };
  }

  handleSelectPage(page){
    this.props.handleSelectPage(page).then(res => {
      this.scrollContainer.scrollTop = 0;
    })
  }

  render() {
    return (
      <div style={this.styles.wrapper} ref={x => this.scrollContainer = x}>
      <div style={this.styles.inside}>
        <h3 style={this.styles.title}>Resources {this.props.totalResources ? `(${this.props.totalResources})` : null}</h3>
        {this.props.loading ? <Loading color={this.props.styles.lightText}/> : null}
        {this.props.resources.map(item => {
          return (
            <div style={this.styles.resourceLinkWrapper} key={item.uuid}>
              <div class="shineLinkButton" style={this.styles.resourceLink} onClick={() => this.props.handleSelectResource(item)}>
                {item.name}
              </div>
            </div>
          );
        })}
        {this.props.resources.length>20 ? <Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages} styles={this.props.styles} handleSelectPage={this.handleSelectPage.bind(this)} /> :null}
      </div>
      </div>
    );
  }
  styles = {
    resourceLink: {
      color: this.props.styles.text
    },
    resourceLinkWrapper: {
      marginBottom: 10,
      marginTop: 10,
      paddingBottom: 10,
      borderBottom: `1px solid #e5e5e5`
    },
    wrapper: {
      flex: this.props.flex,
      // transition: '.2s',
      // flex: 0.74,
      display: "flex",
      flexFlow: "column",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 0,
      overflow: "auto",
      paddingLeft: 8,
      position: 'relative'

    },
    inside: {
      position: 'absolute',
      height: '100%'
    },
    title: {
      marginTop: 5
    }
  };
}

export default ViewCollection;
