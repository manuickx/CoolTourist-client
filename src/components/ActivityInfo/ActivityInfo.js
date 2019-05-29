import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

import './ActivityInfo.sass'

class ActivityInfo extends Component {

    state = {
        activity: null,
        bookings: [],
        selectedBooking: null
    }

    componentDidMount() {
        this.getActivity()
    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://smithssanitationsupply.ca/wp-content/uploads/2018/06/noimage-1.png'
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({ activity, bookings: activity.bookings }))
    }

    handleDelete = activity => {
        activity.bookings.length === 0 ?
            API.deleteActivity(this.state.activity)
                .then(resp => {
                    if (resp.message === 'deleted') {
                        this.props.deleteActivity(this.state.activity)
                        this.props.history.push('/user/profile')
                    } else {
                        alert("You can't delete this activity, you have bookings.")
                    }
                })
            :
            alert("You can't delete this activity, you have bookings.")
    }

    cancelBooking = booking => {
        API.deleteBooking(booking)
            .then(resp => {
                if (resp.message !== 'deleted') {
                    alert("booking couldn't be deleted, please try again")
                }
            })
        this.props.history.push('/activities')
        this.setState({ selectedBooking: null, bookings: this.state.bookings.filter(book => book.id !== booking.id) })
    }

    selectBooking = booking => {
        this.setState({ selectedBooking: booking })
    }

    deselectBooking = () => {
        this.setState({ selectedBooking: null })
    }

    render() {

        const { activity, bookings, selectedBooking } = this.state

        if (activity === null) {
            return (<div>Loading...</div>)
        }
        else {

            const { id, name, imageurl, categories, user, description } = activity

            return (
                <div className="info-page">
                    <div className="sidebar">
                        {this.props.currentUser !== null && user.id === this.props.currentUser.id ?
                            <div>
                                <Link to="/user/new_activity"><button>ADD NEW <i className="fas fa-plus-square"></i></button></Link>
                                <hr></hr>
                                <Link to={`/activities/${id}/edit`}><button>EDIT <i className="fas fa-edit"></i></button></Link>
                                <hr></hr>
                                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this activity?')) this.handleDelete(activity) }}>DELETE <i className="fas fa-trash-alt"></i></button>
                                <hr></hr>
                                <button onClick={() => this.props.history.goBack()}>BACK <i className="fas fa-caret-square-left"></i></button>
                                <hr></hr>
                            </div>
                            :
                            <div>
                                <hr></hr>
                                <Link to={`/activities/${id}/book`}><button>BOOK <i className="fas fa-calendar-plus"></i></button></Link>
                                <hr></hr>
                                <button onClick={() => this.props.history.goBack()}>BACK <i className="fas fa-caret-square-left"></i></button>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="activity-details">
                        <div className="activity-image-container">
                            <img className="activity-image" src={imageurl} onError={this.addDefaultSrc} alt="" />
                        </div>
                        <div className="activity-details-container">
                            <br></br>
                            <h1 className="activity-name">{name}</h1>
                            <br></br>
                            <h4>Activity organised by: {user.name}</h4>
                            <hr></hr>
                            <br></br>
                            <h3>Activity categories:</h3>
                            <ul></ul>
                            <h3>{categories.map(category => <li>{category.name}</li>)}</h3>

                        </div>
                    </div>
                    <div className="activity-booking">
                        <div className="activity-description-container">
                            <h1>DESCRIPTION: </h1>
                            <hr></hr>
                            <br></br>
                            <p>{description}</p>
                        </div>
                        <div className="booking-form-container">
                            {this.props.currentUser !== null && user.id === this.props.currentUser.id ?
                                <h4>
                                    Bookings:
                                    <hr></hr>
                                    <br></br>
                                    {selectedBooking ?
                                        <div className="full-booking-details">
                                            <p>NAME: {selectedBooking.name}</p>
                                            <p>EMAIL: {selectedBooking.email}</p>
                                            <p>PHONE: {selectedBooking.phone}</p>
                                            <p>DATE: {selectedBooking.date.substring(0, 4)}-{selectedBooking.date.substring(5, 7)}-{selectedBooking.date.substring(8, 10)}</p>
                                            <p>TIME: {selectedBooking.date.substring(11, 16)}</p>
                                            <p>COMMENT: {selectedBooking.comment}</p>
                                            <button onClick={this.deselectBooking}>BACK</button><button onClick={() => { if (window.confirm('Are you sure you wish to cancel this booking?')) this.cancelBooking(selectedBooking) }}>CANCEL BOOKING</button>
                                        </div>
                                        :
                                        <table className="bookings-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map(booking =>
                                                    <tr key={booking.id}>
                                                        <td onClick={() => this.selectBooking(booking)} className="booking-name">{booking.name} </td>
                                                        <td>{booking.date.substring(0, 4)}-{booking.date.substring(5, 7)}-{booking.date.substring(8, 10)}</td>
                                                        <td>{booking.date.substring(11, 16)}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    }
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