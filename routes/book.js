const express = require('express')
const router = express.Router()
const BookModel = require('../models/books')

// 设置缓存中间件
const setCache = (req, res, next) => {
    // 设置 Cache-Control 头
    res.set('Cache-Control', 'public, max-age=3600') // 缓存1小时
    next()
}

router.get('/', setCache, (req, res) => {
    BookModel.getBooks()
    .then((books) => {
        res.render('index', {books})
    })
})

router.get('/add', setCache, (req, res) => {
    res.render('add')
})

router.post('/add', (req, res) => {
    let book = req.body
    BookModel.addBook(book)
    .then((result) => {
        res.redirect('/')
    })
})

router.get('/:bookId/remove',setCache, (req, res) => {
    BookModel.delBook(req.params.bookId)
    .then((book) => {
        res.redirect('/')
    })
})


router.get('/:bookId/edit',setCache, (req, res) => {
    let book = req.body
    BookModel.getBook(req.params.bookId)
    .then((book) => {
        res.render('edit', { 
            book,
            bookid: req.params.bookId
         })
    })
})

router.post('/:bookId/edit', (req, res) => {
    let book = req.body
    BookModel.editBook(req.params.bookId, book)
    .then((result)=>{
        res.redirect('/')
    })
})


module.exports = router