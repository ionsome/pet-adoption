import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

class Card extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.name = props.info.name;
    this.state.age = props.info.age;
    this.state.sex = props.info.sex;
    this.state.bio = props.info.bio;
    this.state.photo = props.info.photo;
    this.state.imageData = '';

    this.loadPhoto();

    this.state.editing = false;
  }

  textClickHandler = () => {
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

  cancelClickHandler = () => {
    this.setState({
      editing: false
    });
  }


  loadPhoto = (name) => {
    if (!this.state.photo) {
      return;
    }
    fetch('http://localhost:3000/uploads/' + this.state.photo)
      .then((res) => res.json())
      .then((data) => {
        var base64Flag = 'data:' + data.img.contentType + ';base64,';
        var imageStr = this.arrayBufferToBase64(data.img.data.data);
        this.setState({ imageData: base64Flag + imageStr });
      })
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    let cardContent;

    let photoContent;
    if (this.state.imageData) {
      photoContent = (<img src={this.state.imageData} className="photo-box mb-2"></img>);
    }
    else {
      photoContent = '';
    }

    if (this.state.editing) {
      cardContent = (
        <div className="mb-3">
          <p className="card-text">
            <input onChange={(event) => { this.setState({ name: event.target.value }); }} value={this.state.name} className="form-control mr-sm-2" type="text" />
          </p>

          <ButtonToolbar className='mb-3'>
            <ToggleButtonGroup type="radio" name="sex"
              onChange={(event) => { this.setState({ sex: event }) }}
              value={this.state.sex}
            >
              <ToggleButton value="Мальчик">Мальчик</ToggleButton>
              <ToggleButton value="Девочка">Девочка</ToggleButton>
              <ToggleButton value="Неизвестно">Неизвестно</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

          <ButtonToolbar className='mb-3'>
            <ToggleButtonGroup type="radio" name="age"
              onChange={(event) => { this.setState({ age: event }) }}
              value={this.state.age}
            >
              <ToggleButton value="0-2">0-2</ToggleButton>
              <ToggleButton value="3-6">3-6</ToggleButton>
              <ToggleButton value="7+">7+</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

          <Form.Group>
            <Form.Control onChange={(event) => { this.setState({ bio: event.target.value }); }}
              as="textarea" rows="5" placeholder="Информация о питомце (140 символов)" maxLength="140"
              name="bio" value={this.state.bio} className="noresize" />
          </Form.Group>
        </div>
      );
    } else {
      cardContent = (
        <div className="mb-3">
          {photoContent}
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

    let removeButton;
    let saveButton;
    let cancelButton;

    removeButton = (<a href="#" onClick={(e) => { this.props.deleteCardHandler(this.props.info._id) }} className="btn btn-danger">Удалить</a>);

    if (this.state.editing) {
      saveButton = (<a href="#" onClick={this.saveClickHandler} className="btn btn-outline-success task-save-button">Сохранить</a>);
      cancelButton = (<a href="#" onClick={this.cancelClickHandler} className="btn btn-outline-info task-cancel-button">Отменить</a>);
    }

    return (
      <div className="col-md-5 col-lg-5" style={{ width: '25rem' }}>
        <div className="card">
          <div className="card-body col-xs-1" align="center">
            {cardContent}
            <div>
              {removeButton}
              {saveButton}
              {cancelButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;