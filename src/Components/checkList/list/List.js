import React, { Component } from "react";
import ListItem from "../listItem/ListItem";

export class List extends Component {
  render() {
    console.log(this.props.listItems)
    return (
        this.props.listItems.map(item => <ListItem key={item.id} item={item} />)
    );
  }
}

export default List;
