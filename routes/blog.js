var express = require('express');
var router = express.Router();
var multer = require('multer');

//Disk Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

/* GET create blog. */
router.get('/', function (req, res, next) {
    res.render('blog', { title: 'Create Blog' });
});

/*single file upload*/
router.post('/upload', upload.single('blogimage'), function (req, res, next) {
    var fileinfo = req.file;
    var title = req.body.title;
    console.log(title);
    res.send(fileinfo);
})

/*multiple files upload*/
router.post('/uploads', upload.array('blogimage', 5), function (req, res, next) {
    var fileinfo = req.files;
    var title = req.body.title;
    console.log(title);
    res.send(fileinfo);
})

module.exports = router;
