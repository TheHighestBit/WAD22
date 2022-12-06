 // database.js
 const Pool = require('pg').Pool;
 const pool = new Pool({
     user: "postgres",
     password: "homework4",
     database: "database",
     host: "localhost",
     port: "5432"
 });

 const execute = async(query) => {
    try {
        await pool.connect();
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
 };

 const createTblQuery = `
 CREATE TABLE IF NOT EXISTS "users" (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(200) NOT NULL UNIQUE,
     password VARCHAR(200) NOT NULL 
 );`;
 
 execute(createTblQuery).then(result => {
    if (result) {
        console.log('Table "users" created');
    }
 });

 const createTblQueryPosts = `
 CREATE TABLE IF NOT EXISTS "posts" (
     id serial PRIMARY KEY,
     content VARCHAR(400) NOT NULL,
     date DATE NOT NULL DEFAULT CURRENT_DATE
 );`;
 
 const insertQuery = `
 INSERT INTO posts (content, date) VALUES
    ('Took a pill in Ibiza', '2022-10-22'),
    ('Anybody know which room the lab is in today?', '2022-10-24');
 `

 execute(createTblQueryPosts).then(result => {
    if (result) {
        console.log('Table "posts" created');
    }
    execute(insertQuery);
 });
 
 module.exports = pool;