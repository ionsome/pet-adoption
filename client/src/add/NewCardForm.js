import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

class NewCardForm extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.setDefaultState();
    }

    addButtonClickHandler = () => {
        if (!this.validateData())
        {

            return;
        }

        this.props.addCardHandler(this.state);
        this.setDefaultState();
    }

    setDefaultState() {
        this.state.name = '';
        this.state.sex = 'Мальчик';
        this.state.age = '0-2';
        this.state.bio = '';
    }

    validateData() {
        return true;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">

                        <div className="col-md-6 col-lg-11 mb-3">
                            <input onChange={(event) => { this.setState({ name: event.target.value })}} value={this.state.name} className="form-control mr-sm-2" type="text" placeholder="Имя" />
                        </div>

                        <ButtonToolbar className='ml-3 mb-3'>
                            <ToggleButtonGroup  type="radio" name="sex" defaultValue="Мальчик"
                                value={this.state.sex}
                                onChange={(event) => {this.setState({ sex: event}); }}
                            >
                                <ToggleButton value="Мальчик">Мальчик</ToggleButton>
                                <ToggleButton value="Девочка">Девочка</ToggleButton>
                                <ToggleButton value="Неизвестно">Неизвестно</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>

                        <ButtonToolbar className='ml-3 mb-3'>
                            <ToggleButtonGroup type="radio" name="age" defaultValue="0-2"
                                value={this.state.age}
                                onChange={(event) => {this.setState({ age: event}); }}
                            >
                                <ToggleButton value="0-2">0-2</ToggleButton>
                                <ToggleButton value="3-6">3-6</ToggleButton>
                                <ToggleButton value="7+">7+</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>

                        <Form.Group controlId="exampleForm.ControlTextarea1" className="ml-3">
                            <Form.Control onChange={(event) => { this.setState({ bio: event.target.value })}} 
                            as="textarea" rows="4" placeholder="Информация о питомце (140 символов)" maxLength="140" 
                            name="bio" value={this.state.bio}/>
                        </Form.Group>
                    </div>

                    <div className="col col-4 col-md-6 col-lg-4">
                        <input type="file" name="file" onChange={this.onChangeHandler} />
                    </div>

                    <div className="col col-4 col-md-6 col-lg-4 ml-3">
                        <button onClick={this.addButtonClickHandler} className="btn btn-outline-success">Добавить</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCardForm;