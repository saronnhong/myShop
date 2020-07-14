import { AsyncStorage } from 'react-native'; 

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

// export const signup = (email, password) => {
//     // const API_KEY = 'AIzaSyAJEUnKU8D6oIlWV_vilv1KljNbZD_2uWU';
//     return async dispatch => {
//         const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAJEUnKU8D6oIlWV_vilv1KljNbZD_2uWU',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password,
//                     returnSecureToken: true
//                 })
//             });
        
//         const resData = await response.json();
//         console.log(resData);
//         if (!response.ok) {
//             throw new Error('Something went wrong!');
//         }
//         dispatch({ type: SIGNUP });
//     };
// };
export const signup = (email, password) => {
    return async dispatch => {
        return fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJEUnKU8D6oIlWV_vilv1KljNbZD_2uWU',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        ).then(response => {
            return response.json();
        }).then(res => {
            console.log(res);
            dispatch({ type: SIGNUP, token: res.idToken , userId: res.localId });
            const expirationDate = new Data(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        }).catch(err => {
            console.log(err);
            const errorId = err.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'This email exists already.'
            } 
            throw new Error(message);
        });
 
    };
};

export const login = (email, password) => {
    return async dispatch => {
        return fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJEUnKU8D6oIlWV_vilv1KljNbZD_2uWU',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        ).then(response => {
            return response.json();
        }).then(res => {
            dispatch({ type: LOGIN, token: res.idToken , userId: res.localId });
            const expirationDate = new Data(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        }).catch(err => {
            console.log(err);
            const errorId = err.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found.'
            } else if (errorId === 'INVALID_PASSWORD'){
                message = 'This password is not valid!'
            }
            throw new Error(message);
        });
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}
