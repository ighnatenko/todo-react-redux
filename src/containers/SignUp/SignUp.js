import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: ''
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.signUp(this.state.email, this.state.password);
  }

  inputChangedHandler = (event, inputType) => {
    switch(inputType) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'confirm_password':
        this.setState({ confirm_password: event.target.value });
        break;  
      default:
        break;
    }
  }

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    let errorMessage = null;
    if (this.props.error !== null) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let spinner = null; 
    if (this.props.loading) {
      spinner = <p>Loading...</p>;
    }

    return (
      <div>
        {spinner}
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          <input value={this.state.email} onChange={(event) => this.inputChangedHandler(event, 'email')} />
          <input value={this.state.password} onChange={(event) => this.inputChangedHandler(event, 'password')} />
          <input value={this.state.confirm_password} onChange={(event) => this.inputChangedHandler(event, 'confirm_password')} />
          <button btnType="Success">SUBMIT</button>
        </form>

        <Link to='/sign_in'>SignIn</Link>
        <br />
        <Link to='/todos'>Todos</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password) => dispatch(actions.signUp(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);