# react-shine-api
This is a react component that allows users to browse the [SHINE API](https://rise.mpiwg-berlin.mpg.de/collections). It allows selection of files, and passes the selected files through to your app. View a demo [here](http://react-shine-api-test.s3-website-us-east-1.amazonaws.com/). This project was created using [create-react-library](https://www.npmjs.com/package/create-react-library)

### Installation
```sh
$ npm install --save react-shine-api
```

### Usage
You will need to whitelist the IP address this app will be at with MPIWG before it will be allowed to connect to the SHINE API. To do this, please contact pbelouin@mpiwg-berlin.mpg.de

```jsx
import React, { Component } from "react";
import ShineBrowser from "react-shine-api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShine: true
    };
  }

  close() {
    this.setState({ showShine: false });
  }

  handleFileUpload(files){
    console.log('Files: ', files);
  }

  render() {
    return (
      <div>
        <div style={{
            maxWidth: 1000,
            height: 700,
            margin: "auto",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)"
        }}>
          {this.state.showShine ? (
            <ShineBrowser
              styles={{
                primary: "#427af4"
              }}
              close={this.close.bind(this)}
              handleFileUpload={this.handleFileUpload.bind(this)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
```
### Props for <ShineBrowser /> 
| Props |  |
| ------ | ------ |
| styles | customizable styles object (see below for details) |
| close | optional. function that gets called when the user attempts to close the SHINE window. Setting this prop will display an X button in the upper corner  |
| handleFileUpload | function that is called when the user is ready to upload their files. passes a files object (see below) |

### File Object
An array of objects with the following structure
```json
{
    id: "54d1dsf4-8bc9-4ee3-9abd-9256fe684cd",
    name: "孝義",
    parentUuid: "743711b7-c294-4619-90b3-963792248de4",
    uri: "https://urlname.com/4risesections/5379669",
    uuid: "54d174f4-8bc9-4ee3-9abd-924239e684cd"
}
```

### Styling
This component will take 100% height and width of its container. You can customize the styles by supplying the styles object detailed below to the <ShineBrowser /> component. 

| Styles |  |
| ------ | ------ |
| borderRadius | border-radius of buttons, boxes, inputs, etc. throughout the app |
| primary | primary color used for buttons and actionable items throughout the app |
| headerBG | main header background color |
| lightBG | light background color |
| text | main text color |
| lightText | secondary text color |
| fontFamily | font family used throughout - default is "Calibri" |
| selectedItemsBackgroundColor | background color of the expandable header in the search screen |

### Development
Run the below command to start the server for the react-shine-api module
```
$ cd react-shine-api
$ npm start
```
Next, (in a seperate terminal) run the below commands to start the example project that wraps the component. When you make changes, you will see them updated in this project.
```
$ cd react-shine-api/example
$ npm start
```

### Deployment
rollup will automatically bundle the module and publish it on the below command
```
$ npm publish
```

### License
This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details