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

const express = require('express');

// Port

const port = parseInt(process.env.port)||4000;

// Express app

const app = express();

// Route

const route = express.Router();

app.use(
    route
)

route.get('/', (req, res)=> {
    res.status(200).send("Well done");
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})