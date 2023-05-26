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

conn.connect(function (err) {
    if (err) throw err;
    console.log('db_mysql: connected on ... ' + conn.config['database']);
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
        res.write('<p>node express route "get /", working from a docker container, behind a nginx working as a reverse proxy!</p>');
        res.write('<p><b>listing all names from "People"\'s table</b></p>');
        result.forEach(element => {
            res.write('<p>' + element['name'] + '</p>');
        });
        res.end()
    });
});

app.listen(port, () => {
    console.log('nodeserver: running on port ' + port);
});
