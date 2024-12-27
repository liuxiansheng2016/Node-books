const mongoose = require('mongoose')
const config = require('../config')

const Schema = mongoose.Schema

mongoose.Promise = global.Promise
mongoose.connect(config.url)
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