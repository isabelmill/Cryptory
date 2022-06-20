import { userService } from "../../srvices/userService"

export function loadLoggedInUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
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