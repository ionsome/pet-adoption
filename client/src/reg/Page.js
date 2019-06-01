import React, { Component } from 'react';
import { BrowserRouter as Route, Router, withRouter, Link } from "react-router-dom";
import User from '../api/User';

class RegPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.regFirstName = '';
        this.state.regLastName = '';
        this.state.regLogin = '';
        this.state.regPassword = '';

    }

    regButtonClickHandler = () => {
        User.register(this.state.regFirstName, this.state.regLastName, this.state.regLogin, this.state.regPassword)
            .then(res => {
                this.setState({
                    regSuccessMessage: 'Registration successful.',
                    regErrorMessage: '',
                    regLogin: '',
                    regPassword: '',
                    regFirstName: '',
                    regLastName: ''
                });
                this.props.history.push({
                    pathname: '/login',
                    state: { loginSuccessMessage: 'Registration successful!' }
                });
            })
            .catch(err => {
                this.setState({
                    regSuccessMessage: '',
                    regErrorMessage: 'Registration failed. Perhaps username is taken already.',
                    regLogin: '',
                    regPassword: '',
                    regFirstName: '',
                    regLastName: ''
                });
            });
    }

    regLoginChangeHandler = (event) => {
        this.setState({ regLogin: event.target.value });
    }

    regPasswordChangeHandler = (event) => {
        this.setState({ regPassword: event.target.value });
    }

    regFirstNameChangeHandler = (event) => {
        this.setState({ regFirstName: event.target.value });
    }

    regLastNameChangeHandler = (event) => {
        this.setState({ regLastName: event.target.value });
    }

    render() {
        let regSuccess;
        let regError;

        if (this.state.regSuccessMessage) {
            regSuccess = (<div className="alert alert-success" role="alert">{this.state.regSuccessMessage}</div>)
        }
        if (this.state.regErrorMessage) {
            regError = (<div className="alert alert-danger" role="alert">{this.state.regErrorMessage}</div>)
        }

        return (
            <div className="text-center">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9 col-xs-12">
                            <div className="jumbotron bg-blue">
                                <h2>Регистрация</h2><br />
                                {regSuccess}
                                {regError}
                                <input onChange={this.regFirstNameChangeHandler} value={this.state.regFirstName} className="form-control mr-sm-2" type="text" placeholder="Имя" /><br />
                                <input onChange={this.regLastNameChangeHandler} value={this.state.regLastName} className="form-control mr-sm-2" type="text" placeholder="Фамилия" /><br />
                                <input onChange={this.regLoginChangeHandler} value={this.state.regLogin} className="form-control mr-sm-2" type="text" placeholder="Логин" /><br />
                                <input onChange={this.regPasswordChangeHandler} value={this.state.regPassword} className="form-control mr-sm-2" type="password" placeholder="Пароль" /><br />
                                <div className="d-flex flex-column">
                                    <button onClick={this.regButtonClickHandler} className="btn btn-primary" >Регистрация</button>
                                    <div className="mt-4"><Link to="/login"> Войти</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegPage);