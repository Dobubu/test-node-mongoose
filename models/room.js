const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, '價格必填'],
      cast: false         // 預防不要自動轉型
    },
    rating: Number,
    createAt: {
      type: Date,
      default: Date.now,
      select: false       // 保護欄位不顯示
    }
  },
  {
    versionKey: false,
    collection: 'roomA',
  }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;