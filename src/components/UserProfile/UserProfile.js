import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API';

class UserProfile extends Component {

    deleteUser = () => {
        API.deleteUser(this.props.currentUser)
            .then(resp => {
                if (resp.message === 'deleted') {
                    this.props.deleteUser()
                    this.props.history.push('/')
                } else {
                    alert("You can't delete this user. You have active offers." )
                }
            })
    }

    render() {
        if (!this.props.currentUser) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h1>{this.props.currentUser.name}</h1>
                    <ul>{this.props.userActivities.map((activity) => <li key={activity.id}><Link to={`/activities/${activity.id}`}>{activity.name}</Link></li>)}</ul>
                    <Link to="/user/edit"><button>edit profile</button></Link>
                    <button onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser() }}>delete user</button>
                    {/* <Link to="/user/new_activity"><button>Create new activity</button></Link> */}
                </div>

            )
        }
    }
}

export default UserProfile;