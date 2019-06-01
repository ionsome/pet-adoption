import React, { Component } from 'react';
import Card from './Card';


class CardList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row p-0 m-0 justify-content-around">
                    {this.props.Cards.map((card) => {
                        return (<Card key={card._id} info={card} deleteCardHandler={this.props.deleteCardHandler} editCardHandler={this.props.editCardHandler}/>)
                    })}
                </div>
            </div>
        );
    }
}

export default CardList;