const db = require('../models')

const test = (req, res) => {
    res.json({
        status: 200,
        message: "Test controller for Auth successful.."
    });
}

export { test }