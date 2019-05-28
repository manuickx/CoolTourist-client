import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

import './UserProfile.sass'

class UserProfile extends Component {

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

    addDefaultSrc(ev) {
        ev.target.src = 'http://clipart-library.com/images/8iGbXE5aT.png'
    }

    render() {
        if (!this.props.currentUser) {
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
                        <img className = "user-avatar" src={this.props.currentUser.avatar} onError={this.addDefaultSrc} alt="" />
                        <h1>{this.props.currentUser.name}</h1>
                        <ul>{this.props.userActivities.map((activity) => <li key={activity.id}><Link to={`/activities/${activity.id}`}>{activity.name}</Link></li>)}</ul>
                    </div>
                </div>

            )
        }
    }
}

export default UserProfile;