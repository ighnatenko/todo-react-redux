import React, { Component } from 'react';
import Deadline from '../Deadline/Deadline';
import Comments from '../../containers/Comments/Comments';
import { Popover, } from 'reactstrap';
import './Task.css';
import moment from 'moment';
import ReactModal from 'react-modal';

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

  componentWillMount() {
    ReactModal.setAppElement('body');
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

  handleOpenModal = () => {
    this.setState({ isShowComments: true });
  }
  
  handleCloseModal = () => {
    this.setState({ isShowComments: false });
  }

  render() {
    let input = null;
    if (this.state.isEdit) {
      input = (
        <form className='task_input_form'>
          <input value={this.state.value} onChange={this.changeHandler} className='task_row_input'/>
          <div>
            <button type="button" onClick={this.saveHandler} className="btn btn-success">Save</button>
            <button type="button" onClick={this.cancelHandler} className="btn btn-default">Cancel</button>
          </div>
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

    let titleClass = 'task_title';
    if (this.state.isDone) {
      titleClass = 'task_title_line';
    }

    return(
      <div>
        <div className='task'>
          <div className='glyphicon glyphicon-arrow-up' onClick={this.props.upPositionHandler}></div>
          <div className='glyphicon glyphicon-arrow-down' onClick={this.props.downPositionHandler}></div>
          <input className="task_checkBox" type="checkbox" checked={this.state.isDone} onChange={this.changeDoneHandler}/>
          <div className='title_date'>
            <div className={titleClass}>{this.props.title}</div>
            <div className='task_date'>{date}</div>
          </div>
          
          <div className='message_count'>{this.props.msgCount}</div>
          <div className='glyphicon glyphicon-cloud-download messages' onClick={this.toggleCommentsHandler} id='task_comment'></div>
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
  
        <ReactModal
          className='comments_modal'
          isOpen={this.state.isShowComments}
          contentLabel="Minimal Modal Example">
          <div className='comments_header'>
            <p className='add_comment_title'>Add Comment</p>
            <div className='glyphicon glyphicon-remove comment_close' onClick={this.handleCloseModal}></div>
          </div>
          {commentsList}
        </ReactModal>
      </div>
    );
  }
}

export default Task;