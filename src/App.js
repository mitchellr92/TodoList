import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import Header from "./Components/Layout/Header";
import About from "./Components/Pages/About";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    todos: []
    // {
    //   id: uuid.v4(),
    //   title: "Take out the trash",
    //   completed: false
    // },
    // {
    //   id: uuid.v4(),
    //   title: "Dinner with wife",
    //   completed: false
    // },
    // {
    //   id: uuid.v4(),
    //   title: "Meeting with boss",
    //   completed: false
    // }
  };

  getTodos = () => {
    axios
      .get(`http://localhost:1000/api/todos`)
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
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addTodo = todo => {
    console.log('todo --->', todo)
    axios
      .post(`http://localhost:1000/api/todos`, todo)
      .then(response => {
        this.getTodos();
        this.setState('data', { todos: response.data });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // };
    // this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className="App">
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
        </div>
      </Router>
    );
  }
}

export default App;
