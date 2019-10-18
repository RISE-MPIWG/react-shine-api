import React, { Component } from "react";
import { logoHeader, close } from '../../../img';

class Navbar extends Component {
  render() {
    let { page } = this.props;

    let styles = {
      navbar: {
        backgroundColor: this.props.styles.headerBG,
        borderBottom: '1px solid #f2f2f2',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50,
        zIndex: 5,
      },
      navInside: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      right: {
        justifySelf: 'flex-end',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        height: '100%'
      },
      logo: {
        height: 50,
        marginRight: 20,
        padding: 12,
        boxSizing: 'border-box'
      },
      link: {
        cursor: 'pointer',
        padding: 5,
        marginRight: 25,
        color: this.props.styles.lightText
      },
    }
    let activeLink = {...styles.link, color: '#000', fontWeight: 'bold'};
    return (
      <div style={styles.navbar}>
      <div style={styles.navInside}>
        <a href="https://rise.mpiwg-berlin.mpg.de/" target='_blank' class='riseLogoWrapper'>
          <img src={logoHeader} style={styles.logo} />
        </a>
        <span style={this.props.page=='home' ? activeLink : styles.link} onClick={() => this.props.navigate("home")}>
          Home
        </span>

        <span style={this.props.page=='search' ? activeLink : styles.link} onClick={() => this.props.navigate("search")}>
          Search
        </span>

        {/*{this.props.loggedInUser ? (
          <span style={styles.link} onClick={() => this.props.navigate("logout")}>
            Log Out
          </span>
        ) : (
          <span style={this.props.page=='login' ? activeLink : styles.link} onClick={() => this.props.navigate("login")}>
            Sign In
          </span>
        )}
        <span style={styles.right}>
          {this.props.loggedInUser ? <span style={styles.link}>{this.props.loggedInUser.email}</span> : null}
          {this.props.close ?
          <img onClick={this.props.close} src={close} class="closeIcon" />
          :null}
        </span> */}
      </div>
      </div>
    );
  }
}

export default Navbar;
