import config from 'config';
import axios from 'axios';
import {authHeader} from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';

// VARIABLES =============================================================

/** à mon avis, http://localhost:3000 ne marche pas  */
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

let usersInLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
var TOKEN_KEY = "jwtToken"


// FUNCTIONS =============================================================

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({username, password})
    };

    /**  lien vers _helpers\fake-backend.js  */
    return fetch(`${config.apiUrl}/auth`, requestOptions).then(handleResponse).then(user => {

        /**}then(data => {
         data = data: Response
        body: ReadableStream
        bodyUsed: false
        headers: Headers {}
        ok: true
        redirected: false
        status: 200
        statusText: ""
        type: "cors"
        url: "http://localhost:8000/auth"

        alors que data devrait être égal à
        {token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxN…RaBIM-iabSrSU6xV_MkiiWuVj4_KoCA03znqvEv7EwmEla6MA"}, textStatus = "success"   */

        debugger
        setJwtToken(data.token);
        return getUserInformation().then(user => {

            debugger
            if (user) {
                let responseJson = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: data.token
                };
                return {ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))};
            } else {
                return {ok: false}
            }
            ;
        }).then(handleResponse).then(user => {
            return user;
        });
    });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
    ;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {

    debugger
    let text = JSON.stringify(response)
    /** dans le fichier fake-backend.js, function text() => return Promise.resolve(JSON.stringify(responseJson));  */
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if (response.status === 401) {
            debugger
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}

function getUserInformation() {
    debugger
    let tokenHeader = createAuthorizationTokenHeader()
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            tokenHeader
        }
    };
    return fetch(`${config.apiUrl}/user`, requestOptions);
}

function getJwtToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setJwtToken(token) {
    debugger
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(TOKEN_KEY, token);
}

function createAuthorizationTokenHeader() {
    debugger
    var token = getJwtToken();
    if (token) {
        return {"Authorization": "Bearer " + token};
    } else {
        return {};
    }
}
