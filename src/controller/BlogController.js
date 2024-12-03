const BlogService = require('../services/BlogService')


const createBlog = async (req, res) => {
    try {
        const { tieuDe, hinhAnh, noiDung, noiDungTomTat, tinNoiBat } = req.body;

        // // Kiểm tra các trường đầu vào
        if (!tieuDe || !hinhAnh || !noiDung) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        }

        // Gọi UserService để tạo user
        const response = await BlogService.createBlog(req.body);
        // console.log('response', req.body)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const BlogId = req.params.id
        const data = req.body
        if (!BlogId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là BlogId'
            })
        }

        const response = await BlogService.updateBlog(BlogId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Something went wrong",
        });
    }
};

const getDetailBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        if (!blogId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là blogId'
            })
        }
        const response = await BlogService.getDetailBlog(blogId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        if (!blogId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu phải là blogId'
            })
        }
        const response = await BlogService.deleteBlog(blogId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getAllBlog = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BlogService.getAllBlog(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};



module.exports = {
    createBlog,
    updateBlog,
    getDetailBlog,
    deleteBlog,
    getAllBlog
};