import React, { Component} from 'react';
import { BrowserRouter as Route, Router, Link, withRouter } from "react-router-dom";
import User from '../api/User';

class AuthPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authLogin = '';
        this.state.authPassword = '';
        
        
        if (this.props.location.state)
        {
            this.state.loginSuccessMessage = this.props.location.state.loginSuccessMessage;
        }
    }

    authButtonClickHandler = () => {
        User.login(this.state.authLogin, this.state.authPassword)
            .then(res => {
                this.setState({
                    loginErrorMessage: '',
                    authLogin: '',
                    authPassword: ''
                });
                this.props.authChangeHandler();
                this.props.history.push({
                    pathname: '/find'
                });
            })
            .catch(err => {
                this.setState({
                    loginSuccessMessage: '',
                    loginErrorMessage: 'Authorization error. Make sure you entered correct credentials.',
                    authLogin: '',
                    authPassword: ''
                });
            });
    }

    authLoginChangeHandler = (event) => {
        this.setState({ authLogin: event.target.value });
    }

    authPasswordChangeHandler = (event) => {
        this.setState({ authPassword: event.target.value });
    }

    render() {
        let loginSuccess;
        let loginError;

        if (this.state.loginSuccessMessage) {
            loginSuccess = (<div className="alert alert-success" role="alert">{this.state.loginSuccessMessage}</div>)
        }
        if (this.state.loginErrorMessage) {
            loginError = (<div className="alert alert-danger" role="alert">{this.state.loginErrorMessage}</div>)
        }

        return (

            <div className="text-center">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9 col-xs-12">
                            <div className="jumbotron">
                                <h2>Авторизация</h2><br />
                                {loginSuccess}
                                {loginError}
                                <input onChange={this.authLoginChangeHandler} value={this.state.authLogin} className="form-control mr-sm-2" type="text" placeholder="Логин" /><br />
                                <input onChange={this.authPasswordChangeHandler} value={this.state.authPassword} className="form-control mr-sm-2" type="password" placeholder="Пароль" /><br />
                                <div className="d-flex flex-column">
                                    <button onClick={this.authButtonClickHandler} className="btn btn-primary" >Войти</button>
                                    <div className="mt-4"><Link to="/register/"><a onClick={() => {}} >Регистрация</a></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AuthPage);