const OrderService = require('../services/OrderService')
const Order = require("../models/OrderFood")

const createOrder = async (req, res) => {
    try {

        const { PhuongThucThanhToan, GiaDonHang, GiaVanChuyen, TongTien, HoTen, Diachi, ThanhPho, Huyen, Phuong, DienThoai, GiamGia } = req.body;
        // // Kiểm tra các trường đầu vào
        if (!PhuongThucThanhToan || !GiaDonHang || !TongTien || !HoTen || !Diachi || !ThanhPho || !Huyen || !Phuong || !DienThoai) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        }

        // Gọi UserService để tạo user
        const response = await OrderService.createOrder(req.body);
        // console.log('response', req.body)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là userId'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là orderId'
            })
        }
        const response = await OrderService.getDetailsOrder(orderId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const cancelOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const response = await OrderService.cancelOrderDetails(orderId, data);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder();
        return res.status(200).json(data);
    } catch (e) {
        // console.log(e);
        return res.status(404).json({
            message: e
        });
    }
};

///24/11

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({
                status: "ERR",
                message: "The orderId and status are required",
            });
        }
        const response = await OrderService.updateOrderStatus(orderId, status);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message,
        });
    }
};

const markOrderAsReceived = async (req, res) => {
    try {
        const { orderId, DaThanhToan, DaGiao } = req.body;
        if (!orderId || DaThanhToan === undefined || DaGiao === undefined) {
            return res.status(400).json({
                status: "ERR",
                message: "The orderId, isPaid, and isDelivered are required",
            });
        }
        const response = await OrderService.markOrderAsReceived(
            orderId,
            DaThanhToan,
            DaGiao
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message,
        });
    }
};

const getRevenueByMonth = async (req, res) => {
    try {
        const { month, year } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    DaThanhToan: true,
                },
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    totalRevenue: { $sum: "$TongTien" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const formattedOrders = orders.map((order) => ({
            day: order._id,
            totalRevenue: order.totalRevenue,
        }));

        res.status(200).json({ status: "OK", data: formattedOrders });
    } catch (e) {
        res.status(500).json({ status: "ERR", message: e.message });
    }
};

const getAvailableYears = async (req, res) => {
    try {
        const response = await OrderService.getAvailableYears();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ status: "ERR", message: e.message });
    }
};

const getAvailableMonths = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({
                status: "ERR",
                message: "Year is required",
            });
        }
        const response = await OrderService.getAvailableMonths(year);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ status: "ERR", message: e.message });
    }
};

const getAnnualRevenue = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({
                status: "ERR",
                message: "Year is required",
            });
        }
        const response = await OrderService.getAnnualRevenue(year);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message,
        });
    }
};


module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    markOrderAsReceived,
    getRevenueByMonth,
    getAvailableYears,
    getAvailableMonths,
    getAnnualRevenue,
};
