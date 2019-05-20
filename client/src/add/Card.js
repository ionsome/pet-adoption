import React, { Component } from 'react';

class Card extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.name = props.info.name;
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
    this.setState({
      editing: false
    });
    this.props.editCardHandler(this.props.info._id, this.state);
  }

  render() {
    let cardContent;

    if (this.state.editing) {
      cardContent = (
        <div className="mb-3">
          <p className="card-text">
            <input onChange={(event) => { this.setState({ name: event.target.value }) }} value={this.state.name} className="form-control mr-sm-2" type="text" />
          </p>
          <p className="card-text" onClick={this.textClickHandler}>
            Sex: {this.state.sex}
          </p>
          <p className="card-text" onClick={this.textClickHandler}>
            Age: {this.state.age}
          </p>
          <p className="card-text" onClick={this.textClickHandler}>
            <input onChange={(event) => { this.setState({ bio: event.target.value }) }} value={this.state.bio} className="form-control mr-sm-2" type="text" />
          </p>
        </div>
      );
    } else {
      cardContent = (
        <div className="mb-3">
          <p className="card-text" onClick={this.textClickHandler}>
            Name: {this.state.name}
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
    }

    let saveButton;

    if (this.state.editing) {
      saveButton = (<a href="#" onClick={this.saveClickHandler} className="btn btn-outline-success task-save-button">Сохранить</a>);
    }

    return (
      <div className="col col-12 col-md-6 col-lg-4">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            {cardContent}
            <a href="#" onClick={(e) => { this.props.deleteCardHandler(this.props.info._id) }} className="btn btn-danger">Удалить</a>
            {saveButton}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;