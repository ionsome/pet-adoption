import React, { Component } from 'react';
import Card from './Card';


class CardList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row " id="card-list">
                    {this.props.Cards.reverse().map((card) => {
                        return (<Card key={card._id} info={card} />)
                    })}
                </div>
            </div>
        );
    }
}

export default CardList;