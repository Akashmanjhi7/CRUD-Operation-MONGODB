const express = require("express");

const app = express();
const path = require("path")
const userModel = require("./models/user.model")
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/read",async (req,res)=>{
   let allusers = await userModel.find()
    res.render("read",{users: allusers})
})
     
app.get("/edit/:id",async (req,res)=>{
    let allusers = await userModel.findOne({_id: req.params.id})
     res.render("update",{users: allusers})
 })

app.post("/update/:id",async (req,res)=>{
    let {name,image,email}= req.body

   let alluser = await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new :true})

    res.redirect("/read")
})

app.get("/delete/:id", async (req,res)=>{
    let reaminingUsers =  await userModel.findOneAndDelete({_id: req.params.id});
 
    res.redirect("/read");
 })
app.post("/create",async (req,res)=>{
    let {name,email,image} = req.body;
    const createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read")
   


})

app.listen(3000)    
