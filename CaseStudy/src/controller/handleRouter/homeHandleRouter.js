const fs = require('fs')
const cookie = require("cookie");
const postService = require("../../service/postService");



class HomeHandleRouter{
    static getHomeHtml(homeHtml, posts) {
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
                        </tr>`
        })
        homeHtml = homeHtml.replace('{posts}', tbody);
        return homeHtml;
    }
    showHome(req,res){
        const cookies = cookie.parse(req.headers.cookie || '')
        let userCurrent = JSON.parse(cookies.user);
        fs.readFile('./views/home.html',"utf-8",async(err,homeHtml)=>{
            if (err){
                console.log(err.message)
            }else {
                let posts = await postService.findAll();
                homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, posts);
                res.writeHead(200,'text/html');
                res.write(homeHtml);
                res.end();
            }
        })
    }
}
module.exports = new HomeHandleRouter();