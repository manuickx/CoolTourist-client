import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.sass'

class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                {this.props.currentUser && !this.props.currentUser.error ?
                    <div>
                        <div className="navbar-logo">
                            <Link to='/'><button>CoolTourist</button></Link>
                            <Link to='/activities'><button><i className="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div>
                        <div className="navbar-buttons">
                            <Link to='/user/profile'><button><i className="fas fa-user-circle"></i> PROFILE</button></Link>
                            <Link to='/'><button onClick={this.props.handleLogout}><i className="fas fa-sign-out-alt"></i> LOGOUT</button></Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="navbar-logo">
                            <Link to='/'><button>CoolTourist</button></Link>
                            <Link to='/activities'><button><i className="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div>
                        <div className="navbar-buttons">
                            <button disabled>If you want to add a new activity</button>
                            <Link to="/signup"><button><i className="fas fa-user-plus"></i> SIGNUP</button></Link>
                            <Link to="/login"><button><i className="fas fa-sign-in-alt"></i> LOGIN</button></Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Navbar;