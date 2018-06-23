import React, { Component } from 'react';
import './Project.css';
import Tasks from '../../containers/Tasks/Tasks';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      value: props.value,
      showTasks: false,
      taskTitle: ''
    }
  }

  editHandler = () => {
    this.setState({ edit: true });
  }

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  saveHandler = (e) => {
    e.preventDefault();
    this.props.edited(this.state.value);
    this.setState({ edit: false });
  }

  cancelHandler = (e) => {
    e.preventDefault();
    this.setState({ edit: false });
  }

  showTasksHandler = () => {
    this.setState((prevState, props) => { return { showTasks: !prevState.showTasks } });
  }

  render() {
    let showBtnClass="glyphicon glyphicon-triangle-right";
    if (this.state.showTasks) {
      showBtnClass="glyphicon glyphicon-triangle-bottom";
    }

    let input = (
      <div className='Project'>
        <span className={showBtnClass} aria-hidden="true" onClick={this.showTasksHandler} ></span>
        <div className='title' onClick={this.showTasksHandler}>{this.props.value}</div>
        <span className='glyphicon glyphicon-pencil edit' onClick={this.editHandler}></span>
        <span className='glyphicon glyphicon-trash trash' onClick={this.props.deleted}></span>
      </div>);

    let edit = null;
    if (this.state.edit) {
      edit = (
        <form>
          <input value={this.state.value} onChange={this.changeHandler}/>
          <button onClick={this.saveHandler}>Save</button>
          <button onClick={this.cancelHandler}>Cancel</button>
        </form>
      );
    }

    let tasks = null;
    if (this.state.showTasks) {
      tasks = <Tasks projectID={this.props.projectID} />
    }

    return(
      <div>
        {input}
        {edit}
        {tasks}
      </div>
    );
  }
};

export default Project;