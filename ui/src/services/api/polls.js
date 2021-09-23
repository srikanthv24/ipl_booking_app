const API_URL = process.env.REACT_APP_API_URL;

export class Poll {
    static saveUserPollOpinion = (data) => {
        return fetch(`${API_URL}/savePollOpinion`, {
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

    static getPollResults = (id) => {
        return fetch(`${API_URL}/getPollResults?match_id=${id}`, {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }
}