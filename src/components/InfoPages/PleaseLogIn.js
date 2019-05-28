import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './InfoPages.sass'

class PleaseLogIn extends Component {
    render() {
        return (
            <div className="not-logged-in">
                <h5>Please log in to access this page</h5>
                <hr></hr>
                <button onClick={() => this.props.history.goBack()}>GO BACK</button>
                <Link to='/'><button>HOME</button></Link>
            </div>
        );
    }
}

export default PleaseLogIn;