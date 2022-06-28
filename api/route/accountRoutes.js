const AccountController = require('../controller/AccountController')

const Routes = (app) => {
    app.route('/register').post(AccountController.registerAccount)
    app.route('/login').post(AccountController.loginAccount)
}
module.exports = Routes