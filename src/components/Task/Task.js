import React, { Component } from 'react';
import Deadline from '../Deadline/Deadline';
import Comments from '../../containers/Comments/Comments';
import { Popover, } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Task.css';
import moment from 'moment';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      value: props.title,
      isShowComments: false,
      isDone: props.isDone,
      isOpenDeadline: false
    }
  }

  editHandler = () => {
    this.setState((prevState, props) => {
      return { isEdit: !prevState.isEdit }
    });
  }

  saveHandler = (e) => {
    e.preventDefault();
    this.props.edited({title: this.state.value});
    this.setState({isEdit: false});
  }

  cancelHandler = (e) => {
    e.preventDefault();
    this.setState({isEdit: false});
  }

  changeHandler = (e) => {
    this.setState({value: e.target.value});
  }

  changeDoneHandler = event => {
    this.setState({isDone: event.target.checked})
    this.props.edited({done: !this.state.isDone});
  }

  submitDateHandler = (date) => {
    this.setState({isOpenDeadline: false});
    this.props.edited({expiration_date: date});
  }

  toggleDeadlineHandler = () => {
    this.setState((prevState, props) => { return { isOpenDeadline: !prevState.isOpenDeadline } });
  }

  toggleCommentsHandler = () => {
    this.setState((prevState, props) => { return { isShowComments: !prevState.isShowComments } });
  }

  render() {
    let input = null;
    if (this.state.isEdit) {
      input = (
        <form>
          <input value={this.state.value} onChange={this.changeHandler}/>
          <button onClick={this.saveHandler}>Save</button>
          <button onClick={this.cancelHandler}>Cancel</button>
        </form>
      );
    }

    let date = null;
    if (this.props.date) {
      date = moment(this.props.date.toString()).format('DD/MM/YYYY');
    }

    let commentsList = null;
    if (this.state.isShowComments) {
      commentsList = <Comments taskID={this.props.taskID} projectID={this.props.projectID} />
    }

    return(
      <div>
         <div className='Task'>
          <div>
            <div className='glyphicon glyphicon-arrow-up' onClick={this.props.upPositionHandler}></div>
            <div className='glyphicon glyphicon-arrow-down' onClick={this.props.downPositionHandler}></div>
          </div>
          <div>{this.props.index}</div>
          <input id="checkBox" type="checkbox" checked={this.state.isDone} onChange={this.changeDoneHandler}/>
          <div className='title_date'>
            <div >{this.props.title}</div>
            <div>{date}</div>
          </div>
          
          <div className='message_count'>{this.props.msgCount}</div>
          <div className='glyphicon glyphicon-cloud-download messages' onClick={this.toggleCommentsHandler} id={'comments-' + this.props.taskID}></div>
          <div className='glyphicon glyphicon-time deadline' onClick={this.toggleDeadlineHandler} id={'deadline-' + this.props.taskID}></div>
          <div className='glyphicon glyphicon-pencil edit' onClick={this.editHandler}></div>
          
          <div className='glyphicon glyphicon-trash trash' onClick={this.props.deleted}></div>
          </div> 
        {input}

        <Popover placement='bottom' isOpen={this.state.isOpenDeadline} target={'deadline-' + this.props.taskID} toggle={this.toggleDeadlineHandler}>
          <Deadline
          date={this.props.date}
          closed={this.toggleDeadlineHandler} 
          dateChanged={(date) => this.submitDateHandler(date)} />
        </Popover>

        <Modal isOpen={this.state.isShowComments} fade={false} toggle={this.toggleCommentsHandler} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}>
          <ModalHeader toggle={this.toggleCommentsHandler}>Modal title</ModalHeader>
          <ModalBody>
            {commentsList}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Task;