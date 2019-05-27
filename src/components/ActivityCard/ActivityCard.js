import React, { Component } from 'react';

import './ActivityCard.sass'

class ActivityCard extends Component {
    render() {
        return (
            <div className="activity-card">
                <div className="product-card">
                    {/* <div className="badge">Hot</div> */}
                    <div className="product-tumb">
                        <img src={this.props.activity.imageurl} alt="" />
                    </div>
                    <div className="product-details">
                        <span className="product-category">{this.props.activity.categories.map(category => category.name).join(', ')}</span>
                        <h4><a>{this.props.activity.name}</a></h4>
                        <div className="product-description">
                            <p>{this.props.activity.description.substring(0, 120)} {this.props.activity.description.length > 120 ? "...READ MORE" : null}</p>
                        </div>
                        <div className="product-bottom-details">
                            <div className="product-price">£{this.props.activity.price}</div>
                            <div className="product-links">
                                <a><i className="fa fa-heart"></i></a>
                                <a><i className="fa fa-book"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivityCard;