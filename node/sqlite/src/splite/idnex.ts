import sqlite from "sqlite3";

/**
 * 用navicat连接sqlite数据库,不需要使用账号名和密码
 */

sqlite.verbose();

//:memory:
const db = new sqlite.Database("./test.db");

db.serialize(() => {
  // 1. 创建表
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,age INTEGER,created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')))");

  // 2. 插入数据
  db.run("INSERT INTO users (name,age) VALUES (?,?)", ["Alice", 18], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('插入成功',this.lastID);
  });
  // 3. 查询数据
  db.each("SELECT * FROM users", (err, row) => {
    console.log('查询结果',row); // 输出: { id: 1, name: 'Alice' }
  });
});