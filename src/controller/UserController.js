const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { HoTen, Email, MatKhau, XacNhanMatKhau, DienThoai } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(Email);

        // Kiểm tra các trường đầu vào
        if (!HoTen, !Email || !MatKhau || !XacNhanMatKhau) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "Vui lòng nhập đúng định dạng Email",
            });
        } else if (MatKhau !== XacNhanMatKhau) {
            return res.status(200).json({
                status: "ERR",
                message: "Mật khẩu phải giống với nhập lại mật khẩu",
            });
        }

        // Gọi UserService để tạo user
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { Email, MatKhau } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(Email);

        // Kiểm tra các trường đầu vào
        if (!Email || !MatKhau) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "Vui lòng nhập đúng định dạng Email",
            });
        }

        // Gọi UserService để tạo user
        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samsite: 'strict',
            // path: '/'
        })
        return res.status(200).json({ ...newResponse, refreshToken });
    } catch (e) {
        return res.status(404).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là userId'
            })
        }

        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là userId'
            })
        }
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là userId'
            })
        }
        const response = await UserService.getDetailUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        let token = req.cookies.refresh_token;
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("refresh_token");
        return res.status(200).json({
            status: "OK",
            message: "Đăng xuất thành công!!",
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken,
    logoutUser
};
