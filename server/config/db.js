const mysql = require('mysql')
const db = createConnection({
host: "localhost",
user: "root",
password: "mysql",
database:"counter" 
})

export default db;