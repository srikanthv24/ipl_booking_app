const API_URL = process.env.REACT_APP_API_URL;

export class Match {
    static getMatchList = () => {
        return fetch(`${API_URL}/matchList`, {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }

    static getMatchDetails = (data) => {
        return fetch(`${API_URL}/matchDetails?match_id=${data.match_id}&user_id=${data.user_id}`, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }

    static createBooking = (data) => {
        return fetch(`${API_URL}/createBooking`, {
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