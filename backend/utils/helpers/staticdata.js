const keys = require('./keys');

const user = {
    unique_id: keys.uniqId(),
    first_name: "test",
    last_name: "user",
    mobile_number: "99999999999",
    email: "testuser@gmail.com",
    password: "testuser"
}

const matches = [
    {
        unique_id: keys.uniqId(),
        team_a: "CSK",
        team_b: "MI",
        date: "01/10/2021",
        time: "8:00 pm",
        venue: "mumbai",
        team_a_img: "http://localhost:4000/images/csk.png",
        team_b_img: "http://localhost:4000/images/mi.png"
    },
    {
        unique_id: keys.uniqId(),
        team_a: "RCB",
        team_b: "KKR",
        date: "02/10/2021",
        time: "8:00 pm",
        venue: "KOLKATTA",
        team_a_img: "http://localhost:4000/images/rcb.png",
        team_b_img: "http://localhost:4000/images/kkr.png"
    },
    {
        unique_id: keys.uniqId(),
        team_a: "DC",
        team_b: "RR",
        date: "03/10/2021",
        time: "8:00 pm",
        venue: "DELHI",
        team_a_img: "http://localhost:4000/images/dc.png",
        team_b_img: "http://localhost:4000/images/rr.png"
    },
    {
        unique_id: keys.uniqId(),
        team_a: "SRH",
        team_b: "KXIP",
        date: "04/10/2021",
        time: "8:00 pm",
        venue: "HYDERABAD",
        team_a_img: "http://localhost:4000/images/srh.jpg",
        team_b_img: "http://localhost:4000/images/kxip.png"
    },
]

module.exports = {
    user,
    matches
}