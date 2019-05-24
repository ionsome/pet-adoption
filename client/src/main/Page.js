import React, { Component } from 'react';
import Cards from '../api/Cards';


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

    deleteTaskHandler = (id) => {
        Cards.delete(id).then(() => {
            this.reloadCards();
        })
    }

    addTaskHandler = (text) => {
        Cards.add(text).then(() => {
            this.reloadCards();
        })
    }

    editTaskHandler = (id, text) => {
        Cards.edit(id, text).then(() => {
            this.reloadCards();
        })
    }

    reloadCards = () => {
        Cards.getAll().then((Cards) => {
            this.setState({ 'Cards': Cards })
        });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.reloadCards();
        }
    }

    render() {
        let pageContent;

        pageContent = (
            <div className="body">
                <div id="tagline" className="text-uppercase">Большое маленькое чудо</div>
                <div className="landcontent">
                    <p>Что такое для нас – чудо? Это когда во время вечерних прогулок тебя всегда сопровождает пушистый друг. Это когда каждое утро тебя будит нечто мягкое, прося кушать. Это когда каждый день ты слушаешь прекрасное пение своего попугая. </p>
                    <p>Наш сайт поможет Вам найти своё маленькое большое чудо! Тут собрана информация о разных приютах и их обитателях, о брошенных на улице питомцах и просто о тех животных, которые ходят найти себе дом.</p>
                    <p>Просматривая профили приютов или просто людей, Вы сможете найти своего друга по характеру, виду, поведению, а потом забрать себе! </p>
                    <p>Если Вы хотите помочь пушистому другу обрести семью, то наш сайт и в этом Вам поможет. Вы можете разместить всю подробную информацию о животном - текст, фото, местоположение и многое другое. Посетители сайта смогут увидеть Ваше объявление и забрать пушистого друга себе! </p>
                    <p>Кошки и коты, собаки и кролики, птички и рыбки – все они являются нашими друзьями. Так давайте поможем друзьям обрести свой дом!</p>
                </div>
            </div>
        );

        return pageContent;
    }
}

export default CardsPage;