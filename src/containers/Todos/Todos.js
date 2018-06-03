import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Project from '../../components/Project/Project';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTitle: ''
    }
  }

  componentDidMount () {
    if (this.props.todos.length === 0) {
      this.props.fetchTodos();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.todoTitle);
    this.setState({todoTitle: ''});
  }

  inputChangedHandler = (event) => {
    this.setState({ todoTitle: event.target.value });
  }

  deleteHandler = (event, id, index) => {
    event.preventDefault();
    
    const items = [...this.props.todos];
    items.splice(index, 1);
    this.props.deleteTodoItem(id, items);
  }

  editHandler = (id, index, title) => {
    this.props.editTodoItem(id, title, index);
  }

  render() {
    let loading = <p>Loading ...</p>
    if (!this.props.loading) {
      loading = null;
    }

    let todos = this.props.todos.map((todo, index) => (
      <Project 
        key={todo.id}
        val={todo.title}
        projectID={todo.id}
        deleted={(event) => this.deleteHandler(event, todo.id, index)}
        edited={(title) => this.editHandler(todo.id, index, title)} />
     ))

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input placeholder='Enter Project Name ...' value={this.state.todoTitle} onChange={this.inputChangedHandler} />
          <Button btnType="Success">SUBMIT</Button>
        </form>
        {loading}
        {todos}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    loading: state.todos.loading,
    error: state.todos.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(actions.fetchTodos()),
    addTodo: (title) => dispatch(actions.addTodo(title)),
    deleteTodoItem: (id, index) => dispatch(actions.deleteTodoItem(id, index)),
    editTodoItem: (id, title, index) => dispatch(actions.editTodoItem(id, title, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);