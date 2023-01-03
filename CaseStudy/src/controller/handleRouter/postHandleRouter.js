const fs = require("fs");
const qs = require("qs");
const postService = require("../../service/postService") ;
const cookie = require("cookie");

class PostHandleRouter{
    createPost(req, res){
        if (req.method === 'GET') {
            fs.readFile('./views/post/createPost.html', "utf-8", async (err, postHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(postHtml);
                    res.end();
                }
            })
        } else {
            const cookies = cookie.parse(req.headers.cookie || '')
            let userCurrent = JSON.parse(cookies.user);
            let id = userCurrent.id
            let today = new Date();
            let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            let time = today.getHours()+':'+today.getMinutes();
            let dateTime = time + '-' + date
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const post = qs.parse(data);
                    await postService.save(post,id,dateTime);
                    res.writeHead(301, {location: '/home'});
                    res.end();
                }
            })
        }
    }
}
module.exports = new PostHandleRouter()