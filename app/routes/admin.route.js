const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");
 
const adminController = require('../controllers/admin.controller');
 
exports.filename = ""
// var photoimg;
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log("Destination");
        callBack(null, path.join(__dirname, '../../public/images/'));     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        console.log("file");
        console.log("fileName " + file.fieldname);
        console.log(file);
        // photoimg=file.originalname;
        this.filename = file.originalname
        callBack(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
});

// Get All Product
router.get('/product/', adminController.getProductList);

// Create New Product
router.post('/product/', upload.single('Photo'), adminController.createNewProduct);

// Update Product
router.put('/product/:productid', upload.single('Photo'), adminController.updateProduct);

// Delete Product
router.delete('/product/:productid', adminController.deleteProduct);

 
module.exports = router;