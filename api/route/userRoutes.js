const UserController = require('../controller/UserController')

const UserRoutes = (app) => {
    app.route('/items').get(UserController.getItem)
}
module.exports = UserRoutes