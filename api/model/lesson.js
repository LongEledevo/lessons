const mongoose = require('mongoose'),
Schema = mongoose.Schema
const lessonModel = new Schema({
    title: { type: String },
    time: { type: Date , default:Date.now() },
    topic: [{
        type: Schema.Types.ObjectId,
        ref: "Topic"
    }],
    content : {type : String},
    description : {type : String}
})
module.exports = mongoose.model("Lesson", lessonModel)