import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './InfoPages.sass'

class NotVerified extends Component {
    render() {
        return (
            <div className="not-verified">
                <h5>Waiting for verification...</h5>
                <hr></hr>
                <Link to='/'><button>HOME</button></Link>
            </div>
        );
    }
}

export default NotVerified;