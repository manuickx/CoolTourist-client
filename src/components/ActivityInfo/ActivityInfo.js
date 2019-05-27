import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

import './ActivityInfo.sass'

class ActivityInfo extends Component {

    state = {
        activity: null
    }

    componentDidMount() {
        this.getActivity()
    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://smithssanitationsupply.ca/wp-content/uploads/2018/06/noimage-1.png'
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({ activity }))
    }

    handleDelete = () => {
        API.deleteActivity(this.state.activity)
            .then(resp => {
                if (resp.message === 'deleted') {
                    this.props.deleteActivity(this.state.activity)
                    this.props.history.push('/user/profile')
                } else {
                    alert("You can't delete this activity, you have bookings.")
                }
            })
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
                                <Link to="/user/new_activity"><button>ADD NEW <i className="fas fa-plus-square"></i></button></Link>
                                <hr></hr>
                                <Link to={`/activities/${this.state.activity.id}/edit`}><button>EDIT <i className="fas fa-edit"></i></button></Link>
                                <hr></hr>
                                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this activity?')) this.handleDelete() }}>DELETE <i className="fas fa-trash-alt"></i></button>
                                <hr></hr>
                                <button onClick={() => this.props.history.goBack()}>BACK <i class="fas fa-caret-square-left"></i></button>
                                <hr></hr>
                            </div>
                            :
                            <div>
                                <hr></hr>
                                <Link to={`/activities/${this.state.activity.id}/book`}><button>BOOK <i className="fas fa-calendar-plus"></i></button></Link>
                                <hr></hr>
                                <button onClick={() => this.props.history.goBack()}>BACK <i class="fas fa-caret-square-left"></i></button>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="activity-details">
                        <div className="activity-image-container">
                            <img className="activity-image" src={this.state.activity.imageurl} onError={this.addDefaultSrc} alt="" />
                        </div>
                        <div>
                            <br></br>
                            <h1>{this.state.activity.name}</h1>
                            <br></br>
                            <h4>Activity organised by: {this.state.activity.user.name}</h4>
                            <hr></hr>
                            <br></br>
                            <h3>Activity categories:</h3>
                            <h3>{this.state.activity.categories.map(category => category.name).join(' ; ')}</h3>

                        </div>
                    </div>
                    <div className="activity-booking">
                        <div className="activity-description-container">
                            <p>{this.state.activity.description}</p>
                        </div>
                        <div className="booking-form-container">
                            {this.props.currentUser !== null && this.state.activity.user.id === this.props.currentUser.id ?
                                <h4>
                                    <ul>
                                        {this.state.activity.bookings.map(booking => <li key={booking.id}>{booking.name}, {booking.email}, {booking.phone}, {booking.comment}</li>)}
                                    </ul>
                                </h4>
                                :
                                null
                            }
                        </div>


                    </div>
                </div>
            )
        }
    }
}

export default ActivityInfo;