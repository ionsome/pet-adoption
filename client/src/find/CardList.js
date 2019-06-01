import React, { Component } from 'react';
import Card from './Card';


class CardList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-around " id="card-list">
                    {this.props.Cards.map((card) => {
                        return (<Card key={card._id} info={card} />)
                    })}
                </div>
            </div>
        );
    }
}

export default CardList;