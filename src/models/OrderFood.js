const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema(
    {
        DonHang: [
            {
                TenMonAn: { type: String, required: true },
                SoLuong: { type: Number, require: true },
                HinhAnh: { type: String, require: true },
                GiaMonAn: { type: Number, require: true },
                GiamGia: { type: Number },
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    require: true,
                },
            },
        ],
        DiaChiGiaoHang: {
            HoTen: { type: String, required: true },
            Diachi: { type: String, required: true },
            ThanhPho: { type: String, required: true },
            Huyen: { type: String, required: true },
            Phuong: { type: String, required: true },
            DienThoai: { type: Number, required: true },
        },
        PhuongThucThanhToan: { type: String, required: true },
        GiaDonHang: { type: Number, required: true },
        GiaVanChuyen: { type: Number, required: true },
        TongTien: { type: Number, required: true },
        NguoiDung: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        DaThanhToan: { type: Boolean, default: false },
        NgayThanhToan: { type: Date },
        DaGiao: { type: Boolean, default: false },
        NgayGiao: { type: Date },
        GiamGia: { type: Number },
        TrangThaiGiaoHang: { type: String, default: "1" }
    },
    {
        timestamps: true
    }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;