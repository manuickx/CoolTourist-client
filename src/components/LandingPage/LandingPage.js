import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import LazyHero from 'react-lazy-hero';

import './LandingPage.sass'

class LandingPage extends Component {
    render() {

        const image =
            "https://www.lakeplacid.com/f/styles/1440x700/public/photos/winter-whiteface.jpg?itok=jXySs6ny";

        return (
            <div className="landing-page">
                <Parallax bgImage={image} blur={{ min: -1, max: 3 }}>
                    <div style={{ height: 500 }}>
                    </div>
                    <h5 className="page-title-white">CoolTourist</h5>
                </Parallax>
                <h5 className="page-title">CoolTourist</h5>
            </div>
        );
    }
}

export default LandingPage;