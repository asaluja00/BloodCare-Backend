const express = require('express');
const User = require('../model/userSchema');
const Donate = require('../model/donateSchema');
const Receive = require('../model/receiveSchema');
const e = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Router HomePage")
});

router.post('/details', (req, res) => {
    const { email } = req.body;
    try {
        User.findOne({ email: email }).then((data) => {
            console.log("data==>", data);
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ error: "Something wrong went" });
    }


});

router.post('/donate', (req, res) => {

    const { name, email,donaremail, mobile, bloodgroup, gender, age, weight, status } = req.body;
    console.log(req.body, email);

    if (!name || !email || !donaremail || !mobile || !age || !gender || !bloodgroup || !weight ) {
        return res.status(422).json({ error: "Empty field present" });
    }
    Donate.findOne({email:email}).then((exists)=>{
        console.log("exists",exists);
        // if(exists){
        //     return res.status(500).json({error:"Cannot donate with same email again !!"});
        // }
        
        const donate = new Donate({ name, email, donaremail, mobile, bloodgroup, gender, age,weight, status });
        donate.save().then(() => {
            res.status(200).json({ message: "Donation Raised" })
        }).catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Something went wrong" })
        });

    }).catch((e)=>{
        console.log(e);
            res.status(500).json({ error: "Something went wrong" })
    });

    // res.send({message:req.body});
});

router.post('/receive', (req, res) => {

    const { name, email, receiveremail,mobile, bloodgroup, gender, age, weight, status } = req.body;
    console.log(req.body, email);

    if (!name || !email || !receiveremail || !mobile || !age || !gender || !bloodgroup || !weight ) {
        return res.status(422).json({ error: "Empty field present" });
    }
    Receive.findOne({email:email}).then((exists)=>{
        console.log("exists",exists);
        // if(exists){
        //     return res.status(500).json({error:"Cannot raise request with same email again !!"});
        // }
        const receive = new Receive({ name, email, receiveremail, mobile, bloodgroup, gender, age,weight, status });
        receive.save().then(() => {
            res.status(200).json({ message: "Request Raised" })
        }).catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Something went wrong" })
        });
    }).catch((e)=>{
        console.log(e);
            res.status(500).json({ error: "Something went wrong" })
    });

    
    // res.send({message:req.body});
});



router.post('/register', (req, res) => {

    const { fname, lname, email, mobile, password, cpassword, age, gender, bloodgroup, weight, unitreceived, unitdonated } = req.body;
    console.log(req.body, fname, email);

    if (!fname || !lname || !email || !mobile || !password || !cpassword || !age || !gender || !bloodgroup || !weight || !unitreceived || !unitdonated) {
        return res.status(422).json({ error: "Empty field present" });
    }

    User.findOne({ email: email }).then((userExists) => {
        if (userExists) {

            return res.status(422).json({ error: "User Exists" });
        }

        const user = new User({ fname, lname, email, mobile, password, cpassword, age, gender, bloodgroup, weight, unitreceived, unitdonated });
        user.save().then(() => {
            res.status(200).json({ message: "User Data Saved" });
        }).catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Database err" })
        })
    }).catch(e => console.log(e));


    // res.send({message:req.body});
});

router.get('/donatedata',(req, res)=>{
    Donate.find({}).then((donate)=>{
        console.log(donate);
        res.status(200).json({donate});
    }).catch((e)=>{
        console.log(e);
    });
    
});

router.get('/receivedata',(req, res)=>{
    Receive.find({}).then((receive)=>{
        console.log(receive);
        res.status(200).json({receive});
    }).catch((e)=>{
        console.log(e);
    });
    
});

router.post('/acceptblood',(req , res)=>{

    const { name, email,donaremail, mobile, bloodgroup, gender, age, weight, status , receiveremail } = req.body;
    
    User.updateOne({email:email},{$inc:{unitdonated:1}},{upsert:true}).then((result, err)=>{
        console.log(result);
    });
    User.updateOne({email:receiveremail},{$inc:{unitreceived:1}},{upsert:true}).then((result, err)=>{
        console.log(result);
    });
   
    Donate.updateMany({name:name,email:email,donaremail:donaremail,mobile:mobile,bloodgroup:bloodgroup
        ,gender:gender,age:age,weight:weight,status:status},{$set :{receiveremail:receiveremail,status:false}},{upsert:true}).then((result,err)=>{
            
            res.status(200).json({message:"Done"});
        }).catch((e)=>{
            console.log(e);
            res.status(500).json({error:"Something went wrong"});
        });
   
})

router.post('/donateblood',(req , res)=>{

    const { name, email,receiveremail, mobile, bloodgroup, gender, age, weight, status , donaremail } = req.body;
    
    User.updateOne({email:donaremail},{$inc:{unitdonated:1}},{upsert:true}).then((result, err)=>{
        console.log(result);
    });
    User.updateOne({email:email},{$inc:{unitreceived:1}},{upsert:true}).then((result, err)=>{
        console.log(result);
    });
   
    Receive.updateMany({name:name,email:email,receiveremail:receiveremail,mobile:mobile,bloodgroup:bloodgroup
        ,gender:gender,age:age,weight:weight,status:status},{$set :{donaremail:donaremail,status:false}},{upsert:true}).then((result,err)=>{
            
            res.status(200).json({message:"Done"});
        }).catch((e)=>{
            console.log(e);
            res.status(500).json({error:"Something went wrong"});
        });
   
})

module.exports = router;