
let user = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : "";
let token = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser")).accessToken
    : "";

export const initialState = {
    isAuthenticated: false,
    userDetails: "" || user,
    token: "" || token,
    loading: false,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    const {type , payload } = action ;
    switch (type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS": 
            return {
                isAuthenticated: true,
                loading: true,
                userDetails: payload,
                token: payload.accessToken,
                ...initialState,
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: "",
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
export const RegUser = {
    isSubmitting: false,
    email:"",
    password:"",
    cnfpass:"",
    loading: false,
    errorMessage: null
};

export const RegReducer = (RegUser, action) => {
    switch (action.type) {
        case "REG_SUCCESS":
            return {
                ...RegUser,
                email: action.payload.email,
                password: action.payload.password,
                cnfpass: action.payload.cnfpass,
                isSubmitting:true,
                loading:true
            };
            case "REG_ERROR":
                return {
                    ...RegUser,
                    loading: false,
                    errorMessage: action.error
                };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};