const mysql = require('mysql');

module.exports = mysql.createConnection({
	user: 'root',
	database: 'checkouts'
});