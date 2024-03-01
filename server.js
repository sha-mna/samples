// const express = require('express');
// const app = express();
// const PORT = 4000;

// app.get('/about', (req, res) => {
//     res.send("Its about page");
// });

// app.post('/register', (req, res) => {
//     res.send("User registered successfully");
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.listen(5000, () => {
//     console.log(`Server is running on port ${5000}`);
// });

           // MIDDLE WARES

// const express = require('express');
// const app = express();
// const PORT = 4000;

// const consoleMiddleware = (req,res,next) => {
//     console.log("Console Middleware");
//     next();
// }

// app.get('/about', consoleMiddleware, (req,res,next) => {
//     next();
// })

// app.get('/about', (req,res) => {
//     res.send("It's about page");
// });

// app.post('/register', (req,res) => {
//     res.send("User registered successfully");
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// APPLICATION LEVEL MIDDLEWARE:  app.use & app.httpMethods

// const express = require('express');
// const app = express();
// const PORT = 4000;

// const consoleMiddleware = (req,res,next) => {
//     console.log("consoleMiddleware");
//     next();
// }

// app.use(consoleMiddleware);                        // executes all the request

// app.get('/about', (req,res) => {
//     res.send("It's about page");
// });

// app.get('/home', (req,res) => {
//     res.send("It's home page");
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// ROUTER LEVEL MIDDLEWARES

// const express = require('express');
// const app = express();
// const PORT = 4000;
// const router = express.Router();

// router.get('/about', (req,res) => {
//     res.send("I'ts about page");
// });

// router.get('/home', (req,res) => {
//     res.send("It's home page");
// });

// app.use('/', router);                // router mount

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// ERROR HANDLING MIDDLEWARE

// const express = require ('express');
// const app = express();
// const PORT = 4000;
// const router = express.Router();

// router.get('/about', (req,res) => {
//     res.send("It's about page");
// });

// router.get('/home', (req,res) => {
//     // res.send("It's home page");    or
//     res.status(200).send("I'ts home page");
// });

// router.get('/contact', (req,res) => {
//     throw new Error("Error");
// });

// app.use('/', router);

// app.use((err,req,res,next) => {

//     console.log("This is error handling middleware");

//     res.status(500).send(err.message);                // status code

// });

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });


// BUILDING MIDDLEWARE

const express = require ('express');
const app = express();
const PORT = 4000;
const router = express.Router();
const path = require('path');

const users = [
    {username:"tom" , password:"123"},
    {username:"jerry" , password:"123"},
    
]

// app.use('/public', express.static("images"));        // virtual folder
// app.use('/pic', express.static("images"));           
// app.use(express.static("images"));
// app.use(express.static("css"));

app.use(express.urlencoded({extended: true}));                // middleware

app.use('/public', express.static("images"));
app.use(express.static(path.join(__dirname, 'public')));       // join is a string method      

// console.log(__dirname);

router.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/', (req,res) => {
    console.log(req.body);
    // res.status(201).send("Sign up completed!");

    res.status(300).redirect('/login')
});


router.post('/login', (req,res) => {

    const {username, password} = req.body;

    const user = users.find((user) => user.username === username && user.password === password)

    if(!user) {
        res.status(300).redirect("/login")
    }

    res.status(300).redirect("/profile");
})

router.get('/login', (req,res) => {

    res.sendFile(__dirname + "/login.html");

});

router.get('/about', (req,res) => {
    res.status(200).send("It's about page");
});

router.get('/profile', (req,res) => {
    // res.send("It's home page");    or
    res.status(200).send("I'ts profile page");
});

router.get('/contact', (req,res) => {
    throw new Error("Error");
});

app.use('/', router);

app.use((err,req,res,next) => {

    console.log("This is error handling middleware");

    res.status(500).send(err.message);                

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
