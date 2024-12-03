const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
    {
        tieuDe: { type: String, require: true },
        hinhAnh: { type: String, require: false },
        noiDung: { type: String, require: true },
        noiDungTomTat: { type: String, require: false },
        tinNoiBat: { type: Boolean, require: false }
    },
    {
        timestamps: true
    }
);
const blog = mongoose.model("Blog", blogSchema);
module.exports = blog;