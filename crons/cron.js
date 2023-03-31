
const cron = require('node-cron');
const ticketNotificationModel = require("../models/ticketNotification.model");
const EmailTransporter = require("../notifier/emailService");


cron.schedule('*/30 * * * * *', async() => {

    const notifications = await ticketNotificationModel.find({
        sentStatus: "UN_SENT"
    });

    notifications.forEach( notification => {

        const mailData = {
            from: 'crm-notification-service@gmail.com',
            to: notification.recipientEmails,
            subject: notification.subject,
            text: notification.content
        };

        EmailTransporter.sendMail(mailData, async function(err, info) {
            if(err){
                console.log(err.message+"error aa gya");
            }else{
                savedNotification = await ticketNotificationModel.findOne({_id: notification._id});
                savedNotification.sentStatus = "SENT";
                await savedNotification.save();
            }
        })
    });
})