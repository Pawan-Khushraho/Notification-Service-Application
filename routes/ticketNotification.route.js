const notificationController = require("../controllers/ticketNotification.controller.js");

module.exports = function(app) {

    app.post("/notifServ/api/v1/notifications" ,notificationController.acceptNotificationRequest);
    app.get("/notifServ/api/v1/notifications/:id", notificationController.getNotificationStatus);
}