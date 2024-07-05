import pool from "../db/dbConfig.js";
class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  create() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "insert into us (username,email,password) values(?,?,?)";
          con.query(
            sql,
            [this.username, this.email, this.password],
            (err, result) => {
              err ? reject(err) : resolve(result);
              con.release();
            }
          );
        } else reject(err);
      });
    });
  }
  // http://localhost:3000/user/update
  static update(id, username, email, password) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql =
            "UPDATE us SET username = ?, email = ?, password = ? WHERE id = ?";
          con.query(sql, [username, email, password, id], (err, result) => {
            if (err) {
              reject(err);
            } else {
              con.query(
                "SELECT * FROM us WHERE id = ?",
                [id],
                (err, updatedUser) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(updatedUser);
                  }
                  con.release();
                }
              );
            }
          });
        } else {
          reject(err);
        }
      });
    });
  }
  // http://localhost:3000/user/Delete
  static Delete(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        let sql = "DELETE FROM us WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          con.release(); // release the connection back to the pool
          if (err) {
            console.log(err)
            return reject(err);
          }
          resolve(result);
        });
      });
    });
  }

  static findOne(email, password) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select * from user where email = ? and password = ?";
          con.query(sql, [email, password], (err, result) => {
            err ? reject(err) : resolve(result);
            con.release();
          });
        } else reject(err);
      });
    });
  }
}

export default User;
