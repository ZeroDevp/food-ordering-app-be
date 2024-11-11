const Food = require("../models/FoodModel");
const bcrypt = require('bcrypt');

const createFood = (newFood) => {
    return new Promise(async (resolve, reject) => {
        const { TenMonAn, LoaiMonAn, HinhAnh, GiaMonAn, DanhGia, MoTa, GiamGia } = newFood;
        try {
            const checkFood = await Food.findOne({
                TenMonAn: TenMonAn,
            });
            if (checkFood !== null) {
                resolve({
                    status: "ERR",
                    message: "TenMonAn này đã bị trùng",
                });
            }
            const createFood = await Food.create({
                TenMonAn,
                LoaiMonAn,
                HinhAnh,
                GiaMonAn,
                DanhGia,
                MoTa,
                GiamGia
            });
            if (createFood) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createFood,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateFood = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFood = await Food.findOne({
                _id: id
            });
            if (checkFood === null) {
                resolve({
                    status: "ERR",
                    message: "Food is not defined",
                });
            }

            const updatedFood = await Food.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedFood
            });

        } catch (e) {
            reject(e);
        }
    });
};

const deleteFood = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFood = await Food.findOne({
                _id: id
            });
            if (checkFood === null) {
                resolve({
                    status: "ERR",
                    message: "Food is not defined",
                });
            }

            await Food.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETED FOOD SUCCESS",
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getDetailFood = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const food = await Food.findOne({
                _id: id
            });
            if (food === null) {
                resolve({
                    status: "ERR",
                    message: "Food is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: food
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getAllFood = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalFood = await Food.countDocuments()
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Food.find({ [label]: { '$regex': filter[1], '$options': 'i' } }).limit(limit).skip(page * limit)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allObjectFilter,
                    total: totalFood,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalFood / limit)
                });
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allFoodSort = await Food.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allFoodSort,
                    total: totalFood,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalFood / limit)
                });
            }
            const allFood = await Food.find().limit(limit).skip(page * limit)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allFood,
                total: totalFood,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalFood / limit)
            });

        } catch (e) {
            reject(e);
        }
    });
};




module.exports = {
    createFood,
    updateFood,
    getDetailFood,
    deleteFood,
    getAllFood,
}