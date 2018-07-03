import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Project from '../../components/Project/Project';
import './Projects.css';

class Projects extends Component {
  state = {
    projectTitle: ''
  }

  componentDidMount () {
    if (this.props.projects.length === 0) {
      this.props.fetchProjects();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    if (this.props.loading) return;
    this.props.addProjectItem(this.state.projectTitle);
    this.setState({projectTitle: ''});
  }

  inputChangedHandler = (event) => {
    this.setState({projectTitle: event.target.value});
  }

  deleteProjectHandler = (id) => {
    if (this.props.loading) return;
    this.props.deleteProjectItem(id)
  }

  editProjectHandler = (id, title) => {
    if (this.props.loading) return;
    this.props.editProjectItem(id, title)
  }

  render() {
    let spiner = null;
    if (this.props.loading) {
      spiner = <p>Loading ...</p>;
    }
    
    let projects = this.props.projects.map((project, index) => (
      <Project
        key={project.id}
        value={project.title}
        projectID={project.id}
        deleted={() => this.deleteProjectHandler(project.id)}
        edited={(title) => this.editProjectHandler(project.id, title)} />
      ))
    
    return (
      <div>
        <div className='projects'>
          <p className='title_projects'>Projects</p>
          {projects}
          {spiner}
          <form onSubmit={this.submitHandler} className='new_project'>
            <input placeholder='Enter Project Name ...' value={this.state.projectTitle} onChange={this.inputChangedHandler} />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    loading: state.projects.loading,
    error: state.projects.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(actions.fetchProjects()),
    addProjectItem: (title) => dispatch(actions.addProjectItem(title)),
    deleteProjectItem: (id) => dispatch(actions.deleteProjectItem(id)),
    editProjectItem: (id, title) => dispatch(actions.editProjectItem(id, title))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);