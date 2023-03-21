const Notification = require("../models/Notification");

const getNotificationsByUserId = async (userId) => {
  try {
    const availableCount = await Notification.countDocuments({ appUser: userId });
    const unreadCount = await Notification.countDocuments({ appUser: userId, isRead: false });
  
    return {
      message: `You have ${unreadCount} unread notifications`
    };
  } catch (error) {
    return{
      message: `Server Error ${error}`,
      data: []
    }
  }
}

const markNotificationAsReadByNotificationId = async (notificationId)=>{
  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new Error('Notification not found');
    }

    if (notification.isRead === true) {
      throw new Error('Notification is Already Opened');
    }
  
    notification.isRead = true;
  
    await notification.save();
  
    return{
    message: 'Notification Successful Opened',
    data: notification
    }
  } catch (error) {
    return{
      message: `Server Error ${error}`,
      data: []
    }
  }
}

const markNotificationAsUnreadByNotificationId = async (notificationId) => {

  try{
    const notification = await Notification.findById(notificationId);

    if (notification.isRead === false) {
      throw new Error('Notification is still unread');
    }else{
      notification.isRead = false;
    }
    
    await notification.save();
  
    return{
      message: 'Notification Successful Marked As Unread',
      data: notification
      }
  
  } catch (error) {
    return{
      message: `Server Error ${error}`,
      data: []
    }
  }
}

module.exports = { getNotificationsByUserId, markNotificationAsReadByNotificationId, markNotificationAsUnreadByNotificationId };