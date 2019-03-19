import React, { Component } from "react";

class CollectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, resourceCount, uuid } = this.props.item;
    return (
      <div style={this.styles.col}>
      <div
        style={{ ...this.styles.collectionWrapper, ...(this.state.hover ? this.styles.collectionWrapperHovered : {}) }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={() => this.props.viewCollection(uuid)}
      >
        <div style={this.styles.top}>
          <div style={{ fontWeight: "bold" }}>{name}</div>
          <div>{resourceCount} Resources</div>
        </div>
        {/* <div style={this.styles.bottom}>
        <div style={this.styles.viewButton} onClick={() => this.viewCollection(item.uuid)}>View</div>
      </div> */}
      </div>
      </div>
    );
  }
  styles = {
    col: {
      display: "flex",
      width: "33.33%",
      boxSizing: 'border-box',
      padding: 10
    },
    collectionWrapper: {
      padding: 10,
      border: "1px solid #e5e5e5",
      display: "flex",
      flex :1,
      boxSizing: "border-box",
      // marginBottom: 15,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 100,
      transition: '.1s',
      borderRadius: this.props.styles.borderRadius
    },
    collectionWrapperHovered: {
      cursor: "pointer",
      border: `1px solid ${this.props.styles.primary}`,
      transition: '.1s'

    },
    viewButton: {
      backgroundColor: this.props.styles.primary,
      color: "white",
      maxWidth: 100,
      paddingTop: 5,
      paddingBottom: 5
    }
  };
}

export default CollectionCard;
