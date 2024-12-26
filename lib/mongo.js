const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://Jeffrey:wBobtOP6PMQrFWVS@cluster0.f2bdxv4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("数据库连接成功")
    })
    .catch((error) => {
        console.log("数据库连接失败：" + error)
    })


const BookSchema = Schema({
    title: {
        unique: true,
        type: 'String',
    },
    summary: 'String',
    price: 'Number',
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
})

exports.Book = mongoose.model('Book', BookSchema)