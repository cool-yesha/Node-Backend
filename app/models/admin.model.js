var dbConn  = require('../../config/db.config');

var Product = function (pr) {
    this.ProductID = pr.ProductID;
    this.ProductName = pr.ProductName;
    this.Description = pr.Description;
    this.Price = pr.Price;
    this.Photo = pr.Photo;
    this.Status = pr.Status;
    this.CreatedDate = pr.CreatedDate;
};

// Get All Product
Product.getAllProduct = (result) => {
    dbConn.query('SELECT * FROM product', (err, res) => {
        if (err) {
            console.log('Error while fetching product', err);
            result(null, err);
        } else {
            console.log('Product fetched successfully');
            result(null, res);
        }
    })
}

// Create New Product
Product.createProduct = (productReqData, result) => {
    dbConn.query('INSERT INTO product SET ?', productReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('Product created successfully');
            result(null, res)
        }
    })
}

// Update Product
Product.updateProduct = (productid, productReqData, result) => {
    dbConn.query("UPDATE product SET ProductName=?,Description=?,Price=?,Photo=?,Status=?,CreatedDate=? WHERE ProductID=?", [productReqData.ProductName, productReqData.Description, productReqData.Price, productReqData.Photo, productReqData.Status, productReqData.CreatedDate,productid], (err, res) => {
        if (err) {
            console.log('Error while updating the product');
            result(null, err);
        } else {
            console.log("Product updated successfully");
            result(null, res);
        }
    });
}

// Delete Product
Product.deleteProduct = (productid, result) => {
    dbConn.query('DELETE FROM product WHERE ProductID=?', [productid], (err, res) => {
        if (err) {
            console.log('Error while deleting the product');
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = { Product };