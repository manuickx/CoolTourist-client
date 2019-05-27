class API {

    static init() {
        this.portIp = 3000
        this.baseUrl = 'http://localhost:' + this.portIp
    }

    // LOGIN FUNCTION

    static login = credentials => {
        return fetch(this.baseUrl + "/auth/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        }).then(resp => resp.json());
    }


    // USER FUNCTIONS

    static createUser = user => {
        return fetch(this.baseUrl + '/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
    }

    static getCurrentUser = token => {
        return fetch(this.baseUrl + "/auth/show", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }).then(resp => resp.json());
    }

    static updateUser = user => {
        return fetch(this.baseUrl + `/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

    static deleteUser = user => {
        return fetch(this.baseUrl + `/users/${user.id}`, {
            method: 'DELETE'
        }).then(resp => resp.json())

    }

    // CATEGORIES FUNCTIONS

    static getCategories = () => {
        return fetch(this.baseUrl + '/categories')
            .then(resp => resp.json())
    }

    //ACTIVITIES FUNCTIONS

    static getAllActivities = () => {
        return fetch(this.baseUrl + "/activities")
            .then(resp => resp.json())
    }

    static getOneActivity = activityId => {
        return fetch(this.baseUrl + `/activities/${activityId}`)
            .then(resp => resp.json())
    }

    static createNewActivity = (activity, token) => {
        return fetch(this.baseUrl + "/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify(activity)
        })
            .then(resp => resp.json())
    }

    static addCategoriesToActivity = (activity, categories) => {
        return categories.forEach(category => {
            fetch(this.baseUrl + '/activity_categories', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    activity_id: activity.id,
                    category_id: category.id
                })
            })
        })
    }

    static editActivity = activity => {
        return fetch(this.baseUrl + `/activities/${activity.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity)
        })
    }

    static deleteActivity = activity => {
        return fetch(this.baseUrl + `/activities/${activity.id}`, {
            method: 'DELETE'
        }).then(resp => resp.json())
            .then(console.log)
    }

    static bookActivity = (activityId, booking) => {
        return fetch(this.baseUrl+`/bookings`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                activity_id: activityId,
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                comment: booking.comment,
                date: booking.date
            })
        })
    }

}


API.init()

export default API