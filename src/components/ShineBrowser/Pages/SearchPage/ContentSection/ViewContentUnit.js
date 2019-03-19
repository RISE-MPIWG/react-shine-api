import React, { Component } from "react";
import { http } from "../../../../../Constants";
import Loading from "../../../Components/Loading";

class ViewContentUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentUnits: [],
      loading: false,
      currentPageLoaded: 1
    };
  }

  componentDidMount() {
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.section != this.props.section) {
      this.loadingNewContent = false;
      this.setState({
        contentUnits: [],
        currentPageLoaded: 1
      }, () => {
        this.getContentUnits();
      })
    }
  }

  getContentUnits() {
    this.setState({loading: true});
    http({
      url: `sections/${this.props.section.uuid}/content_units?per_page=25&page=${this.state.currentPageLoaded}`,
      method: "get",
      token: this.props.loggedInUser ? this.props.loggedInUser.token : null
    }).then(response => {
      this.setState({
        loading: false,
        contentUnits: this.state.contentUnits.concat(response),
      });
      this.loadingNewContent=false;
      if(response.length==0){
        this.loadingNewContent = true; //prevent any more attempts to load
      }
    });
  }

  handleScroll(e){
    if(e.target.scrollTop > e.target.scrollTopMax*.9 && !this.loadingNewContent){
      this.loadingNewContent = true;
      this.setState({ currentPageLoaded: this.state.currentPageLoaded+1}, () => {
        this.getContentUnits();
      })
    }
  }


  render() {
    if (!this.props.section) return null;

    return (
      <div style={this.styles.wrapper} onScroll={x => this.handleScroll(x)}>
      <div style={this.styles.inside}>
      {this.state.loading ? <Loading color={this.props.styles.lightText}/> : null}
        {this.state.contentUnits.length > 0 
          ? this.state.contentUnits.map(item => {
              return (
                <p key={item.uuid} style={this.styles.contentUnit}>
                  {item.content}
                </p>
              );
            })
          : null}
          <br/>
      </div>
      </div>
    );
  }

  styles = {
    wrapper: {
      flex: this.props.flex*.5,
      display: "flex",
      flexFlow: "column",
      position: 'relative',
      minHeight: 0,
      overflow: "auto",
      borderLeft: `5px solid ${this.props.styles.lightBG}`,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: this.props.styles.lightBG
    },
    contentUnit: {
      margin: 0
    },
    inside: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 8
    },
  };
}

export default ViewContentUnit;
