import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Select from 'react-select';

import API from '../../API';

import './Navbar.sass'

class Navbar extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.getCategories()
    }

    getCategories = () => {
        API.getCategories()
            .then(categories => categories.forEach(({ id, name }) => this.setState({ categories: [...this.state.categories, { value: id, label: name }] })))
    }

    render() {
        return (
            <div className="navbar">
                {this.props.currentUser && !this.props.currentUser.error ?
                    <div className="navbar-elements-container">
                        <div className="navbar-logo">
                            <Link to='/'><button>CoolTourist</button></Link>
                            <Link to='/activities'><button><i className="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div>
                        <div className="filter-section">
                            {/* <Select
                                onChange={this.props.filterActivities}
                                className="multi-select"
                                classNamePrefix="react-select"
                                placeholder="Choose a Category"
                                // isMulti
                                required
                                options={this.state.categories}
                                isSearchable={true}
                            /> */}
                        </div>
                        <div className="navbar-buttons">
                            <Link to='/user/profile'><button><i className="fas fa-user-circle"></i> PROFILE</button></Link>
                            <Link to='/'><button onClick={this.props.handleLogout}><i className="fas fa-sign-out-alt"></i> LOGOUT</button></Link>
                        </div>
                    </div>
                    :
                    <div className="navbar-elements-container">
                        <div className="navbar-logo">
                            <Link to='/'><button>CoolTourist</button></Link>
                            <Link to='/activities'><button><i className="fas fa-hiking"></i> ACTIVITIES</button></Link>
                        </div >
                        <div className="filter-section">
                            {/* <Select
                                onChange={this.props.filterActivities}
                                className="multi-select"
                                classNamePrefix="react-select"
                                placeholder="Choose a Category"
                                // isMulti
                                required
                                options={this.state.categories}
                                isSearchable={true}
                            /> */}
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