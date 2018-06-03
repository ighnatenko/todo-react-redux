import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      val: this.props.val
    }
  }

  editHandler = () => {
    this.setState({ edit: true });
  }

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({ val: e.target.value });
  }

  saveHandler = (e) => {
    e.preventDefault();
    this.props.edited(this.state.val);
    this.setState({ edit: false });
  }

  cancelHandler = (e) => {
    e.preventDefault();
    this.setState({ edit: false });
  }

  showTasksHandler = () => {
    this.props.fetchTasks(this.props.projectID);
  }

  render() {
    let input = (
      <div>
        <div onClick={this.showTasksHandler}>show</div>
        <strong>{this.state.val}</strong>
        <div onClick={this.props.deleted}>delete</div>
        <div onClick={this.editHandler}>edit</div>
      </div>);

   if (this.state.edit) {
    input = (
      <form>
        <input value={this.state.val} onChange={(e) => this.changeHandler(e)}/>
        <button onClick={this.saveHandler}>Save</button>
        <button onClick={this.cancelHandler}>Cancel</button>
      </form>
    );
   }

   return(
     <div>
       {input}
     </div>
   );
  }
};

const mapStateToProps = state => {
  return {
    tasks: state.project.tasks,
    loading: state.project.loading,
    error: state.project.error,
    success: state.project.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: (projectID) => dispatch(actions.fetchTasks(projectID)),
    // addTaskItem: (title) => dispatch(actions.addTaskItem(title)),
    // deleteTaskItem: (id, index) => dispatch(actions.deleteTaskItem(id, index)),
    // editTaskItem: (id, title, index) => dispatch(actions.editTaskItem(id, title, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);