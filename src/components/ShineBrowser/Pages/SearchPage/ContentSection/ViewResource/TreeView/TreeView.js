import React, { Component } from "react";
import { Treebeard } from "./Treebeard";
// import { Treebeard } from "react-treebeard";
import decorators from "./Treebeard/TreebeardDecorators";
import TreebeardStyles from "./Treebeard/TreebeardStyles";

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resources != this.props.resources) {
      this.setFormattedResources();
    }
  }

  onToggle(node, toggled) {
    const { cursor } = this.state;
    if (cursor) cursor.active = false;
    node.active = true;
    if (node.children) node.toggled = toggled;
    this.setState({ cursor: node });
    this.props.setActiveNode(node);
    // this.getResourceSections(node);
    // console.log(node);
  }

  onCheck(node, value, e) {
    e.stopPropagation();
    this.props.handleCheckSection(node, value, e);
  }

  formatItem(item) {
    // take api item and return it formatted for treebeard
    let body = {
      name: item.name,
      id: item.uuid, // key for react
      uuid: item.uuid,
      uri: item.uri,
      children: null // for react-treebeard to render children
    };
    if (item.parentUuid) body.parentUuid = item.parentUuid;
    return body;
    // if(item.typeOfData=='resource') body.loading = true;
  }

  // take this.props.resources and format it into a treebeard compatible nested arrays data structure
  // and set it to state.
  setFormattedResources() {
    let children = [];
    let items = [];
    this.props.resources.forEach(item => {
      let formattedItem = this.formatItem(item);
      if (item.parentUuid == null) items.push(formattedItem);
      else children.push(formattedItem);
    });

    // searches parentItemsArray for a parent. if found, returns new parent array with child added, and removes child from the "children" array defined above
    let insertIntoParent = (child, childIndex, parentItemsArray) => {
      //parse nested array structure of items and find parent, insert child where appropriate
      parentItemsArray.forEach((parentItem, parentIndex) => {
        if (parentItem.uuid == child.parentUuid) {
          if (!parentItem.children) parentItemsArray[parentIndex].children = [];
          parentItemsArray[parentIndex].children.push(child);
          children.splice(childIndex, 1);
        } else if (parentItem.children != null) {
          parentItemsArray[parentIndex].children = insertIntoParent(child, childIndex, parentItem.children);
          // console.log("going deeper");
        }
      });
      return parentItemsArray;
    };

    // should never go past ~10 or so loops depending on how deeply the items are nested. num is just incase so it doesnt freze the app
    // each loop can only set 1 generation deeper. keep looping until all generations are set.
    let num = 1;
    while (children.length > 0 && num < 500) {
      num = num + 1;
      children.forEach((child, childIndex) => (items = insertIntoParent(child, childIndex, items)));
    }

    // use this object if root should be collapsible. otherwise just use items array
    // let data = {
    //   name: "sections",
    //   toggled: true,
    //   children: items,
    // };
    this.setState({ data: items });
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.data ? (
          <Treebeard
            data={this.state.data}
            isChecked={this.props.isChecked}
            decorators={decorators}
            onToggle={this.onToggle}
            style={TreebeardStyles}
            onCheck={this.onCheck.bind(this)}
          />
        ) : null}
      </div>
    );
  }
  styles = {
    wrapper: {
      flex: ".32",
      padding: 8,
      paddingRight: 0
    }
  };
}

export default TreeView;
