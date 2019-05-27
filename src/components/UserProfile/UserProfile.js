import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NotVerified from '../InfoPages/NotVerified';

import API from '../../API';

class UserProfile extends Component {

    deleteUser = () => {
        API.deleteUser(this.props.currentUser)
            .then(resp => {
                if (resp.message === 'deleted') {
                    this.props.deleteUser()
                    this.props.history.push('/')
                }
                else {
                    alert('delete not possible')
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
                    {/* {this.props.currentUser.verified? <h1>TRUE</h1> : <h1>FALSE</h1>} */}
                    <ul>{this.props.userActivities.map((activity) => <li key={activity.id}><Link to={`/activities/${activity.id}`}>{activity.name}</Link></li>)}</ul>
                    <Link to="/user/edit"><button>edit profile</button></Link>
                    <button onClick={this.deleteUser}>delete user</button>
                    <Link to="/user/new_activity"><button>Create new activity</button></Link>
                </div>

            )
        }
    }
}

export default UserProfile;