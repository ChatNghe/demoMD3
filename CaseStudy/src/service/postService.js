const connection = require('../model/connection');
const cookie = require("cookie");
const homeHandleRouter = require('../controller/handleRouter/homeHandleRouter')


class PostService{
    findAll() {
        let sql = 'select * from post p join user s on s.id = p.userId';
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, students) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(students)
                }
            })
        })
    }
    findMyPost(myId) {
        let sql = `select * from post p join user s on p.userId = s.id where p.userId = ${myId}`;
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, students) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(students)
                }
            })
        })
    }

    save(post,id,dateTime) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            let sql = `insert into socialnetwork.post(userId, content, creationDate,isPublic)
                       values (${id}, '${post.content}', '${dateTime}','${post.isPublic}')`;
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
                   from socialnetwork.post
                   where idPost = ${id}`
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

    update(post, id) {
        let connect = connection.getConnection();
        let today = new Date();
        let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        let time = today.getHours()+':'+today.getMinutes();
        let dateTime = time + '-' + date
        let sql = `update socialnetwork.post set 
                              content = '${post.content}',
                              creationDate = '${dateTime}',
                              isPublic = '${post.isPublic}' 
                          where idPost = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, post) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(post);
                }
            })
        })
    }
}

module.exports = new PostService()