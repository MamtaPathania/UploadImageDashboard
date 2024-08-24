const express = require('express')
const { getUpload, showcCategoryData} = require('./getUploadedImages.controller')
const router = express.Router()


router.post('/',getUpload)
router.post('/category',showcCategoryData)

module.exports = router