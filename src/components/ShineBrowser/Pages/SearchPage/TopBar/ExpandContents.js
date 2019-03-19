import React, { Component } from "react";
import { close, upArrow } from '../../../../../img';
class ExpandContents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeItem(item){
    this.props.handleCheckSection(item, false);
  }

  render() {
    return (
      <React.Fragment>
      <br/>
      <table style={{width: '100%', padding: 8}}>
        <thead>
          <tr >
            <td style={this.styles.header}align='left'>Name</td>
            {/* <td style={this.styles.header}align='center'>Remove</td> */}
          </tr>
        </thead>
        <br/>
        <tbody>
          {this.props.selectedSections.map((item, index) => {
            return(
              <tr style={{backgroundColor: index%2==0 ? 'transparent': 'rgba(0,0,0,.03)' , padding: 3}}>
                <td>{item.name}</td>
                <td align='center'><img onClick={() => this.removeItem(item)} src={close} style={this.styles.close} class='shineRemoveButton' /></td>
              </tr>
            )
          })}
        </tbody>
      </table>

        <img class="shineUpArrow" src={upArrow} style={this.styles.upImg} onClick={() => this.props.toggleExpand()} />
      </React.Fragment>
    );
  }
  styles = {
    upImg: {
      height: 40,
      width: 40,
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translate(-50%,0)"
    },
    close: {
      height: 15,
      width: 15,
      padding: 4,
      cursor: 'pointer'
    },
    header: {
      color: this.props.styles.lightText
    }
  };
}


export default ExpandContents;
