import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './InfoPages.sass'

class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h5>404</h5>
                <hr></hr>
                <h5>PAGE NOT FOUND</h5>
                <hr></hr>
                <button onClick={() => this.props.history.goBack()}>GO BACK</button>
                <Link to='/'><button>HOME</button></Link>
            </div>
        );
    }
}

export default PageNotFound;