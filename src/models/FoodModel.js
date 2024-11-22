const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema(
    {
        TenMonAn: { type: String, require: true, unique: true },
        LoaiMonAn: { type: String, require: true },
        HinhAnh: { type: String, require: true },
        GiaMonAn: { type: Number, require: true },
        MoTa: { type: String },
        DanhGia: { type: Number, require: true },
        countInStock: { type: String },
        MoTa01: { type: String },
        MoTa02: { type: String },
        MoTa03: { type: String },
        GiamGia: { type: Number },
        DaBan: { type: Number, default: 0 },
        BanChay: { type: Boolean, default: false },
        hotSale: { type: Boolean, default: false },
        MoiRaMat: { type: Boolean, default: false },

    },
    {
        timestamps: true
    }
);
const Food = mongoose.model("Food", foodSchema);
module.exports = Food;