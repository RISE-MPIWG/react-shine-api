import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleForward(){
    if(this.props.currentPage<this.props.totalPages){
      this.props.handleSelectPage(this.props.currentPage+1);
    }
  }

  handleBackward(){
    if(this.props.currentPage>1){
      this.props.handleSelectPage(this.props.currentPage-1);
    }
  }

  active = {
    backgroundColor: this.props.styles.primary,
    color: "white",
    borderRadius: this.props.styles.borderRadius
  }

  getPages(){
    let pages = [];
    if(this.props.totalPages>8){
      let start = 1;
      if(this.props.currentPage>3){
        start = this.props.currentPage-3;
      }
      for(let i=start; i<=this.props.totalPages; i++){
        if(
          (i==start+7) && (this.props.totalPages>=10) && i<this.props.totalPages-1
        ){
          pages.push(<a style={styles.dots}>...</a>)
          i=this.props.totalPages;
        }
        let className = null;
        let linkStyle = styles.link;
        if(i===this.props.currentPage){
          linkStyle = {...styles.link, ...this.active};
          className = 'active';
        }
        pages.push(<a className={className} style={linkStyle} onClick={() => this.props.handleSelectPage(i)}>{i}</a>)
      }
    }else{

      for(let i=1; i<=this.props.totalPages; i++){
        let className = null;
        let linkStyle = styles.link;
        if(i===this.props.currentPage){
          linkStyle = {...styles.link, ...this.active};
          className = 'active';
        }
        pages.push(<a className={className} style={linkStyle} onClick={() => this.props.handleSelectPage(i)}>{i}</a>)
      }
    }
    return pages;
  }


  render() {
    return (
      <div style={styles.wrapper}>
        <div class="shinePagination">
          <a style={styles.link} onClick={this.handleBackward.bind(this)}>&laquo;</a>
          {this.getPages()}
          <a style={styles.link} onClick={this.handleForward.bind(this)}>&raquo;</a>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    // flex: 1,
    // justifySelf: "center",
    // alignSelf: "center",
    // width: '100%',
    // marginTop: "auto",
    // position: 'relative',
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 5
  },
  shinePagination: {
    flexDirection: 'row',
    display: 'flex'

  },
  dots: {
    color: "black",
    display: "inline-block",
    
    padding: "8px 2px",
    textDecoration: "none",
  },
  link: {
    display: "inline-block",

    color: "black",
    padding: "8px 12px",
    textDecoration: "none",
    cursor: 'default',
    minWidth: 42,
    boxSizing: 'border-box',
    textAlign: 'center'

  },

};

export default Pagination;
