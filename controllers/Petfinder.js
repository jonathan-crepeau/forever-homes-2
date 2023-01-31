import fetch from "node-fetch";
let accessToken;

const test = (req, res) => {
    res.json({status:200, message:"Test function for Petfinder controller successful.."});
}

const getToken = async (req, res) => {
    let responseObj;
    
    await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    })
        .then((response) => response.json())
        .then((data) => {
            accessToken = data.access_token;
        })
        .catch((error) => console.log(error));

    // res.json(responseObj);
    res.json({
        status: 200,
        message: "Successful call to Petfinder API for token."
    });
}

const petData = async (req, res) => {
    let responseObj;
    await fetch('https://api.petfinder.com/v2/animals', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            responseObj = data;
        })
        .catch((error) => console.log(error));

    res.json(responseObj);
}

export { test, getToken, petData }