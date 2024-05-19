const jwt = require("jsonwebtoken");

const generateOtpToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateOtpToken };
