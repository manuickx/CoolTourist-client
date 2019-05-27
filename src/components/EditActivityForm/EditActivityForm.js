import React, { Component } from 'react';

import API from '../../API';

class EditActivityForm extends Component {

    state = {
        activity: null,
        actName: ""
    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = () => {
        API.getOneActivity(this.props.match.params.activityId)
            .then(activity => this.setState({ activity }))
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    // updateActivity = (activity) => {
    //     API.editActivity(activity)
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault()
    //     this.updateActivity({ id: this.state.activity.id, name: this.state.actName })
    //         .then(this.setState({ actName: "" }))
    //         .then(this.props.history.push('/user/profile'))
    // }

    render() {
        return (
            <form className='new-activity-form' onSubmit={this.handleSubmit}>
                <div className='activity-details'>
                    <input className='new-activity-name'
                        type='text'
                        id='actName'
                        placeholder='activity name'
                        value={this.state.actName}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default EditActivityForm;