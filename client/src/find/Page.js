import React, { Component } from 'react';
import CardList from './CardList';
import Cards from '../api/Cards';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class FindPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.Cards = [];
    }

    reloadCards = () => {
        Cards.getAll().then((Cards) => {
            this.setState({ 'Cards': Cards })
        });
    }

    componentDidMount() {
        this.reloadCards();
    }

    render() {
        let pageContent;
        pageContent = (
            <div>
                <CardList Cards={this.state.Cards} />
            </div>
        );
        return pageContent;
    }
}

export default FindPage;