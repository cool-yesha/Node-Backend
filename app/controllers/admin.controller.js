
const {Product} = require('../models/admin.model');
const adminRoutes = require("../routes/admin.route");


exports.getProductList = (req, res) => {
    Product.getAllProduct((err, product) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Product', product);
        res.send(product)
    })
}

// Create New Product
exports.createNewProduct = (req, res) => {
    const productReqData = new Product(req.body);
    console.log("..............Photo........" + adminRoutes.filename);
    productReqData.Photo = adminRoutes.filename;
    console.log('ProductReqData', productReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        Product.createProduct(productReqData, (err, product) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Product Created Successfully', data: product.insertId })
        })
    }
}

// Update Product
exports.updateProduct = (req, res) => {
    const productReqData = new Product(req.body);
    console.log("..............Photo........" + adminRoutes.filename);
    productReqData.Photo = adminRoutes.filename;
    console.log('ProductReqData update', productReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        Product.updateProduct(req.params.productid, productReqData, (err, product) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Product updated Successfully' })
        })
    }
}

// Delete Product
exports.deleteProduct = (req, res) => {
    Product.deleteProduct(req.params.productid, (err, product) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Product deleted successully!' });
    })
}