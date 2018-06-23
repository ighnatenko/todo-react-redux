import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Comment from '../../components/Comment/Comment';

const maxFileSize = 1048576;

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      selectedFile: null
    };
  }

  componentDidMount () {
    this.props.fetchComments(this.props.projectID, this.props.taskID);
  }

  selectFileHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
      
    });
    // console.log(event.target.files[0]);
    // console.log('SIZE = ' + event.target.files[0].size);
  }

  uploadHandler = () => {
    if (this.state.selectedFile != null && this.state.selectedFile.size > maxFileSize) {
      this.setState({selectedFile: null});
      return
    }
    
    let fd = new FormData()
    fd.append('content', this.state.content)
    fd.append('file', this.state.selectedFile)
    this.props.addComment(this.props.projectID, this.props.taskID, fd);
  }

  deleteHandler = (id, index) => {
    const items = [...this.props.comments];
    items.splice(index, 1);
    this.props.deleteCommentItem(this.props.projectID, this.props.taskID, id, items);
  }

  contentHandler = (event) => {
    this.setState({content: event.target.value});
  }

  render() {
    let spiner = null;
    if (this.props.loading) {
      spiner = <p>Loading...</p>
    }

    let comments = this.props.comments.map((item, index) => (
      <Comment
        key={item.id}
        content={item.content}
        createdDate={item.created_date}
        image={item.file.url}
        deleted={() => {this.deleteHandler(item.id, index)}} />
    ));

    return(
      <div className=''>
        <textarea value={this.state.content} onChange={this.contentHandler} />
        <input type='file' onChange={this.selectFileHandler} />
        <button onClick={this.uploadHandler}>Save</button>
        {spiner}
        {comments}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    loading: state.comments.loading,
    error: state.comments.error,
    success: state.comments.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: (projectID, taskID) => dispatch(actions.fetchComments(projectID, taskID)),
    addComment: (projectID, taskID, data) => dispatch(actions.addComment(projectID, taskID, data)),
    deleteCommentItem: (projectID, taskID, commentID, items) => dispatch(actions.deleteCommentItem(projectID, taskID, commentID, items))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);