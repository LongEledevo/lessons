const AccountModel = require("../model/AccountModel")


exports.getItem = async (req, res) => {
    try {
        let listItem = await AccountModel.find({})
        console.log("listItem: ", listItem);
        res.json({ list: listItem, role: listItem.role, message: "Get Items successfully!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.addItem = async (req, res) => {
    try {
        let name = req.body.name
        let listItem = await AccountModel.create({ username: name })
        res.json({ listItem: listItem, message: " Items were successfully added!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.deleteItem = async (req, res) => {
    try {
        let id = req.params.id
        let listItem = await AccountModel.findByIdAndDelete(id)
        res.json({ listItem: listItem, message: " Items were successfully deleted!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.updateItem = async (req, res) => {
    try {
        let id = req.params.id
        let name = req.body.name
        let listItem = await AccountModel.findByIdAndUpdate(id, { Name: name }, { new: true })
        res.json({ listItem: listItem, message: " Items were successfully updated!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
// exports.searchItem = async (req, res) => {
//     try {
//         let textSearch = req.query.textSearch
//         let listItem = await ItemModel.find({ Name: { $regex: textSearch, $options: "i" } })
//         res.json({ listItem: listItem, message: "Get Items successfully!" })
//     } catch (error) {
//         res.send({ error: error.message })
//     }
// }

exports.paginationItem = async (req, res) => {
    try {
        let activePage = parseInt(req.query._page)
        let limit = parseInt(req.query._limit)
        let skip = (activePage - 1) * limit
        let totalRecord = await ItemModel.countDocuments()
        let allData = await ItemModel.find().select('-_v')
        // console.log(allData, "all");
        let totalPage = Math.ceil(totalRecord / limit)
        let listItem = await ItemModel.find().skip(skip).limit(limit)
        res.send({ listItem: listItem, totalPage: totalPage, allData: allData })
    } catch (error) {
        res.send(error)
    }
}
exports.searchPaginationItem = async (req, res) => {
    try {
        let textSearch = req.query.q
        let activePage = parseInt(req.query._page)
        let limit = parseInt(req.query._limit)
        let skip = (activePage - 1) * limit
        let totalRecord = await ItemModel.countDocuments({ Name: { $regex: textSearch, $options: "i" } })
        let totalPage = Math.ceil(totalRecord / limit)
        let listItem = await ItemModel.find({ Name: { $regex: textSearch, $options: "i" } }).skip(skip).limit(limit)
        res.send({ listItem, totalPage })
    } catch (error) {
        res.send(error)
    }
}

