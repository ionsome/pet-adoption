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
                <Link class="header-button" id="first-header-button" style={styles.link} onClick={this.logoutHandler}>
                    <p class="header-login">Выйти</p>
                    <img src={house} height="32"></img>
                </Link>
            )

        } else {
            authButton = (
                <Link class="header-button" id="first-header-button" style={styles.link} to="/auth/">
                    <p class="header-login">Войти</p>
                    <img src={house} height="32"></img>
                </Link>
            )
        }

        return (
            <div class="header">
			<div class="header-left">
				<img src={logo} height="48" vspace="12"></img>
				<Link class="header-logo" style={styles.link} to="/">Pet Adoption</Link>
			</div>
			<div class="header-center">
				<nav>
					<Link class="header-button" id="first-header-button" style={styles.link} to="/find/">Найти</Link>
					<Link class="header-button" style={styles.link} to="/add/">Отдать</Link>
					<Link class="header-button" style={styles.link} to="/item/">Статьи</Link>
				</nav>
			</div>
			<div class="header-right">
                {authButton}
			</div>
		</div>
        );
    }
}

export default Nav;