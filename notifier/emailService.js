
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "pawankhushrahoofficial@gmail.com",
        pass: 'gdktaklzbsnipxxv',
    },
    secure: true,
});