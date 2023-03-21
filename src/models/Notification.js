const { Schema, model, Types } = require('mongoose')

const notificationSchema = new Schema({
    _id:{
        type: String
    },
    appUser:{
        type: Schema.Types.ObjectId,
        ref: 'AppUser'
    },
    message:{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    count:{
        type: Number
    },
    isRead:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

notificationSchema.pre('save', function(next){
    if(!this._id){
        this._id = new Types.ObjectId().toString();
    }
    return next();
})

const Notification = model("Notification", notificationSchema);

module.exports = Notification;

/*

exports.createMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user._id,
      recipient: req.body.recipient,
      content: req.body.content
    });

    await message.save();

    const notification = new Notification({
      user: req.body.recipient,
      message: message._id
    });

    await notification.save();

    message.notifications.push(notification);
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getNotificationCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadCount = await Notification.countDocuments({ user: userId, read: false });
    const totalCount = await Notification.countDocuments({ user: userId });

    res.json({ unread: unreadCount, total: totalCount });
  }

const createNotification = async (senderId, receiverId, message) => {
  const notification = new Notification({ senderId, receiverId, message });
  await notification.save();
};

const createMessage = async (senderId, receiverId, content) => {
  const message = new Message({ senderId, receiverId, content });
  await message.save();
  await createNotification(senderId, receiverId, 'New message received');
};

const getNotifications = async (userId) => {
  const notifications = await Notification.find({ receiverId: userId });
  return notifications;
};

*/