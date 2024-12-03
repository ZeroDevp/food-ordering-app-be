const Blog = require("../models/BlogModel");


const createBlog = (newBlog) => {
    return new Promise(async (resolve, reject) => {
        const { tieuDe, hinhAnh, noiDung, noiDungTomTat } = newBlog;
        try {
            const checkBlog = await Blog.findOne({
                tieuDe: tieuDe,
            });
            if (checkBlog !== null) {
                resolve({
                    status: "ERR",
                    message: "tieuDe này đã bị trùng",
                });
            }
            const createBlog = await Blog.create({
                tieuDe, hinhAnh, noiDung, noiDungTomTat
            });
            if (createBlog) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createBlog,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateBlog = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBlog = await Blog.findOne({
                _id: id
            });
            if (checkBlog === null) {
                resolve({
                    status: "ERR",
                    message: "Blog is not defined",
                });
            }

            const updateBlog = await Blog.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateBlog
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getDetailBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.findOne({
                _id: id
            });
            if (blog === null) {
                resolve({
                    status: "ERR",
                    message: "Blog is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: blog
            });

        } catch (e) {
            reject(e);
        }
    });
};

const deleteBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBlog = await Blog.findOne({
                _id: id
            });
            if (checkBlog === null) {
                resolve({
                    status: "ERR",
                    message: "blog is not defined",
                });
            }

            await Blog.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETED BLOG SUCCESS",
            });

        } catch (e) {
            reject(e);
        }
    });
};

const getAllBlog = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalBlog = await Blog.countDocuments()
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Blog.find({ [label]: { '$regex': filter[1], '$options': 'i' } }).limit(limit).skip(page * limit)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allObjectFilter,
                    total: totalBlog,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalBlog / limit)
                });
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allBlogSort = await Blog.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allBlogSort,
                    total: totalBlog,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalBlog / limit)
                });
            }
            const allBlog = await Blog.find().limit(limit).skip(page * limit)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allBlog,
                total: totalBlog,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalBlog / limit)
            });

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createBlog,
    updateBlog,
    getDetailBlog,
    deleteBlog,
    getAllBlog
}