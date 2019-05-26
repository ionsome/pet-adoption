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
            <div className="body">
                <div className="col-lg-8 col-md-12 landcontent">
                    <CardList Cards={this.state.Cards} />
                </div>
            </div>
        );
        return pageContent;
    }
}

export default FindPage;