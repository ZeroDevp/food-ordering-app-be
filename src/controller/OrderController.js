const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {

        const { PhuongThucThanhToan, GiaDonHang, GiaVanChuyen, TongTien, HoTen, Diachi, ThanhPho, Huyen, Phuong, DienThoai, GiamGia } = req.body;
        // // Kiểm tra các trường đầu vào
        if (!PhuongThucThanhToan || !GiaDonHang || !GiaVanChuyen || !TongTien || !HoTen || !Diachi || !ThanhPho || !Huyen || !Phuong || !DienThoai) {
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

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails
};
