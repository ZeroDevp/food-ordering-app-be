const UserRouter = require('./UserRouter')
const FoodRouter = require('./FoodRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/food', FoodRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes