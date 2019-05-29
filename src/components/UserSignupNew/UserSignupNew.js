import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

import './UserSignupNew.sass'

class UserSignupNew extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

    signupUser = () => {
        API.createUser(this.state)
            .then(authData => {
                localStorage.setItem("token", authData.jwt);
                this.props.history.push("/user/profile");
                API.getCurrentUser(authData.jwt)
                this.props.getCurrentUser(authData.jwt)
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.signupUser(this.state)
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <Link to='/login'><h2 className="inactive underlineHover"> Log In </h2></Link>
                    <h2 className="active">Sign Up </h2>
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <input
                            type="form-text"
                            id="name"
                            className="fadeIn first"
                            name="name"
                            placeholder="name"
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input
                            type="email"
                            id="email"
                            className="fadeIn second"
                            name="email"
                            placeholder="email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="password"
                            required
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <input
                            type="submit"
                            className="fadeIn fourth"
                            value="Sign Up"
                        />
                    </form>
                    <div id="formFooter">
                        {/* <a className="underlineHover" href="/">Forgot Password?</a> */}
                    </div>

                </div>
            </div>
        );
    }
}

export default UserSignupNew;