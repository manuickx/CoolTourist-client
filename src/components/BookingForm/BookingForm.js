import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import API from '../../API';

import './BookingForm.sass'

import "react-datepicker/dist/react-datepicker.css";

class BookingForm extends Component {

    state = {
        activity: null,
        startDate: new Date(),
        name: "",
        email: "",
        phone: "",
        comment: ""
    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({ activity }))
    }

    createBooking = event => {
        event.preventDefault()
        const { startDate, name, email, phone, comment } = this.state
        const { history, match } = this.props
        const { activityId } = match.params


        const booking = {
            date: startDate, name, email, phone, comment
        }

        if (Date.parse(startDate) < Date.parse(Date())) {
            alert("Date can't be in the past")
        } else {
            API.bookActivity(activityId, booking)
                .then(history.push('/activities'))
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange = date => {
        this.setState({ startDate: date })
    }

    render() {

        const { name, email, phone, comment } = this.state
        const { handleChange, createBooking } = this

        if (!this.state.activity) {
            return (<div></div>)
        }
        return (
            <div>
                <div className="booking-form-title">
                    <h1>Booking Form for: {this.state.activity.name}</h1>
                </div>
                <div className="container">
                    <form action="/action_page.php" onSubmit={createBooking}>
                        <div className="row">
                            <div className="col-25">
                                <label>Date</label>
                            </div>
                            <div className="col-75"></div>
                            <DatePicker
                                selected={this.state.startDate}
                                showTimeSelect
                                dateFormat="Pp"
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Full Name</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Full Name..."
                                    required
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Email Address</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address..."
                                    required
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Phone Number</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number..."
                                    required
                                    value={phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Message</label>
                            </div>
                            <div className="col-75">
                                <textarea
                                    id="comment"
                                    name="comment"
                                    maxLength="250"
                                    placeholder="Message to organiser (optional, max 250 chars.)..."
                                    value={comment}
                                    onChange={handleChange}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <button className="back-button" onClick={() => this.props.history.goBack()}>BACK</button>
                            <button type="submit" className="submit-button">SUBMIT BOOKING</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default BookingForm;