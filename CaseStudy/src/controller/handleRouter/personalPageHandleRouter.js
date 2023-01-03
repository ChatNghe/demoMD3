const fs = require('fs')
const cookie = require("cookie");
const postService = require("../../service/postService");
const userService = require("../../service/userService");
const qs = require("qs");
const formidable = require('formidable');
const path = require("path");


class PersonalPageHandleRouter {
    static getPersonalPageHtml(personalPageHtml, posts) {
        let tbody = '';
        posts.map((post, index) => {
            tbody +=
                `<tr>
                            <td>${index + 1}</td>
                            <td>${post.username}</td>
                            <td>${post.content}</td>
                            <td>${post.creationDate}</td>
                            <td>${post.isPublic}</td>
                            <!--<td><img src="/public/${post.image}" alt="khong co" style="width: 50px;height: 50px"></td>-->
                            <td><a href="/editPost/${post.idPost}"><button>Edit</button></td>
                            <td><a href="/deletePost/${post.idPost}"><button>Delete</button></td>
                        </tr>`
        })
        let tbody1 = '';
        posts.map((post, index) => {
            tbody1 =
                `<img src="/public/${post.userImage}" alt="Khong Co" style="width: 50px; height: 50px">
                           <p>Email: ${post.email}</p>
                            <p>Fullname: ${post.fullname}</p>
                            <p>Age: ${post.age}</p>
                            <p>Public: ${post.isPublic}</p>
                            <p><a href="/editUser/${post.id}"><button>Edit</button></a></p>
                            <!--<td><img src="/public/${post.image}" alt="khong co" style="width: 50px;height: 50px"></td>-->
                        `
        })
        personalPageHtml = personalPageHtml.replace('{myPosts}', tbody);
        personalPageHtml = personalPageHtml.replace('{userDetails}', tbody1);
        return personalPageHtml;
    }

    showPersonalPage(req, res) {
        const cookies = cookie.parse(req.headers.cookie || '')
        let userCurrent = JSON.parse(cookies.user);
        fs.readFile('./views/user/personalPage.html', "utf-8", async (err, homeHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let posts = await postService.findMyPost(userCurrent.id);
                homeHtml = PersonalPageHandleRouter.getPersonalPageHtml(homeHtml, posts);
                res.writeHead(200, 'text/html');
                res.write(homeHtml);
                res.end();
            }
        })
    }

    async deletePost(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/post/deletePost.html', "utf-8", async (err, deletePostHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deletePostHtml = deletePostHtml.replace('{id}', id)
                    res.write(deletePostHtml);
                    res.end();
                }
            })
        } else {
            let mess = await postService.remove(id)
            res.writeHead(301, {location: '/home'});
            res.end();
        }
    }

    editPost(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/post/editPost.html', "utf-8", async (err, editPostHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    editPostHtml = editPostHtml.replace('{id}', id)
                    res.writeHead(200, 'text/html');
                    res.write(editPostHtml);
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
                    const post = qs.parse(data);
                    await postService.update(post, id);
                    res.writeHead(301, {location: '/home'});
                    res.end();
                }
            })
        }
    }

    editUser(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/user/editUser.html', "utf-8", async (err, editUserHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    editUserHtml = editUserHtml.replace('{id}', id)
                    res.writeHead(200, 'text/html');
                    res.write(editUserHtml);
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
                    await userService.update(user, id);
                    res.writeHead(301, {location: '/user/editUserImage/'+ id});
                    res.end();
                }
            })
        }
    }

    getImageEdit(images, editHtml) {
        let tbody = '';
        images.map((image, index) => {
            tbody += `
            <img src="/public/${image.userImage}" alt="Khong Co"  width="100" height="100">
            `
        })
        editHtml = editHtml.replace('{image}', tbody);
        return editHtml;
    }

    editUserImage(req, res, id) {
        if (req.method === 'POST') {
            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log(err)
                }
                let tmpPath1 = files.img.filepath;
                let newPath1 = path.join(__dirname, '..', '..', "public", files.img.originalFilename);
                await fs.readFile(newPath1, (err) => {
                    if (err) {
                        fs.copyFile(tmpPath1, newPath1, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                await userService.editImage(files.img.originalFilename, id)
                res.writeHead(301, {'location': '/personalPage'})
                res.end();
            });
        } else {
            fs.readFile('./views/user/editUserImage.html', 'utf-8', async (err, upLoadHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    upLoadHtml = upLoadHtml.replace('{id}', id)
                    res.writeHead(200, 'text/html');
                    res.write(upLoadHtml);
                    res.end();
                }
            })
        }
    }

}

module.exports = new PersonalPageHandleRouter();