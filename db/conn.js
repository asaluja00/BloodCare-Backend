const mongoose = require('mongoose');
const DB = "mongodb+srv://tejash:tejash@tejash.cbfqiua.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false)
mongoose.connect(DB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
    console.log("MONGODB connected")
}).catch((e)=>{
    console.log("Error=>",e.message);
});

