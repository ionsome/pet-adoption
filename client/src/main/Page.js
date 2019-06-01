import React, { Component } from 'react';


class CardsPage extends Component {
    state = {};

    render() {
        let pageContent;

        pageContent = (
            <div className="body m-0">
                <div className="text-uppercase tagline">Большое маленькое чудо</div>
                <div className="col-lg-8 col-md-12 landcontent">
                <div>
                    <p>Что такое для нас – чудо? Это когда во время вечерних прогулок тебя всегда сопровождает пушистый друг. Это когда каждое утро тебя будит нечто мягкое, прося кушать. Это когда каждый день ты слушаешь прекрасное пение своего попугая. </p>
                    <p>Наш сайт поможет Вам найти своё маленькое большое чудо! Тут собрана информация о разных приютах и их обитателях, о брошенных на улице питомцах и просто о тех животных, которые ходят найти себе дом.</p>
                    <p>Просматривая профили приютов или просто людей, Вы сможете найти своего друга по характеру, виду, поведению, а потом забрать себе! </p>
                    <p>Если Вы хотите помочь пушистому другу обрести семью, то наш сайт и в этом Вам поможет. Вы можете разместить всю подробную информацию о животном - текст, фото, местоположение и многое другое. Посетители сайта смогут увидеть Ваше объявление и забрать пушистого друга себе! </p>
                    <p>Кошки и коты, собаки и кролики, птички и рыбки – все они являются нашими друзьями. Так давайте поможем друзьям обрести свой дом!</p>
                </div>
                </div>
            </div>
        );

        return pageContent;
    }
}

export default CardsPage;