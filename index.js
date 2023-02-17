// let {addition} = require("./addition");

// addition(3, 7);
// addition(6, 7);

// const http = require('http');

// const port = parseInt(process.env.port)

// || 4000;

//  Web Server

// http.createServer( (req, res)=>{
//     const currUrl = req.url;

//     console.log('Url: ', currUrl, '\nMethod: ', req.method);

//     res.writeHead(200, {'Content-type': 'text/html'});

//     switch(currUrl) {
//         case '/':
//             res.end('You are home');
//         break
//         case '/about':
//             res.end('About me page');
//         break
//         case '/data':
//             res.end('Page data');
//         break
//         default:
//             res.end('Page / Content was not found');
//     }
// } ).listen(port, ()=> {
//     console.log(`Server is running at port ${port}`);
// })

// Middleware

const {errHandling} = require('./middleware/ErrorHandling');

// Message

const {message} = require('./middleware/message');

const express = require('express');

// Path

const path = require('path');

//DB

const db = require('./Config');

// Body-parser

const bodyParser =  require('body-parser');

// Port

const port = parseInt(process.env.port)||4000; 

// Express app

const app = express();

// Router

const route = express.Router();

app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false}),
)

// Home or /

route.get('^/$|/Bookstore',  (req, res)=>{
    res.status(200).sendFile(path.join(__dirname,'./View/Index.html'));
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})

route.get('/users', (req, res) => {
    const strQry = 

    `SELECT firstName, lastName, emailAdd, country
    FROM Users;
    `;

    db.query(strQry, (err, data) => {
        if(err) throw err;
        res.status(200).json({result: data});
    })
});

// Put

route.put('/user/id', bodyParser.json(), (req, res)=>{
    let data = req.body;
    const strQry = 
    `
    UPDATE Users
    SET ?
    WHERE userID = ?;
    `;

    db.query(strQry, [data, req.params.id],
        (err)=>{
            if(err) throw err;
            res.status(200).json({msg:
            "A row was updated"} );
        })
});

// route.put('/users', (req, res) => {
//     res.status(200).json({
//         let detail = req.body;
//     console.log(detail);

//     const strQry = 
//     `UPDATE Users
//     SET ?;`;

//     db.query(strQry, [detail], (err) => {
//         if(err) {
//             res.status(400).json({err});
//         }
//         else{
//             res.status(200).json({msg: "A User record was updated."})
//         }
//     });
// });

// Delete

route.delete('/user/id', (req, res) => {
    const strQry =
    `
    DELETE FROM Users
    WHERE userID = ?;
    `;

    db.query(strQry, [data, req.params.id],
        (err)=>{
        if(err) throw err;
        res.status(200).json({msg:
            "A record was deleted from the database"})
        })
    });

// Patch

// route.patch('/login', bodyParser.json (req, res) => {

// });

// route.patch('/login', (req, res) => {
//     res.status(200).json({
//         let detail = req.body;
//     console.log(detail);

//     const strQry = 
//     `INSERT INTO Users
//     SET ?;`;

//     db.query(strQry, [detail], (err) => {
//         if(err) {
//             res.status(400).json({err});
//         }
//         else{
//             res.status(200).json({msg: "A User record was saved."})
//         }
//     });
// });

// Post

route.post('/register', bodyParser.json(), (req, res) => {
    let detail = req.body;
    console.log(detail);

    const strQry = 
    `INSERT INTO Users
    SET ?;`;

    db.query(strQry, [detail], (err) => {
        if(err) {
            res.status(400).json({err});
        }
        else{
            res.status(200).json({msg: "A User record was saved."})
        }
    });
});