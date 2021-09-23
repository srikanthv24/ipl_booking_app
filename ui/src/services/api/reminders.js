const API_URL = process.env.REACT_APP_API_URL;

export class Reminder {
    static createReminder = (data) => {
        return fetch(`${API_URL}/createReminder`, {
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

    static getReminders = (id) => {
        return fetch(`${API_URL}/userReminderList?user_id=${id}`, {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }
}