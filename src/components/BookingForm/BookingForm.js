import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import API from '../../API';

import "react-datepicker/dist/react-datepicker.css";

class BookingForm extends Component {

    state = {
        startDate: new Date(),
        name: "",
        email: "",
        phone: "",
        comment: ""
    }

    createBooking = event => {
        event.preventDefault()
        const { startDate, name, email, phone, comment } = this.state
        const { history, match } = this.props
        const { activityId } = match.params


        const booking = {
            date: startDate, name, email, phone, comment
        }

        API.bookActivity(activityId, booking)
            .then(history.push('/activities'))
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

        return (
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
                                placeholder="Message to organiser (optional)..."
                                value={comment}
                                onChange={handleChange}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="submit-button">SUBMIT BOOKING</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default BookingForm;