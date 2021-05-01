const path = require('path')

exports.checkFileType = (file, cb) => {
    //Allowed extensions
    const extensions = /jpg|jpeg|png|gif/

    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const extentionMatches = extensions.test(path.extname(file.originalname).toLowerCase())
    const mimeTypeMatches = mimeTypes.includes(file.mimetype)

    if (extentionMatches && mimeTypeMatches) {
        return cb(null, true)
    }

    return cb('Image file(s) only please...', false)
}