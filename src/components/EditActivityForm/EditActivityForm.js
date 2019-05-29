import React, { Component } from 'react';

import API from '../../API';
import NotAllowed from '../InfoPages/NotAllowed';

class EditActivityForm extends Component {

    state = {
        id: "",
        name: "",
        imageUrl: "",
        description: "",
        price: ""
    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({
                id: activity.id,
                name: activity.name,
                imageUrl: activity.imageurl,
                description: activity.description,
                price: activity.price
            }))
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    updateActivity = (event) => {
        event.preventDefault()
        const activity = {
            id: this.state.id,
            name: this.state.name,
            imageurl: this.state.imageUrl,
            description: this.state.description,
            price: this.state.price
        }
        API.editActivity(activity)
            .then(this.props.getActivities())
        this.props.history.push('/user/profile')
    }

    render() {

        if (this.props.currentUser.activities.find(activity => activity.id === this.state.id)) {

            const { handleChange } = this
            const { name, imageUrl, description, price } = this.state

            return (
                <div className="container">
                    <form action="/action_page.php" onSubmit={this.updateActivity}>
                        <div className="row">
                            <div className="col-25">
                                <label>Activity Name</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Activity name..."
                                    required
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Image url</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    placeholder="Image Url..."
                                    required
                                    value={imageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* <div className="row">
                        <div className="col-25">
                            <label>Select categories</label>
                        </div>
                        <div className="col-75">
                            <Select
                                onChange={handleCategoryChange}
                                className="multi-select"
                                classNamePrefix="react-select"
                                placeholder="Choose a Category"
                                isMulti
                                required
                                options={categories}
                                isSearchable={true}
                            />
                        </div>
                    </div> */}
                        <div className="row">
                            <div className="col-25">
                                <label>Description</label>
                            </div>
                            <div className="col-75">
                                <textarea
                                    id="description"
                                    name="description"
                                    maxLength="1500"
                                    placeholder="Write something about your activity (max 1500 chars)..."
                                    required
                                    value={description}
                                    onChange={handleChange}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Price</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="number"
                                    min="0"
                                    id="price"
                                    name="price"
                                    placeholder="Price.."
                                    required
                                    value={price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <button className="back-button" onClick={() => this.props.history.goBack()}>BACK</button>
                            <button type="submit" className="submit-button">SUBMIT ACTIVITY</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return <NotAllowed />
        }
    }
}

export default EditActivityForm;