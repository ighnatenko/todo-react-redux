import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: 'qq@q.ua',
    password: 'qqqqqqqq'
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }

  inputChangedHandler = (event, inputType) => {
    switch(inputType) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    let errorMessage = null;
    if (this.props.error !== null) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let spinner = null; 
    if (this.props.loading) {
      spinner = <p>Loading...</p>;
    }

    return(
      <div>
        {spinner}
        {/* {errorMessage} */}
        <form onSubmit={this.submitHandler}>
          <input value={this.state.email} onChange={(event) => this.inputChangedHandler(event, 'email')} />
          <input value={this.state.password} onChange={(event) => this.inputChangedHandler(event, 'password')} />
          <button>SUBMIT</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(actions.signIn(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);