const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { HoTen, Email, MatKhau, XacNhanMatKhau, DienThoai } = newUser;
        try {
            const checkUser = await User.findOne({
                Email: Email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Email này đã bị trùng",
                });
            }
            const hash = bcrypt.hashSync(MatKhau, 10);
            const createdUser = await User.create({
                HoTen,
                Email,
                MatKhau: hash,
                XacNhanMatKhau,
                DienThoai
            });
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { Email, MatKhau } = userLogin;
        try {
            const checkUser = await User.findOne({
                Email: Email,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Mật khẩu hoặc email không đúng",
                });
            }
            const comparePassword = bcrypt.compareSync(MatKhau, checkUser.MatKhau)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Mật khẩu hoặc email không đúng'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token
            });

        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "The user is not defined",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            });

        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "The user is not defined",
                });
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETED USER SUCCESS",
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find(id)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allUser
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            });
            if (user === null) {
                resolve({
                    status: "ERR",
                    message: "The user is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            });

        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
}