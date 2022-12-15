const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
    //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


// is used to check whether a user is authenticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified
                    console.log('author is authenticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authenticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].email);
        const token = generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)

        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send

    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;

        if (email.length < 3) {
            console.log("empty body")
            res.status(418).json({error: "empty body"})
            return
        }
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        console.log(email);
        console.log(password);
        /*
        To authenticate users, you will need to compare the password they provide with the one in the database.
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function.
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison.
        If the password matches the hash, the result is true.
        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password.
        If both are equal then it returns true else returns false.
        */
 //       console.log(user.rows[0].password);
        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        await res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
         res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

app.get('/posts/get/all', async(req, res) => {
    try {
        console.log("fetching posts");
        const posts = await pool.query(
            "SELECT * FROM posts ORDER BY id"
        );
        await res.json(posts.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/posts/get/:id', async(req, res) => {
    try {
        console.log("fetching posts");
        const postId = req.params.id;
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [postId]
        );
        await res.json(posts.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete('/posts/delete/all', async(req, res) => {
    try {
        console.log("deleting all posts");
        await pool.query("DELETE FROM posts");
        await res.send("all posts deleted");
    }  catch (err) {
        console.log(err.message);
    }
});

app.post('/posts/add', async(req, res) => {
    try {
        const { content, date } = req.body;
        console.log(content)
        console.log(date)
        const post = await pool.query(
            "INSERT INTO posts(content, date) values ($1, $2) RETURNING*", [content, date]
        );
        await res.json(post.rows);

    } catch (err) {
        console.log(err.message);
    }
})

app.put('/posts/edit/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const content  = req.body.content;
        const post = await pool.query("UPDATE posts set content = $2 where id = $1 RETURNING*", [id, content]);
        await res.json(post.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete('/posts/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        await res.send("deleted post with id: " + id);
    } catch (err) {
        console.log(err.message);
    }
})
