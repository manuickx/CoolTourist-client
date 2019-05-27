import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>404 : PAGE NOT FOUND</h1>
                <Link to='/'><button>HOME</button></Link>
            </div>
        );
    }
}

export default PageNotFound;