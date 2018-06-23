import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Project from '../../components/Project/Project';
import './Projects.css';
import { Button } from 'reactstrap';

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
    this.props.addProjectItem(this.state.projectTitle);
    this.setState({projectTitle: ''});
  }

  inputChangedHandler = (event) => {
    this.setState({projectTitle: event.target.value});
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
        deleted={() => this.props.deleteProjectItem(project.id)}
        edited={(title) => this.props.editProjectItem(project.id, title)} />
      ))
    
    return (
      <div className='projects'>
        {projects}
        {spiner}
        <form onSubmit={this.submitHandler}>
          <input placeholder='Enter Project Name ...' value={this.state.projectTitle} onChange={this.inputChangedHandler} />
          <Button>SUBMIT</Button>
        </form>
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