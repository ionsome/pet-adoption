import React, { Component } from 'react';
import Card from './Card';


class TaskList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" id="task-list">
                    {this.props.Cards.map((task) => {
                        return (<Card key={task._id} info={task} />)
                    })}
                </div>
            </div>
        );
    }
}

export default TaskList;