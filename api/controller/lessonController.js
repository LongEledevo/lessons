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
        res.send({ listItem: listItem,})
    } catch (error) {
        res.send(error)
    }
}


exports.addLesson = async (req, res) => {
    try {
       const {title,content,description,topic} = req.body
       const createLessons = await lesson.create({title:title, content:content , description: description , topic:topic})
       for(let i = 0 ; i <= topic.length ; i++){
         
          await Topic.findByIdAndUpdate(topic[i],{lesson:createLessons._id},{new:true},(err,data)=>{
            if(err) res.send(err)
            res.json(data)
          })
       }
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.updateLesson = async (req,res) => {
    try{
        const id = req.params.id
        const {title,content,description,topic} = req.body
        const UpdateLesson = await lesson.findByIdAndUpdate(id,{title:title,content:content,description:description,topic:topic})
        const filteredArrayDelete = [] 
        await UpdateLesson.topic.filter((value)=>{
            if(!(topic.includes(value))){
                filteredArrayDelete.push(value)
            }
        })
        const filtered = [] 
        await UpdateLesson.topic.filter((value)=>{
            if((topic.includes(value))){
                filtered.push(value)
            }
        })
        const ArrayNew = [] 
        topic.filter((value)=>{
            if(!(filtered.includes(value))){
                ArrayNew.push(value)
            }
        })
        if((filteredArrayDelete.length = 0) || (ArrayNew.length = 0)){
            res.send("update thành công")
        }
        if(filtered.length = 0){
             for(let i = 0;i<filteredArrayDelete.length;i++){
              const deleteTopic = await  Topic.findById(filteredArrayDelete[i])
              const findLessons = await deleteTopic.lesson.indexOf(UpdateLesson._id)
              await deleteTopic.lesson.splice(findLessons,1)
              await deleteTopic.save()
            }
             for(let i = 0;i<ArrayNew.length;i++){
              const findTopic = await  Topic.findById(ArrayNew[i])
              const addLessons = await findTopic.lesson.push([ArrayNewi])
              await findTopic.save()
            }
            res.send("update thành công")
        }
        if((filtered.length = 0) && (ArrayNew.length > 0)){
            for(let i = 0;i<ArrayNew.length;i++){
                const findTopic = await  Topic.findById(ArrayNew[i])
                await findTopic.lesson.push(ArrayNew[i])
                await findTopic.save()
              }
              res.send("update thành công")
        }
       
    }
    catch(err){
        res.send({ error: error.message })
    }
}

exports.deleteLessons = async (req,res) =>{
    try{
        const DeleteTopic = await lesson.findByIdAndDelete(id)
        const ArrLessons = DeleteTopic.topic
        for(let i =0 ; i < ArrLessons.length ; i++){
            const findLessons = await Topic.findById(ArrLessons[i])
            const index = await findLessons.lesson.indexOf(id)
            await findLessons.splice(index,1)
            findLessons.sava()
        }
        res.send("Thafnh cong")
    }
    catch(err){
        res.send({ error: error.message })
    }
}
exports.getTopic = (req,res) => {
    Topic.find({},{_v:0},(err,data)=>{
        if(err) res.send(err)
        res.json({'res':data})
    }).populate({
        path:"lesson",
        select:"Lesson"
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
exports.deleteTopic =  async (req,res) =>{
    const id = req.params.id
    try{
        const DeleteTopic = await Topic.findByIdAndDelete(id)
        const ArrLessons = DeleteTopic.lesson
        for(let i =0 ; i < ArrLessons.length ; i++){
            const findLessons = await lesson.findById(ArrLessons[i])
            const index = await findLessons.topic.indexOf(id)
            await findLessons.splice(index,1)
            findLessons.sava()
        }
        res.send("Thafnh cong")
    }
    catch(err){
        res.send({ error: error.message })
    }
   
}
//////////////////////hết//////////////////////