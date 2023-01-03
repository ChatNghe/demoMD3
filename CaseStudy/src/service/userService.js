const connection = require('../model/connection');
connection.connected();
class UserService {
    login(user) {
        let sql = `select * from user where username = '${user.username}' and password  ='${user.password}'`  ;
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })

        })
    }
    register(user) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            let sql = `insert into socialnetwork.user(username, password , email, fullname, age, isPublic)
                       values ('${user.username}', '${user.password}', '${user.email}','${user.fullname}',${user.age},'${user.isPublic}')`;
            connect.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thanh cong');
                }
            })
        })
    }
    update(user, id) {
        let connect = connection.getConnection();
        let sql = `update socialnetwork.user set userImage = 'abc',email = '${user.email}',fullname = '${user.fullname}',age = ${user.age},isPublic = '${user.isPublic}' where id = ${id};`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, user) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(user);
                }
            })
        })
    }
    editImage(image, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`UPDATE user SET userImage = '${image}' WHERE id = ${id}`,(err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}
module.exports = new UserService()