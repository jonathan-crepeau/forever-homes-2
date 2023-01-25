import fetch from "node-fetch";

const test = (req, res) => {
    res.json({status:200, message:"Test function for Petfinder controller successful.."});
}

const getToken = (req, res) => {

    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    })
        .then((response) => response.json())
        .then((data) => {
            process.env.ACCESS_TOKEN = data.access_token;
            console.log('=========');
            console.log(process.env.ACCESS_TOKEN);
        })
        .catch((error) => console.log(error));

}


export { test, getToken }