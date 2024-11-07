const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        HoTen: { type: String, require: true },
        AnhDaiDien: { type: String },
        Email: { type: String, require: true, unique: true },
        MatKhau: { type: String, require: true },
        isAdmin: { type: Boolean, default: false, require: true },
        DienThoai: { type: Number, require: true },
        Diachi: { type: String, require: false },
        ThanhPho: { type: String, require: false },
        Huyen: { type: String, require: false },
        Phuong: { type: String, require: false },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;