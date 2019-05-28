import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import collar from '../images/collar.png';

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
            <div>
                <div className="text-center">
                    <img src={collar} height='80'className="mt-3"></img>
                    <h2 className="mt-3">Новый подопечный</h2>
                    <p className="lead">Здесь Вы можете заполнить форму о Вашем подопечном, который ищет новый дом.</p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-8">
                            <div className="mb-3">
                                <label for="name">Кличка</label>
                                <input onChange={(event) => { this.setState({ name: event.target.value })}} value={this.state.name} className="form-control mr-sm-2" type="text" placeholder="Кличка" id="name"/>
                            </div>

                            <label for="sex" >Пол</label>
                            <ButtonToolbar className='mb-3' id="sex">
                                <ToggleButtonGroup  type="radio" name="sex" defaultValue="Мальчик"
                                    value={this.state.sex}
                                    onChange={(event) => {this.setState({ sex: event}); }}
                                >
                                    <ToggleButton value="Мальчик">Мальчик</ToggleButton>
                                    <ToggleButton value="Девочка">Девочка</ToggleButton>
                                    <ToggleButton value="Неизвестно">Неизвестно</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                            
                            <label for="age" >Возраст</label>
                            <ButtonToolbar className='mb-3' id="age">
                                <ToggleButtonGroup type="radio" name="age" defaultValue="0-2"
                                    value={this.state.age}
                                    onChange={(event) => {this.setState({ age: event}); }}
                                >
                                    <ToggleButton value="0-2">0-2</ToggleButton>
                                    <ToggleButton value="3-6">3-6</ToggleButton>
                                    <ToggleButton value="7+">7+</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>

                            <label for="bio" >Дополнительная информация</label>
                            <Form.Group id="bio">
                                <Form.Control onChange={(event) => { this.setState({ bio: event.target.value })}} 
                                as="textarea" rows="5" placeholder="Информация о питомце (140 символов)" maxLength="140" 
                                name="bio" value={this.state.bio} className="noresize"/>
                            </Form.Group>

                            <label for="file" >Фотография питомца</label>
                            <div className="mb-4" id="file">
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                            </div>

                            <div className="d-flex flex-column">
                            <button onClick={this.addButtonClickHandler} className="btn btn-primary">Добавить</button>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCardForm;