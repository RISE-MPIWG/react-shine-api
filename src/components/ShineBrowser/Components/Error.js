import React, { Component } from "react";

class Error extends React.Component {
  render() {
    let styles = {
      wrapper: {
        width: "100%",
        textAlign: "center",
        paddingTop: 70,
        color: this.props.color || "#ccc",
        position: "absolute",
        zIndex: 10,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: 50,
        minWidth: 90,
      },
      loadingText: {
        // padding: 30,
        paddingTop: 20,
        paddingBottom: 20,
        width: '40%',
        borderRadius: 8,
        backgroundColor: "rgba(0,0,0,.5)",
        zIndex: 11,
        minHeight: 40,
        minWidth: 80,
        margin: 'auto',
        color: 'white'
      }
    };
    return (
      <div style={styles.wrapper}>
        <div style={styles.loadingText}>
          <div>{this.props.message}</div>
        </div>
      </div>
    )
  }
}

export default Error;
