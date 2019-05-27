import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.sass'

class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                {this.props.currentUser && !this.props.currentUser.error?
                    <div>
                        <div className="navbar-logo">
                            <Link to='/'><button><i className="fas fa-bicycle"></i></button></Link>
                            <Link to='/activities'><button><i class="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div>
                        <div className="navbar-buttons">
                            <Link to='/user/profile'><button><i class="fas fa-user-circle"></i> PROFILE</button></Link>
                            <Link to='/'><button onClick={this.props.handleLogout}><i class="fas fa-sign-out-alt"></i> LOGOUT</button></Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="navbar-logo">
                            <Link to='/'><button><i className="fas fa-bicycle"></i></button></Link>
                            <Link to='/activities'><button><i class="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div>
                        <div className="navbar-buttons">
                            <Link to="/signup"><button><i class="fas fa-user-plus"></i> SIGNUP</button></Link>
                            <Link to="/login"><button><i class="fas fa-sign-in-alt"></i> LOGIN</button></Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Navbar;