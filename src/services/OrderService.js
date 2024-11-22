const Order = require("../models/OrderFood");
const Food = require("../models/FoodModel");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { DonHang, PhuongThucThanhToan, GiaDonHang, GiaVanChuyen, TongTien, HoTen, Diachi, ThanhPho, Huyen, Phuong, DienThoai, GiamGia, NguoiDung, DaThanhToan, NgayThanhToan } = newOrder;
        try {
            const promises = DonHang.map(async (order) => {
                const foodData = await Food.findOneAndUpdate({
                    _id: order.food,
                },
                    {
                        $inc: {
                            DaBan: +order.SoLuong
                        }
                    },
                    { new: true }
                )

                if (foodData) {
                    const createdOrder = await Order.create({
                        DonHang,
                        DiaChiGiaoHang: {
                            HoTen,
                            Diachi,
                            ThanhPho,
                            Huyen,
                            Phuong,
                            DienThoai,
                        },
                        PhuongThucThanhToan,
                        GiaDonHang,
                        GiaVanChuyen,
                        TongTien,
                        NguoiDung: NguoiDung,
                        GiamGia,
                        DaThanhToan,
                        NgayThanhToan
                    });
                    if (createdOrder) {
                        return {
                            status: "OK",
                            message: "SUCCESS",
                        };
                    }
                } else {
                    return {
                        status: "OK",
                        message: "ERR",
                        id: order.food,
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Mon an voi id${newData.join(',')} khong co`
                })
            }
            resolve({
                status: 'OK',
                message: `success`
            })
        } catch (e) {
            reject(e);
        }
    });
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                NguoiDung: id
            });
            if (order === null) {
                resolve({
                    status: "ERR",
                    message: "order is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            });
            if (order === null) {
                resolve({
                    status: "ERR",
                    message: "order is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order
            });
        } catch (e) {
            reject(e);
        }
    });
};

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const foodData = await Food.findOneAndUpdate({
                    _id: order.food,
                    DaBan: { $gte: order.SoLuong }
                },
                    {
                        $inc: {
                            DaBan: -order.SoLuong
                        }
                    },
                    { new: true }
                )
                if (foodData) {
                    order = await Order.findByIdAndDelete(id);
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined',
                        });
                    }

                } else {
                    return {
                        status: "OK",
                        message: "ERR",
                        id: order.food,
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Mon an voi id${newData.join(',')} khong co`
                })
            }
            resolve({
                status: 'OK',
                message: `success`,
                data: order
            })
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails
}