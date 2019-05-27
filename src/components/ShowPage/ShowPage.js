import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ActivityCard from '../ActivityCard/ActivityCard';

import './ShowPage.sass'

class ShowPage extends Component {
    render() {

        const { activities } = this.props

        return (
            <div className="show-page">
                {activities.map(activity => (
                    <Link to={`/activities/${activity.id}`} key={activity.id} ><ActivityCard activity={activity} /></Link>
                ))}
            </div>
        );
    }
}

export default ShowPage;