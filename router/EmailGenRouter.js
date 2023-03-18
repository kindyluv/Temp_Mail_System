const router = require('express').Router();
const MessageController = require('../controller/MessageController');
const AppUserController = require('../controller/AppUserController');

router.post('/create', AppUserController.createUser)
router.get('/user/:userId', AppUserController.findUserById);
router.get('/user-email/:email', AppUserController.findByEmail)
router.get('/users', AppUserController.findAllUsers);

//Message Router

router.post('/send-message', MessageController.sendMessage)
// router.post('/', MessageController.sendMessage)
router.get('/received-messages/:receiver', MessageController.getAllReceiverMessagesByReceiverId);
router.get('/messages/:sender/:receiver', MessageController.getMessagesBetweenTwoUsers)

// Email Controller
// router.post('/send-mail/:')


module.exports = router;