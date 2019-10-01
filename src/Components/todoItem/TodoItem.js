import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "../checkList/list/List";
import "./TodoItem.css";

export class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheckList: false,
      listItems: [1, 2, 3]
    };
    this.showList = this.showList.bind(this);
  }

  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  showList(e) {
    e.preventDefault();

    this.setState(prevState => ({ showCheckList: !prevState.showCheckList }));
  }

  render() {
    const { id, title } = this.props.todo;
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
