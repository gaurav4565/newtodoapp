import React, { Component } from "react";
import axios from "axios";


class TodoApp extends Component {
  state = {
    todos: [],
    newTodo: "",
    filter: "all",
  };

  componentDidMount() {
    
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => {
        this.setState({ todos: response.data });
      });
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    if (this.state.newTodo.trim() === "") return; // Validate non-empty task name
    axios
      .post("https://jsonplaceholder.typicode.com/users/1/todos", {
        title: this.state.newTodo,
        completed: false,
      })
      .then((response) => {
        this.setState({
          todos: [...this.state.todos, response.data],
          newTodo: "",
        });
      });
  };

  toggleTodoCompletion = (id) => {
    
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        axios
          .put(`https://jsonplaceholder.typicode.com/users/1/todos/${id}`, {
            ...todo,
            completed: !todo.completed,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  editTodo = (id, newTitle) => {
    
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        axios
          .put(`https://jsonplaceholder.typicode.com/users/1/todos/${id}`, {
            ...todo,
            title: newTitle,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  deleteTodo = (id) => {
    
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/1/todos/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
  };

  setFilter = (filter) => {
    
    this.setState({ filter });
  };

  render() {
    const { todos, newTodo, filter } = this.state;
    const filteredTodos =
      filter === "completed" ? todos.filter((todo) => todo.completed) : todos;

    return (
      <div>
        <div className="header">
          <h1>Todo App</h1>
          <div>
            <input
              type="text"
              placeholder="Add a new task"
              value={newTodo}
              onChange={this.handleInputChange}
            />
            <button className="addBtn" onClick={this.addTodo}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-all">
          <button  className="btn-com" onClick={() => this.setFilter("all")}>All</button>
          <button  className="btn-com" onClick={() => this.setFilter("completed")}>Completed</button>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <li  key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "green" : "black",
                }}
                onClick={() => this.toggleTodoCompletion(todo.id)}
              >
                {todo.title}
              </span>
              <button className="btn"
                onClick={() =>
                  this.editTodo(todo.id, prompt("Edit Task", todo.title))
                }
              >
                Edit
              </button>
              <button className="btn-a" onClick={() => this.deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
