const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Food_Ordering_App');
        console.log('Kết nối tới MongoDB thành công!');
    } catch (error) {
        console.log('Xảy ra lỗi khi kết nối với MongoDB!');
    }
}
module.exports = { connect };