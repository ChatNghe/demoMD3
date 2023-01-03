const fs = require('fs')
const qs = require("qs");
const userService = require('../../service/userService')
const cookie = require("cookie");

class UserHandleRouter {
    login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/user/login.html', "utf-8", async (err, loginHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(loginHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                }
                let user = qs.parse(data);
                let users = await userService.login(user)
                if (users.length !== 0){
                    res.setHeader('Set-Cookie',cookie.serialize('user',JSON.stringify(users[0]),
                        {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7
                        }))
                    res.writeHead(301,{'location': '/home'});
                    res.end();
                }else {
                    res.writeHead(301,{'location': '/login'});
                    res.end();
                }

            })
        }
    }
    createUser(req, res){
        if (req.method === 'GET') {
            fs.readFile('./views/user/register.html', "utf-8", async (err, registerHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(registerHtml);
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
                    const user = qs.parse(data);
                     await userService.register(user);
                    res.writeHead(301, {location: '/login'});
                    res.end();
                }
            })
        }
    }
}

module.exports = new UserHandleRouter()