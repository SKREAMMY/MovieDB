import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'Movie_launch'
    }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;