const UserRouter = require('./UserRouter')
const FoodRouter = require('./FoodRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')
const BlogRouter = require('./BlogRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/food', FoodRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/payment', PaymentRouter)
    app.use('/api/blog', BlogRouter)
}

module.exports = routes