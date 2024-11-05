const UserRouter = require('./UserRouter')
const FoodRouter = require('./FoodRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/food', FoodRouter)
}

module.exports = routes