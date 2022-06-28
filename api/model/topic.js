const mongoose = require('mongoose'),
Schema = mongoose.Schema
const topicModel = new mongoose.Schema({
    lesson: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson"
    }],
    title : {type : String},
})
module.exports = mongoose.model("Topic", topicModel)