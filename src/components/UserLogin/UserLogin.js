import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './UserLogin.sass'

import API from '../../API';

class UserLogin extends Component {

    state = {
        email: "",
        password: ""
    }

    loginUser = (credentials) => {
        API.login(credentials)
            .then(authData => {
                if (authData.error) {
                    alert("Wrong username or password")
                } else {
                    localStorage.setItem("token", authData.jwt);
                    this.props.history.push("/main");
                    API.getCurrentUser(authData.jwt)
                        .then(user => this.props.getCurrentUser(user))
                }
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.loginUser(this.state)
    }

    render() {
        return (
            <div className="login-form">
                <div className='login-form-buttons'>
                    <button className='login-button'>LOG IN</button>
                    <Link to='/signup'><button className='signup-button'>SIGN UP</button></Link>
                </div>
                <form className="login-text" onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div className="input-field">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserLogin;