import React, { Component } from 'react';
import Task from '../../components/Task/Task';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Tasks extends Component {
  state = {
    edit: false,
    taskTitle: ''
  }

  componentDidMount () {
    this.props.fetchTasks(this.props.projectID);
  }

  downPositionHandler = (index) => {
    let tasks = JSON.parse(JSON.stringify(this.props.tasks));
    let items = tasks[this.props.projectID];
    if (index !== items.length-1) {
      let current = items[index];
      let next = items[index + 1];
      this.changeIndexTasks(current, next);

      let currentTask = items[index];
      let prevTask = items[index + 1];
      items[index] = prevTask;
      items[index + 1] = currentTask;

      this.props.sortingTaskItems(this.props.projectID, [current, next], tasks);
    }
  }

  upPositionHandler = (index) => {
    let tasks = JSON.parse(JSON.stringify(this.props.tasks));
    let items = tasks[this.props.projectID];
    if (index !== 0) {
      let current = items[index];
      let next = items[index - 1];
      this.changeIndexTasks(current, next);

      let currentTask = items[index];
      let prevTask = items[index - 1];
      items[index] = prevTask;
      items[index - 1] = currentTask;

      this.props.sortingTaskItems(this.props.projectID, [current, next], tasks); 
    }
  }

  changeIndexTasks = (firstItem, secondItem) => {
    const tempIndex = firstItem.index; 
    firstItem.index = secondItem.index;
    secondItem.index = tempIndex;
  }

  inputTaskHandler = (e) => {
    this.setState({taskTitle: e.target.value});
  }

  submitTaskHandler = (e) => {
    e.preventDefault();
    if (!this.props.loading) {
      let position = 1;
      if (this.props.tasks[this.props.projectID].length > 0) {
        let tasks = this.props.tasks[this.props.projectID];
        position = tasks[tasks.length-1].index + 1;
      }
      this.props.addTaskItem(this.state.taskTitle, position, this.props.projectID);
      this.setState({taskTitle: ''});
    }
  }

  render() {
    let loading = null;
    if (this.props.loading) {
      loading = <p>Loading...</p>;
    }

    let tasks = null;
    if (this.props.projectID in this.props.tasks) {
      tasks = this.props.tasks[this.props.projectID].map((task, index) => (
        <Task
          key={task.id}
          taskID={task.id}
          projectID={this.props.projectID}
          title={task.title}
          index={task.index}
          date={task.expiration_date}
          isDone={task.done}
          msgCount={task.comments != null ? task.comments.length : 0}
          deleted={() => this.props.deleteTaskItem(task.id, this.props.projectID)}
          edited={(data) => this.props.editTaskItem(task.id, this.props.projectID, data)}
          downPositionHandler={() => this.downPositionHandler(index)}
          upPositionHandler={() => this.upPositionHandler(index)}
          />
        ))
    }
    
    return(
      <div>
        {tasks}
        {loading}
        <form onSubmit={this.submitTaskHandler}>
          <input placeholder='Enter Task Name ...' value={this.state.taskTitle} onChange={this.inputTaskHandler} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    loading: state.tasks.loading,
    error: state.tasks.error,
    success: state.tasks.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: (projectID) => dispatch(actions.fetchTasks(projectID)),
    addTaskItem: (title, position, projectID) => dispatch(actions.addTaskItem(title, position, projectID)),
    deleteTaskItem: (taskID, projectID) => dispatch(actions.deleteTaskItem(taskID, projectID)),
    editTaskItem: (taskID, projectID, data) => dispatch(actions.editTaskItem(taskID, projectID, data)),
    sortingTaskItems: (projectID, items, tasks) => dispatch(actions.sortingTaskItems(projectID, items, tasks))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);