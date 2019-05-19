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
                   <div id="tagline">Lorem Ipsum Dolor Sit Amet</div>
                    <div className="landcontent">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>	
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>	
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet sem nunc, sit amet vulputate magna ultricies luctus. Morbi pellentesque luctus aliquam. Integer pretium, lectus et pulvinar elementum, quam lorem vulputate felis, sit amet iaculis ligula nunc et lorem. Nunc at ex ultrices metus varius varius ac commodo quam. In hac habitasse platea dictumst. Curabitur suscipit mauris vel dignissim laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </p>
                    </div>
                </div>
            );

        return pageContent;
    }
}

export default CardsPage;