import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./Components/todos/Todos";
import AddTodo from "./Components/addTodo/AddTodo";
import Header from "./Components/Layout/Header";
import About from "./Components/Pages/About";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    todos: []
  };

  getTodos = () => {
    axios
      .get(`http://localhost:1234/api/todos`)
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(err => {
        console.log("error");
      });
  };

  componentDidMount() {
    this.getTodos();
  }

  // Toggle complete
  markComplete = id => {
    this.setState({
      todo: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    axios
      .delete(`http://localhost:1234/api/todos/${id}`)
      .then(response => {
        this.getTodos();
      })
      .catch(err => console.log("Error"));
  };

  addTodo = todo => {
    axios
      .post(`http://localhost:1234/api/todos`, todo)
      .then(response => {
        this.getTodos();
        this.setState("data", { todos: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <AddTodo {...props} addTodo={this.addTodo} />
                <Todos
                  {...props}
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </div>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
