const API_URL = process.env.REACT_APP_API_URL;

export class Booking {
    static getCustomerBookingList = (id) => {
        return fetch(`${API_URL}/userBookingList?user_id=${id}`, {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }
}