import React, { Component } from 'react';

import API from '../../API';

class EditUserProfile extends Component {

    state = {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
    }

    updateUser = () => {
        const user = {
            id: this.props.currentUser.id,
            name: this.state.name,
            email: this.state.email,
        }
        API.updateUser(user)
            .then(user => {
                if (user.error) {
                    alert('Something went wrong, please try again')
                } else {
                    this.props.getCurrentUser(user)
                }
            })
        this.props.history.push("/user/profile")
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateUser()
    }

    render() {
        if (!localStorage.getItem('token')) {
            return (
                <div>You have to log in to visit this page</div>
            )
        } else {
            if (this.props.currentUser === null) {
                return <div>Loading...</div>
            }
        }

        const { name, email } = this.state
        const { currentUser } = this.props
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active">Edit profile </h2>
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <input
                            type="form-text"
                            id="name"
                            className="fadeIn first"
                            name="name"
                            placeholder={currentUser.name}
                            value={name}
                            onChange={this.handleChange}
                        />
                        <input
                            type="email"
                            id="email"
                            className="fadeIn second"
                            name="email"
                            placeholder={currentUser.email}
                            value={email}
                            onChange={this.handleChange}
                        />
                        {/* <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="new password"
                            value={password}
                            onChange={this.handleChange}
                        /> */}
                        <input
                            type="submit"
                            className="fadeIn third"
                            value="Update"
                        />
                        <input
                            type="button"
                            className="fadeIn fourth"
                            value="Back"
                            onClick={() => this.props.history.goBack()}
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

export default EditUserProfile;