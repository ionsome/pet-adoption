import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import User from '../api/User';
import logo from '../images/paw.png';


class Nav extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authText = props.isAuthorized ? '' : 'Not authorized';
    }

    updateUserText() {
        User.getUsername()
            .then(username => {
                const authText = 'Authorized as: ' + username;
                this.setState({ authText });
            })
            .catch(err => {
                console.log(err);
            });
    }

    logoutHandler = () => {
        User.logout()
            .then(res => {
                const authText = 'Not authorized';
                this.setState({ authText });
                this.props.authChangeHandler();
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.updateUserText();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthorized && !prevProps.isAuthorized) {
            this.updateUserText();
        }
    }

    render() {
        let authButtons;

        if (this.props.isAuthorized) {
            authButtons = (<button onClick={this.logoutHandler} className="btn btn-outline-danger my-2 my-sm-0" id="delete-all-button">Log Out</button>)

        } else {
            authButtons = (<Link to="/auth/"><button className="btn btn-outline-success my-2 my-sm-0" id="delete-all-button">Log In</button></Link>)
        }

        return (
            <nav className="navbar navbar-expand-md bg-info">
                <img src={logo} alt="Logo" height="48" />
                <div className="navbar-brand header-logo">
                    <Link className="nav-link text-white display-4" to="/">Pet adoption</Link>
                </div>

                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarCollapse">
                    <div className="px-5">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white header-button" to="/find/">Найти</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="px-5">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/add/">Отдать</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="px-5">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/item/">Статьи</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link text-white">{this.state.authText}</span>
                    </li>
                </ul>
                {authButtons}
            </nav>
        );
    }
}

export default Nav;