import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: ".",
      render: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.changeDots(), 300);
    setTimeout(() => this.setState({render: true}) , 500); // dont show unless loading for more than .5 sec
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeDots() {
    let dots = this.state.dots;
    switch (dots.length) {
      case 0:
        dots = ".";
        break;
      case 1:
        dots = "..";
        break;
      case 2:
        dots = "...";
        break;
      case 3:
        dots = "";
        break;
    }
    this.setState({ dots: dots });
  }

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
    if(this.state.render==false) return null;
    return (
      <div style={styles.wrapper}>
        <div style={styles.loadingText}>
          loading
          <div>{this.state.dots}</div>
        </div>
      </div>
    );
  }
}

export default Loading;
