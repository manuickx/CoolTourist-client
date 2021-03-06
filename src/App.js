import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import API from './API';
import LandingPage from './components/LandingPage/LandingPage';
import ShowPage from './components/ShowPage/ShowPage';
import Navbar from './components/Navbar/Navbar';
import UserLoginNew from './components/UserLoginNew/UserLoginNew';
import UserSignupNew from './components/UserSignupNew/UserSignupNew';
import UserProfile from './components/UserProfile/UserProfile';
import EditUserProfile from './components/EditUserProfile/EditUserProfile';
import ActivityInfo from './components/ActivityInfo/ActivityInfo';
import NewActivityForm from './components/NewActivityForm/NewActivityForm';
import EditActivityForm from './components/EditActivityForm/EditActivityForm';
import PageNotFound from './components/InfoPages/PageNotFound';
import BookingForm from './components/BookingForm/BookingForm';
import NotVerified from './components/InfoPages/NotVerified';
import PleaseLogIn from './components/InfoPages/PleaseLogIn';

import './App.sass'

class App extends Component {

  state = {
    currentUser: null,
    categories: [],
    activities: [],
    // filteredActivities: [],
    userActivities: []
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    this.getCategories()
    this.getActivities()
    if (token)
      this.getCurrentUser(token)
  }

  // filterActivities = category => {
  //   this.setState({filteredActivities: [...this.state.filteredActivities, this.state.activities.filter(activity => activity.categories.filter(categ => categ.name === category.label))]
  //       })
  // }

  getCategories = () => {
    API.getCategories()
      .then(categories => this.setState({ categories }))
  }

  getActivities = () => {
    API.getAllActivities()
      .then(activities => this.setState({ activities }))
  }

  getCurrentUser = token => {
    API.getCurrentUser(token)
      .then(user => this.setState({ currentUser: user, userActivities: user.activities }))
  }

  addNewActivity = activity => {
    this.setState({ activities: [...this.state.activities, activity], userActivities: [...this.state.userActivities, activity] })
    this.getCurrentUser(localStorage.getItem('token'))
  }

  handleLogout = () => {
    localStorage.clear('token')
    this.setState({ currentUser: null, userActivities: [] })
  }

  deleteActivity = activity => {
    this.setState({ activities: this.state.activities.filter(act => act.id !== activity.id), userActivities: this.state.userActivities.filter(act => act.id !== activity.id) })
  }

  deleteUser = () => {
    this.setState({ currentUser: null, userActivities: [] })
    localStorage.removeItem('token')
  }

  render() {
    const { currentUser, activities, userActivities } = this.state
    const { handleLogout, deleteActivity, getCurrentUser, addNewActivity, deleteUser, getActivities } = this

    return (
      <div className="app">
        <Navbar handleLogout={handleLogout} currentUser={currentUser} filterActivities={this.filterActivities} categories={this.state.categories} />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/activities'
            render={(props) =>
              <ShowPage {...props} activities={activities} />
            }
          />
          <Route exact path='/activities/:activityId'
            render={(props) =>
              <ActivityInfo {...props} currentUser={currentUser} deleteActivity={deleteActivity} />
            }
          />
          <Route exact path='/activities/:activityId/edit'
            render={(props) =>
              currentUser ?
                <EditActivityForm {...props} currentUser={currentUser} deleteActivity={deleteActivity} getActivities={getActivities} />
                :
                <PleaseLogIn {...props} />
            }
          />
          <Route exact path='/activities/:activityId/book'
            render={(props) =>
              <BookingForm {...props} />
            }
          />
          <Route exact path='/login'
            render={(props) =>
              <UserLoginNew {...props} getCurrentUser={getCurrentUser} />
            }
          />
          <Route exact path='/signup'
            render={(props) =>
              <UserSignupNew {...props} getCurrentUser={getCurrentUser} />
            }
          />
          <Route exact path='/user/profile' render={(props) =>
            currentUser ?
              currentUser.verified ?
                <UserProfile {...props} currentUser={currentUser} userActivities={userActivities} deleteUser={deleteUser} />
                :
                <NotVerified {...props} />
              :
              <PleaseLogIn {...props} />
          } />
          <Route exact path='/user/edit'
            render={(props) =>
              currentUser ?
                <EditUserProfile {...props} currentUser={currentUser} getCurrentUser={getCurrentUser} />
                :
                <PleaseLogIn {...props} />
            }
          />
          <Route exact path='/user/new_activity'
            render={(props) =>
              currentUser ?
                <NewActivityForm {...props} addNewActivity={addNewActivity} updateUser={this.updateUser} />
                :
                <PleaseLogIn {...props} />
            }
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;