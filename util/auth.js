import axios from "axios";

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyD5RzIQLHw3736Oax_DhksK_KtbmlCZrM8`;
    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        });
    console.log(response.data);

    return response.data.idToken;
}

export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}