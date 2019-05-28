import React, { Component } from 'react';
import Select from 'react-select';

import API from '../../API';

import './NewActivityForm.sass'

class NewActivityForm extends Component {

    state = {
        activityName: "",
        activityDescription: "",
        activityImageUrl: "",
        activityPrice: "",
        categories: [],
        selectedCategory: [],
    }

    componentDidMount() {
        this.getCategories()
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({ selectedCategory });
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    addActivity = event => {
        event.preventDefault()

        const { activityName, activityDescription, activityImageUrl, activityPrice, selectedCategory } = this.state
        const { history, addNewActivity } = this.props

        const activity = {
            name: activityName,
            description: activityDescription,
            imageurl: activityImageUrl,
            price: activityPrice
        }

        API.createNewActivity(activity, localStorage.getItem('token'))
            .then(activity => {
                API.addCategoriesToActivity(activity, selectedCategory.map(({ value, label }) => ({ id: value, name: label })))
                addNewActivity(activity)
            })
            .then(history.push('/user/profile'))
    }

    getCategories = () => {
        API.getCategories()
            .then(categories => categories.forEach(({ id, name }) => this.setState({ categories: [...this.state.categories, { value: id, label: name }] })))
    }

    render() {

        const { addActivity, handleChange, handleCategoryChange } = this
        const { activityName, activityDescription, activityImageUrl, activityPrice, categories } = this.state

        return (
            <div className="container">
                <form action="/action_page.php" onSubmit={addActivity}>
                    <div className="row">
                        <div className="col-25">
                            <label>Activity Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="text"
                                id="activityName"
                                name="activityName"
                                placeholder="Activity name.."
                                required
                                value={activityName}
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
                                id="activityImageUrl"
                                name="activityImageUrl"
                                placeholder="Image url.."
                                required
                                value={activityImageUrl}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Description</label>
                        </div>
                        <div className="col-75">
                            <textarea
                                id="activityDescription"
                                name="activityDescription"
                                maxLength="1500"
                                placeholder="Write something about your activity (max 1500 chars)..."
                                required
                                value={activityDescription}
                                onChange={handleChange}>
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
                                id="activityPrice"
                                name="activityPrice"
                                placeholder="Price.."
                                required
                                value={activityPrice}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <button className="back-button" onClick={() => this.props.history.goBack()}>BACK</button>
                        <button type="submit" className="submit-button">SUBMIT ACTIVITY</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewActivityForm;