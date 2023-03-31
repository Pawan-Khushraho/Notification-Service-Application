const ticketNotificationModel =  require("../models/ticketNotification.model");

exports.acceptNotificationRequest = async(req, res) => {

    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        recipientEmails : req.body.recipientEmails,
        requestor: req.body.requestor,
        ticketId: req.body.ticketId
    }

    try {

        const notification = await(ticketNotificationModel.create(notificationObject));

        res.status(201).send({
            requestId: notification.ticketId,
            status: "Accepted Request"
        })
    }catch(err) {

        console.log(`Error while accepting a notification Request: ${err.message}`);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.getNotificationStatus = async(req, res) => {

    const reqId = req.params.id;

    try {

        const notification = await TicketNotificationModel.findOne({
            ticketId: reqId
        })

        if(notification) {
            res.status(200).send({
                requestId: notification.ticketId,
                subject: notification.subject,
                content: notification.content,
                recipientEmails : notification.recipientEmails,
                sentStatus: notification.sentStatus
            })
        }else{
            res.status(400).send({
                message: "Invalid RequestId"
            })
        }
    }catch(err){
        console.log(`Error while fetching a notification Request: ${err.message}`);
        res.status(500).send({
            message: "Internal server error"
        })
    }

}
