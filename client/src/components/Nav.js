import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import User from '../api/User';
import logo from '../images/paw.png';
import house from '../images/dog_house.png';

const styles = {
    link: {
        color: "white",
        textDecoration: "none"
    },
};

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
        let authButton;

        if (this.props.isAuthorized) {
            authButton = (
                <Link className="header-button" id="first-header-button" style={styles.link} onClick={this.logoutHandler} to="/">
                    <p className="header-login">Выйти</p>
                    <img src={house} height="32" alt="" />
                </Link>
            )

        } else {
            authButton = (
                <Link className="header-button" id="first-header-button" style={styles.link} to="/auth/">
                    <p className="header-login">Войти</p>
                    <img src={house} height="32" alt="" />
                </Link >
            )
        }

        return (
            <div className="header">
                <div className="header-left">
                    <Link className="header-logo" style={styles.link} to="/">
                        <img src={logo} height="48" vspace="12" alt="" />
                        <p>Pet Adoption</p>
                    </Link>
                </div>
                <div className="header-center">
                    <nav>
                        <Link className="header-button" id="first-header-button" style={styles.link} to="/find/">Найти</Link>
                        <Link className="header-button" style={styles.link} to="/add/">Отдать</Link>
                        <Link className="header-button" style={styles.link} to="/item/">Статьи</Link>
                    </nav>
                </div>
                <div className="header-right">
                    {authButton}
                </div>
            </div>
        );
    }
}

export default Nav;