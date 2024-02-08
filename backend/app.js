const express= require("express");
const app= express();
// const mongoose= require("mongoose");
app.use(express.json());
// const cors= require("cors");
// app.use(cors());
// const bcrypt=require("bcryptjs");
// const jwt= require("jsonwebtoken");

const JWT_SECRET="kashyap532001#ygfytdtrsryeswertyuiuytdssdfghyutrtedfghytresrdfghtrdertyggfdswertgyyhgtrfdeswertvcxertxrct234567{}{";

// const mongoUrl="mongodb+srv://Kashyap:kdshukla@cluster0.2yave4w.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(mongoUrl,{
//     useNewUrlParser:true
// })
// .then(()=> {console.log("connected to database");
// })
// .catch((e)=> console.log(e));


app.listen(5005, () =>{
    console.log("server is runing");
})
app.post("/post", async(req,res)=>{
    console.log(req.body);
    const {data}= req.body;
    try{

        if(data=="aaa"){
            res.send((status="ok"))
        }
    }catch(error){
       res.send((status="error"))

    }

    
});