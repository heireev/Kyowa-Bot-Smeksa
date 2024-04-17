const fs = require('fs');
const path = require('path');


// Versi lama (Tanpa Crypto)
exports.writeDatabase = (name, data) => {
    const filePath = path.join(process.cwd(), 'database', `${name}.json`);
    const formattedData = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

    // Tulis data baru ke file dengan menghapus konten sebelumnya.
    fs.writeFileSync(filePath, formattedData);
}

exports.readDatabase = (name) => {
    const filePath = path.join(process.cwd(), "database", `${name}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } else {
        return [];
    }
};

//==============================

// Versi Baru Pakai (MySQL)
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'username',
//   password: 'password',
//   database: 'database_name'
// });

// exports.newWriteDatabase = (tableName, data) => {
//     const sql = `INSERT INTO ${tableName} SET ?`;

//   connection.query(sql, data, (error, results, fields) => {
//     if (error) {
//       console.error('Error writing to database:', error);
//     } else {
//       console.log('Data written to database successfully');
//     }
//   });
// }

// exports.newReadDatabase = (tableName) => {
//   const sql = `SELECT * FROM ${tableName}`;

//   return new Promise((resolve, reject) => {
//     connection.query(sql, (error, results, fields) => {
//       if (error) {
//         console.error('Error reading from database:', error);
//         reject(error);
//       } else {
//         console.log('Data read from database successfully');
//         resolve(results);
//       }
//     });
//   });
// };
