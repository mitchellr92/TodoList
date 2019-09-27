import React, { Component } from "react";

export class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const newTodo = {
      title: this.state.title
    };

    this.props.addTodo(newTodo);

    this.setState({ title: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Todo..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
          onClick={this.onSubmit}
        />
      </form>
    );
  }
}

export default AddTodo;
