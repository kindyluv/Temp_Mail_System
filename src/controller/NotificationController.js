const NotificationService = require('../services/NotificationService');

const getNotifications = (req, res)=>{
    NotificationService.getNotificationsByUserId(req.params.userId)
    .then((response)=>[
        res.json(response)
    ])
    .catch((error)=>{
        res.json(error)
    })
}

const markNotificationAsRead = async (req, res)=>{
    NotificationService.markNotificationAsReadByNotificationId(req.params.notificationId)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

const markNotificationAsUnRead = async (req, res)=>{
    NotificationService.markNotificationAsUnreadByNotificationId(req.params.notificationId)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

module.exports = { getNotifications, markNotificationAsRead, markNotificationAsUnRead}