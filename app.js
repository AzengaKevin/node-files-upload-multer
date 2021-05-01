const express = require('express')
const multer = require('multer')
const path = require('path')
const helpers = require('./services/helpers')

const app = express()
const port = process.env.port || 3000

//Set Storage Engine For Multer
const storage = multer.diskStorage({
    destination: path.join(`${__dirname}/public/uploads`),
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 1024 * 1024 * 2,
    },

    fileFilter: (req, file, cb) => {
        helpers.checkFileType(file, cb)
        //cb(null, true)
    }

}).single('file')

//Setup the templating engine EJS
app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/', (req, res, next) => {
    res.render('index')
})

app.post('/files', (req, res, next) => {
    console.log(req.file)
    upload(req, res, err => {
        if (err) {
            console.log(err)
        } else {
            console.log(req.file)
            res.send('Awesome...')
        }
    })
})

app.listen(port, () => console.log(`listening on port ${port}...`))