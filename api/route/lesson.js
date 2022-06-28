const lessonController = require('../controller/lessonController')

const Routes = (app) => {
    app.route('/admin/lessons/create').post(lessonController.addLesson)
    app.route('/admin/lessons').get(lessonController.Getlesson)
        
    app.route('/admin/topics')
        .get(lessonController.getTopic)
        .post(lessonController.addTopic)
    app.route('/admin/topics/:id')
        .put(lessonController.editTopic)
        .delete(lessonController.deleteTopic)
    // app.route('/login').post(lessonController.loginAccount)
}
module.exports = Routes