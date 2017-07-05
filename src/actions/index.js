import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, MESSAGE_RECEIVED } from "./types";

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
    return function(dispatch) {
        authenticate(email, password, "signin", dispatch);
    };
}

export function signoutUser() {
    localStorage.removeItem("token");

    return {
        type: UNAUTH_USER
    };
}

export function signupUser(email, password) {
    return dispatch => authenticate(email, password, "signup", dispatch);
}

function authenticate(email, password, endpoint, dispatch) {
    // Submit email/pass to server
    axios.post(`${ROOT_URL}/${ endpoint }`, { email, password })
         .then(response => {
             // If request good:
             // - Update state to indicate that user is authenticated
             dispatch({ type: AUTH_USER });

             // - Save JWT token
             localStorage.setItem("token", response.data.token);

             // - Redirect to e.g. '/feature'
             browserHistory.push("/feature");
         })
         .catch(error => {
             // If request is bad:
             // - Show an error to the user
             dispatch(authError(error.response && error.response.data && error.response.data.error || "Bad Login Info"));
         });
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return (dispatch) => {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem("token") }
        })
             .then(response => dispatch({ type: MESSAGE_RECEIVED, payload: response.data.message }));
    };
}
