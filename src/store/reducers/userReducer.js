const INITIAL_STATE = {
    loggedInUser: null,
    users: []
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: { ...action.user }
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }

        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => user._id === action.user._id ? action.user : user),
                loggedInUser: { ...action.user }
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.user]
            }

        default:
            return state;
    }
}