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
                    return {
                        status: "OK",
                        message: "SUCCESS",
                    };

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
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `Mon an voi id${arrId.join(',')} khong co`
                })
            } else {
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
                    resolve({
                        status: 'OK',
                        message: `success`
                    })
                }
            }

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

const getAllOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find(id)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allOrder
            });

        } catch (e) {
            reject(e);
        }
    });
};

//24/11
const updateOrderStatus = (orderId, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findByIdAndUpdate(
                orderId,
                { TrangThaiGiaoHang: status },
                { new: true }
            );
            if (!order) {
                return resolve({
                    status: "ERR",
                    message: "Order not found",
                });
            }
            resolve({
                status: "OK",
                message: "Success",
                data: order,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const markOrderAsReceived = async (orderId, DaThanhToan, DaGiao) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { DaThanhToan, DaGiao },
            { new: true }
        );
        return order
            ? { status: "OK", message: "Success", data: order }
            : { status: "ERR", message: "Order not found" };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getAvailableYears = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const years = await Order.aggregate([
                {
                    $group: {
                        _id: { $year: "$createdAt" },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            const availableYears = years.map((y) => y._id);
            resolve({ status: "OK", data: availableYears });
        } catch (e) {
            reject(e);
        }
    });
};

const getAvailableMonths = (year) => {
    return new Promise(async (resolve, reject) => {
        try {
            const months = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(`${year}-01-01`),
                            $lt: new Date(`${year}-12-31`),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $month: "$createdAt" },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            const availableMonths = months.map((m) => m._id);
            resolve({ status: "OK", data: availableMonths });
        } catch (e) {
            reject(e);
        }
    });
};
const getAnnualRevenue = (year) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
            const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

            const revenueData = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfYear, $lte: endOfYear },
                        DaThanhToan: true,
                    },
                },
                {
                    $group: {
                        _id: { $month: "$createdAt" },
                        totalRevenue: { $sum: "$TongTien" },
                    },
                },
                {
                    $project: {
                        month: "$_id",
                        totalRevenue: 1,
                        _id: 0,
                    },
                },
                { $sort: { month: 1 } },
            ]);

            resolve({ status: "OK", data: revenueData });
        } catch (e) {
            reject({ status: "ERR", message: e.message });
        }
    });
};



module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    markOrderAsReceived,
    getAvailableYears,
    getAvailableMonths,
    getAnnualRevenue,
}