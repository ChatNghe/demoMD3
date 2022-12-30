const connection = require('../model/connection');
connection.connected();

class ProductService {
    findAll() {
        let sql = 'select * from product';
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })

        })
    }

    save(product) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            let sql = `insert into manager.product(price, name, description, image)
                       values (${product.price}, '${product.name}', '${product.description}', 'abc.jpg')`;
            connect.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thanh cong');
                }
            })
        })
    }

    remove(id) {
        let connect = connection.getConnection();
        let sql = `delete
                   from manager.product
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thanh cong');
                }
            })
        })

    }

    update(product, id) {
        let connect = connection.getConnection();
        let sql = `update manager.product
                   set price       = ${product.price},
                       name        = '${product.name}',
                       description = '${product.description}'
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, product) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(product);
                }
            })
        })
    }
    searchProduct(search) {
        let connect = connection.getConnection();
        let sql = `SELECT * FROM product  WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
}

const productService = new ProductService();

module.exports = productService
