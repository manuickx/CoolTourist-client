import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';
import BookingForm from '../BookingForm/BookingForm';

import './ActivityInfo.sass'

class ActivityInfo extends Component {

    state = {
        activity: null
    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({ activity }))
    }

    handleDelete = () => {
        API.deleteActivity(this.state.activity)
            .then(this.props.deleteActivity(this.state.activity))
            .then(this.props.history.push('/user/profile'))
    }

    render() {

        if (this.state.activity === null) {
            return (<div>Loading...</div>)
        }
        else {
            return (
                <div className="info-page">
                    <div className="sidebar">
                        {this.props.currentUser !== null && this.state.activity.user.id === this.props.currentUser.id ?
                            <div>
                                <button onClick={this.handleDelete}>DELETE</button>
                                <Link to={`/activities/${this.state.activity.id}/edit`}><button>EDIT</button></Link>
                            </div>
                            :
                            <Link to={`/activities/${this.state.activity.id}/book`}><button>BOOK</button></Link>
                        }
                    </div>
                    <div className="activity-details">
                        <div className="activity-image-container">
                            <img className="activity-image" src={this.state.activity.imageurl} alt="" />
                        </div>
                        <div>
                            <h1>{this.state.activity.name}</h1>
                            <h4>{this.state.activity.user.name}</h4>
                            <h3>{this.state.activity.categories.map(category => category.name).join(' ; ')}</h3>

                        </div>
                    </div>
                    <div className="activity-booking">
                        <div className="booking-form-container">
                        {this.props.currentUser !== null && this.state.activity.user.id === this.props.currentUser.id ?
                    <h4>{this.state.activity.bookings.map(booking => booking.name).join(' ; ')}</h4>
                    :
                    null    
                    }
                        </div>
                        <div className="activity-description-container">
                            <p>{this.state.activity.description}</p>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default ActivityInfo;