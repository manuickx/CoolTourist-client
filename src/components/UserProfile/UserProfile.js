import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

import './UserProfile.sass'

class UserProfile extends Component {

    state = {
        user: null,
        userActivities: [],
        selectedActivity: null,
        selectedBooking: null,
        activityBookings: []
    }

    componentDidMount() {
        API.getCurrentUser(localStorage.getItem('token'))
            .then(user => this.setState({ user, userActivities: user.activities }))
    }

    deleteUser = () => {
        API.deleteUser(this.props.currentUser)
            .then(resp => {
                if (resp.message === 'deleted') {
                    this.props.deleteUser()
                    this.props.history.push('/')
                } else {
                    alert("You can't delete this user. You have active offers.")
                }
            })
    }

    selectActivity = activity => {
        this.setState({ selectedActivity: activity, selectedBooking: null, activityBookings: activity.bookings })
    }

    selectBooking = booking => {
        this.setState({ selectedBooking: booking })
    }

    deselectBooking = () => {
        this.setState({ selectedBooking: null })
    }

    cancelBooking = booking => {
        API.deleteBooking(booking)
            .then(resp => {
                if (resp.message !== 'deleted') {
                    alert("booking couldn't be deleted, please try again")
                }
            })
        this.props.history.push('/activities')
        this.setState({ selectedBooking: null, activityBookings: this.state.selectedActivity.bookings.filter(book => book.id !== booking.id) })
    }

    addDefaultSrc(ev) {
        ev.target.src = 'http://clipart-library.com/images/8iGbXE5aT.png'
    }

    render() {
        if (!this.state.user) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="user-info-page">
                    <div className="sidebar">
                        <div>
                            <Link to="/user/edit"><button>EDIT PROFILE <i className="fas fa-user-edit"></i></button></Link>
                            <hr></hr>
                            <button onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser() }}>DELETE USER <i className="fas fa-user-minus"></i></button>
                            <hr></hr>
                            <Link to="/user/new_activity"><button>NEW ACTIVITY <i className="fas fa-plus-square"></i></button></Link>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="user-details">
                            <img className="user-avatar" src={this.props.currentUser.avatar ? this.props.currentUser.avatar : 'http://clipart-library.com/images/8iGbXE5aT.png'} onError={this.addDefaultSrc} alt="" />
                            <hr></hr>
                            <h1 className="name-text">{this.props.currentUser.name}</h1>
                            <h1 className="name-shadow">{this.props.currentUser.name}</h1>
                        </div>
                        <div className="user-bookings">
                            <div className="user-activities">
                                <table className="activities-table">
                                    <thead>
                                        <tr>
                                            <th>ACTIVITY</th>
                                            <th>BOOKINGS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userActivities.map(activity =>
                                            <tr key={activity.id}>
                                                <td><Link to={`/activities/${activity.id}`}>{activity.name}</Link></td>
                                                <td onClick={() => this.selectActivity(activity)}>{activity.bookings.length}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="user-bookings-details">
                                <div className="bookings-details-container">
                                    {this.state.selectedBooking ?
                                        <div className="full-booking-details">
                                            <p>NAME: {this.state.selectedBooking.name}</p>
                                            <p>EMAIL: {this.state.selectedBooking.email}</p>
                                            <p>PHONE: {this.state.selectedBooking.phone}</p>
                                            <p>DATE: {this.state.selectedBooking.date.substring(0, 4)}-{this.state.selectedBooking.date.substring(5, 7)}-{this.state.selectedBooking.date.substring(8, 10)}</p>
                                            <p>TIME: {this.state.selectedBooking.date.substring(11, 16)}</p>
                                            <p>COMMENT: {this.state.selectedBooking.comment}</p>
                                            <button onClick={this.deselectBooking}>BACK</button>
                                            <button onClick={() => { if (window.confirm('Are you sure you wish to cancel this booking?')) this.cancelBooking(this.state.selectedBooking) }}>CANCEL BOOKING</button>
                                        </div>
                                        :
                                        this.state.selectedActivity ?
                                            <table className="bookings-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.activityBookings.map(booking =>
                                                        <tr key={booking.id}>
                                                            <td onClick={() => this.selectBooking(booking)} className="booking-name">{booking.name} </td>
                                                            <td>{booking.date.substring(0, 4)}-{booking.date.substring(5, 7)}-{booking.date.substring(8, 10)}</td>
                                                            <td>{booking.date.substring(11, 16)}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            :
                                            this.state.userActivities.map(activity =>
                                                <table className="user-bookings-details-table">
                                                    <thead>
                                                        <tr>
                                                            <th>{activity.name}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activity.bookings.map(booking => <tr><td>{booking.name} {booking.date.substring(0, 4)}-{booking.date.substring(5, 7)}-{booking.date.substring(8, 10)} {booking.date.substring(11, 16)}</td></tr>)}
                                                    </tbody>
                                                </table>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default UserProfile;