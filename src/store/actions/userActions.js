import { userService } from "../../srvices/userService"


export function loadLoggedInUser() {
    return async (dispatch) => {
        try {
            let user = await userService.getLoggedinUser()
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err:', err)
        }

    }
}



export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.query()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function updateUser(user) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.updateUser(user)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function login(user) {
    return async (dispatch) => {
        try {
            const newLoggedUser = await userService.login(user)
            dispatch({ type: 'SET_USER', newLoggedUser })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function logout() {
    return async (dispatch) => {
        try {
            const newLoggedUser = await userService.logout()
            console.log(newLoggedUser);
            dispatch({ type: 'SET_USER', newLoggedUser })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function signup(user) {
    return async (dispatch) => {
        try {
            let newUser = await userService.signup(user)
            newUser = await userService.login(user)
            dispatch({ type: 'ADD_USER', newUser })
            dispatch({ type: 'SET_USER', newUser })
        } catch (err) {
            console.log('err:', err)
        }

    }
}