import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "../checkList/list/List";
import AddItem from "../checkList/addItem/AddItem";
import axios from "axios";
import "./TodoItem.css";

export class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheckList: false,
      listItems: []
    };
    this.showList = this.showList.bind(this);
  }

  getCheckList = id => {
    axios
      .get(`http://localhost:1234/api/todos/${id}/checkList`)
      .then(response => {
        this.setState({ listItems: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addListItem = (id, item) => {
    axios
      .post(`http://localhost:1234/api/todos/${id}/checkList`, item)
      .then(response => {
        this.getCheckList();
        this.setState("data", { listItems: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  showList(e) {
    e.preventDefault();

    console.log("todo", this.props.todo);

    const id = this.props.todo.id;

    this.getCheckList(id);

    this.setState(prevState => ({ showCheckList: !prevState.showCheckList }));
  }

  render() {
    const { id, title } = this.props.todo;
    const items = this.state.listItems;
    return (
      <div>
        <div className="todo-items" style={this.getStyle()}>
          <p className="p">
            <input
              type="checkbox"
              onChange={this.props.markComplete.bind(this, id)}
            />
            {title}
            <button className="checklist-button" onClick={this.showList}>
              >
            </button>
            <AddItem
              addListItem={this.addListItem}
              todoId={this.props.todo.id}
            />
            <button
              className="delete-button"
              onClick={this.props.delTodo.bind(this, id)}
            >
              X
            </button>
          </p>
        </div>
        {this.state.showCheckList ? (
          <List listItems={this.state.listItems} />
        ) : null}
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
