const API_URL = process.env.REACT_APP_API_URL;

export class User {
    static userLogin = (data) => {
        return fetch(`${API_URL}/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }

    static userRegister = (data) => {
        return fetch(`${API_URL}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }
}