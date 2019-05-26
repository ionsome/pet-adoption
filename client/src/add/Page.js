import React, { Component } from 'react';
import NewCardForm from './NewCardForm';
import CardList from './CardList';
import Cards from '../api/Cards';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class CardsPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.Cards = [];
    }

    deleteAllCardsHandler = () => {
        Cards.deleteAll().then(() => {
            this.reloadCards();
        })
    }

    deleteCardHandler = (id) => {
        Cards.delete(id).then(() => {
            this.reloadCards();
        })
    }

    addCardHandler = (props) => {
        console.log(props)
        Cards.add(props).then(() => {
            this.reloadCards();
        })
    }

    editCardHandler = (id, props) => {
        Cards.edit(id, props).then(() => {
            this.reloadCards();
        })
    }

    reloadCards = () => {
        Cards.getMyCards().then((Cards) => {
            this.setState({ 'Cards': Cards })
        });
        console.log(this.state.Cards)
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.reloadCards();
        }
    }

    render() {
        let pageContent;
        let myCards;

        if (this.state.Cards.length > 0)
        {
            myCards = (
            <div>
                <div>
                    <h1 className="text-center"> My pets</h1>
                </div>
                <CardList Cards={this.state.Cards} deleteCardHandler={this.deleteCardHandler} editCardHandler={this.editCardHandler} />
            </div>
            );
        }
        if (this.props.isAuthorized) {
            pageContent = (
                <div>
                    <NewCardForm addCardHandler={this.addCardHandler} />
                    {myCards}
                </div>
            );
        } else {
            pageContent = (
                <div className="container">
                    <div className="row">
                        <div className="col col-12">
                            <h3>You need to <Link to="/auth/">authorize</Link> to access this page.</h3> 
                        </div>
                    </div>  
                </div>
            )
        }

        return (
            <div className="row body m-0">
                <div className="col-lg-8 col-md-12 landcontent">
                    {pageContent}
                </div>
            </div>
        );
    }
}

export default CardsPage;