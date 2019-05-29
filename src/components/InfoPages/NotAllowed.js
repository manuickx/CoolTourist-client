import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './InfoPages.sass'

class NotAllowed extends Component {
    render() {
        return (
            <div className="not-allowed">
                <h5>You can't edit this activity...</h5>
                <hr></hr>
                <Link to='/'><button>HOME</button></Link>
            </div>
        );
    }
}

export default NotAllowed;