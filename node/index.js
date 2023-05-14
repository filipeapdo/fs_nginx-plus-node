const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

const names = ['Blah', 'Bleh'];

conn.connect(function (err) {
    if (err) throw err;
    console.log('db_mysql: connected on ...');
    console.log(conn.config['database']);
});

app.get('/', (req, res) => {
    const sql_select_max_id = 'SELECT MAX(id) AS "max_id" FROM people;'
    conn.query(sql_select_max_id, function (err, result_0) {
        if (err) throw err;
        console.log(result_0[0]['max_id']);
        const sql_insert = 'INSERT INTO people(name) VALUES ("name_' + result_0[0]['max_id'] + '");';
        conn.query(sql_insert, function (err, result) {
            if (err) throw err;
        });
    });

    const sql_select = 'SELECT * FROM people;';
    conn.query(sql_select, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.write('<h1>Full Cycle Rocks!</h1>');
        res.write('<p>node express route "get /", working from a docker container.</p>');
        res.write('<p>listing all names from "People" table...</p>');
        result.forEach(element => {
            res.write('<p>' + element['name'] + '</p>');
        });
        res.end()
    });
});

app.listen(port, () => {
    console.log('nodeserver: running on port ' + port);
});
