import React, { Component } from 'react';

class Task extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.text = props.info.name;
    this.state.age = props.info.age;
    this.state.sex = props.info.sex;
    this.state.bio = props.info.bio;

    this.state.editing = false;
  }

  textClickHandler = () => {
    console.log('text click');
    this.setState({
      editing: true
    });
  }

  saveClickHandler = () => {
    console.log('save');
    this.setState({
      editing: false
    });
    this.props.editTaskHandler(this.props.info._id, this.state.text);
  }

  inputChangeHandler = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    let cardContent;


    cardContent = (
      <div className="mb-3">
        <p className="card-text" onClick={this.textClickHandler}>
          Name: {this.state.text}
        </p>
        <p className="card-text" onClick={this.textClickHandler}>
          Sex: {this.state.sex}
        </p>
        <p className="card-text" onClick={this.textClickHandler}>
          Age: {this.state.age}
        </p>
        <p className="card-text" onClick={this.textClickHandler}>
          Bio: {this.state.bio}
        </p>
      </div>
    );

    
    let seeButton;

    seeButton = (<a href="#" onClick={() => {}} className="btn btn-outline-success task-save-button">Посмотреть</a>);

    return (
      <div className="col col-12 col-md-6 col-lg-4">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            {cardContent}
            {seeButton}
          </div>
        </div>
      </div>
    );
  }
}

export default Task;