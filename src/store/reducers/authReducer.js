const init = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isAuthenticated: true,
                user: {...action.data}
            }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        default:
            return {
                ...state
            }
        //
    }
}

export default authReducer