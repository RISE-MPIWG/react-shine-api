import React, { Component } from 'react'

import ShineBrowser from 'react-shine-api';

export default class App extends Component {

  handleFileUpload(files){
    console.log('file upload')
    console.log(files)
    files.forEach(file => console.log('file contnet length: '+file.content.length))
  }

  render () {
    return (
      <div style={{height: 700, width: 1000, margin: 15, boxShadow: '0 0 3px 3px #ccc'}}>
        <ShineBrowser handleFileUpload={this.handleFileUpload.bind(this)} />
      </div>
    )
  }
}
