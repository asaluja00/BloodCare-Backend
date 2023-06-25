const dotenv  = require('dotenv');
dotenv.config({path:'./config.env'});

const express = require('express');
const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.listen(PORT,()=>{
    console.log("SERVER is running at port "+`${PORT}`);
});


require('./db/conn');
const User = require('./model/userSchema');

//middleware
const middleware = (req,res,next)=>{
    console.log("middleware");
    next();
    };

app.use(require('./router/auth'));

// //homepage    
// app.get('/',(req,res)=>{
//     res.send("hellow from server");
// });

// //aboutpage
// app.get('/about',middleware,(req,res)=>{
//  res.send("about page");
// })
