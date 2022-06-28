const lesson = require('../model/lesson')
const Topic = require('../model/topic')



exports.Getlesson = async (req,res) =>{
    try {
        let activePage = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let skip = (activePage - 1) * limit
        let totalRecord = await lesson.countDocuments()
        let totalPage = Math.ceil(totalRecord / limit)
        let listItem = await lesson.find().skip(skip).limit(limit).populate({
            path: "topic",
            select: "title"
        })
        let listTopic = await Topic.find()
        const SortTopic = listTopic.sort(()=>{
            return 0.5 - Math.random();
        })
        console.log(SortTopic)
        res.send({ listItem: listItem, totalPage: totalPage,  SortTopic:SortTopic})
    } catch (error) {
        res.send(error)
    }
}


exports.addLesson = async (req, res) => {
    try {
       const {title,content,description,topic} = req.body
       for(let i = 0 ; i <= topic.length ; i++){
         const createLessons = await lesson.create({title:title, content:content , description: description , topic:topic[i]})
          await Topic.findByIdAndUpdate(topic[i],{lesson:createLessons._id},{new:true},(err,data)=>{
            if(err) res.send(err)
            res.json(data)
          })
       }
    } catch (error) {
        res.send({ error: error.message })
    }
}

// exports.updateLesson = async (req,res) => {
//     try{
//         const id = req.params.id
//         const {title,content,description,topic} = req.body
//         for(let i = 0 ; i <= topic.length ; i++){
//              lesson.findByIdAndUpdate(
//                 id,
//                 {title:title,content:content,description:description,topic:topic[i]},
//                 (err,data)=>{
//                     const NumberTopic = data.topic.length
//                     if(err) res.send(err)
//                     for(let j = 0 ; j <= NumberTopic ; j++){
//                         Topic.findById(NumberTopic[j],(err,data)=>{
//                             if(err) res.send(err)
//                             data.lesson.indexOf()
//                         })
//                     }
//                 })
//         }
//     }
//     catch(err){
//         res.send({ error: error.message })
//     }
// }
exports.getTopic = (req,res) => {
    Topic.find({},{_v:0},(err,data)=>{
        if(err) res.send(err)
        res.json({'res':data})
    })
}
exports.addTopic = (req,res) =>{
    const {title} = req.body
    Topic.create({title:title},(err,data)=>{
        if(err) res.send(err)
        res.status(200)
        .json(data)
    })

}
exports.editTopic = (req,res) =>{
    const id = req.params.id
    const {title} = req.body
    Topic.findByIdAndUpdate(id,{title:title},{new:true},(err,data)=>{
        if(err) res.send(err)
        res.json(data)
    })

}
exports.deleteTopic = (req,res) =>{
    const id = req.params.id
    Topic.findByIdAndDelete(id,(err,data)=>{
        if(err) res.send(err)
        res.json(data)
    })
}
//////////////////////hết//////////////////////