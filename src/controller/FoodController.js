const FoodService = require('../services/FoodService')

const createFood = async (req, res) => {
    try {
        const { TenMonAn, LoaiMonAn, HinhAnh, GiaMonAn, DanhGia, MoTa, GiamGia } = req.body;

        // // Kiểm tra các trường đầu vào
        if (!TenMonAn || !LoaiMonAn || !HinhAnh || !GiaMonAn || !DanhGia) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        }

        // Gọi UserService để tạo user
        const response = await FoodService.createFood(req.body);
        // console.log('response', req.body)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id
        const data = req.body
        if (!foodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là foodId'
            })
        }

        const response = await FoodService.updateFood(foodId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const getDetailFood = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là foodId'
            })
        }
        const response = await FoodService.getDetailFood(foodId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là foodId'
            })
        }
        const response = await FoodService.deleteFood(foodId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getAllFood = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await FoodService.getAllFood(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

module.exports = {
    createFood,
    updateFood,
    getDetailFood,
    deleteFood,
    getAllFood,
};
