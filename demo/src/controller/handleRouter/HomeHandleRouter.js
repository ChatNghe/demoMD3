const fs = require('fs');
const productService = require('../../service/productService')
const qs = require('qs')

class HomeHandleRouter {
    static getHomeHtml(homeHtml, products) {
        let tbody = '';
        products.map((product, index) => {
            tbody +=
                `<tr>
                            <td>${index + 1}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.description}</td>
                            <!--<td><img src="/public/${product.image}" alt="khong co" style="width: 50px;height: 50px"></td>-->
                            <td><a href="/edit/${product.id}"><button>Sua</button></td>
                            <td><a href="/delete/${product.id}"><button>Xoa</button></td>
                        </tr>`
        })
        homeHtml = homeHtml.replace('{products}', tbody);
        return homeHtml;
    }

    showHome(req, res) {
        if(req.method === 'GET'){
            fs.readFile('./views/home.html', "utf-8", async (err, homeHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let products = await productService.findAll();
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, products);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        }else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await productService.searchProduct(search.search)
                            homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, products);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }

    }

    createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', "utf-8", async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    const mess = await productService.save(product);
                    res.writeHead(301, {location: '/home'});
                    res.end();
                }
            })
        }
    }

    async deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', "utf-8", async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id)
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            let mess = await productService.remove(id)
            res.writeHead(301, {location: '/home'});
            res.end();
        }
    }

    editProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', "utf-8", (err, editHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    editHtml = editHtml.replace('{id}', id)
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    console.log(product)
                    console.log(id)
                    await productService.update(product, id);
                    res.writeHead(301, {location: '/home'});
                    res.end();
                }
            })
        }
    }
}

module.exports = new HomeHandleRouter();