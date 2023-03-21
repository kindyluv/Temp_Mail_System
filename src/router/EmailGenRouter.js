const router = require('express').Router();
const MessageController = require('../controller/MessageController');
const AppUserController = require('../controller/AppUserController');
const NotificationController = require('../controller/NotificationController');
const AuthController = require('../controller/AuthController');

// Authentication
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// App User
router.get('/user/:userId', AppUserController.findUserById);
router.get('/user-email/:email', AppUserController.findByEmail)
router.get('/users', AppUserController.findAllUsers);
router.get('/user-phoneNumber/:phoneNumber', AppUserController.findUserByPhoneNumber);

//Message Router

router.post('/send-message', MessageController.sendMessage)
router.post('/send-message-by-email', MessageController.sendMessageByEmailAddress)
router.post('/send-message-by-phone', MessageController.sendMessageBySenderAndReceiverPhoneNumber)
router.get('/received-messages/:receiver', MessageController.getAllReceiverMessagesByReceiverId);
router.get('/messages/:sender/:receiver', MessageController.getMessagesBetweenTwoUsers)
router.get('/messages/:senderId', MessageController.getAllOutBoxBySenderId)
router.get('/message-receiver-phone/:receiverPhone', MessageController.getAllReceiverMessagesByReceiverPhoneNumber)
router.get('/message-sender-phone/:senderPhone', MessageController.getAllReceiverMessagesBySenderPhoneNumber)
router.get('/message-sender-and-receiver-phone/:senderPhone/:receiverPhone', MessageController.getAllReceiverMessagesBySenderAndReceiverPhoneNumber)


// Notification
router.get('/notications/:userId', NotificationController.getNotifications);
router.get('/notications/mark-as-read/:notificationId', NotificationController.markNotificationAsRead);
router.get('/notications/mark-as-unread/:notificationId', NotificationController.markNotificationAsUnRead);

module.exports = router;